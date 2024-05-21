import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Pages/Home/Home';

import './styles/app.scss'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
