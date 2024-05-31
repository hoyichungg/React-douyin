import { useState } from 'react';

const useEventBus = () => {
  const [events, setEvents] = useState(new Map());

  const on = (eventType, cb) => {
    setEvents((prevEvents) => {
      const updatedEvents = new Map(prevEvents);
      const listeners = updatedEvents.get(eventType) || [];
      listeners.push(cb);
      updatedEvents.set(eventType, listeners);
      return updatedEvents;
    });
  };

  const once = (eventType, cb) => {
    setEvents((prevEvents) => new Map(prevEvents).set(eventType, [cb]));
  };

  const off = (eventType, fn) => {
    setEvents((prevEvents) => {
      const updatedEvents = new Map(prevEvents);
      if (fn) {
        const listeners = updatedEvents.get(eventType);
        if (listeners) {
          const filteredListeners = listeners.filter((v) => v !== fn);
          updatedEvents.set(eventType, filteredListeners);
        }
      } else {
        updatedEvents.delete(eventType);
      }
      return updatedEvents;
    });
  };

  const offAll = () => {
    setEvents(new Map());
  };

  const emit = (eventType, val) => {
    const listeners = events.get(eventType);
    if (listeners) {
      listeners.forEach((cb) => {
        cb(val);
      });
    }
  };

  return { on, once, off, offAll, emit };
};

export default useEventBus;
