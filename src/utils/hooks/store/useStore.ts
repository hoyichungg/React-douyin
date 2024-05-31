import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(devtools((set) => ({
    bodyHeight: document.body.clientHeight,
    bodyWidth: document.body.clientWidth,
    maskDialog: false,
    maskDialogMode: 'dark',
    version: '17.1.0',
    excludeNames: [],
    judgeValue: 20,
    homeRefresh: 60,
    loading: false,
    routeData: null,
    users: [],
    userinfo: {},
    friends: [],

    setMaskDialog: (isOpen) => set({ maskDialog: isOpen }),
    toggleMaskDialog: () => set(state => ({ maskDialog: !state.maskDialog })),
    setUserInfo: (userInfo) => set({ userinfo: userInfo }),
    setUsers: (users) => set({ users }),
    addFriend: (friend) => set(state => ({ friends: [...state.friends, friend] })),
    removeFriend: (name) => set(state => ({
        friends: state.friends.filter(friend => friend.name !== name)
    })),
    updateBodyDimensions: () => set({
        bodyHeight: document.body.clientHeight,
        bodyWidth: document.body.clientWidth
    }),
})));

export default useStore;
