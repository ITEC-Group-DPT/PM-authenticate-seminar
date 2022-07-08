import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from 'pages/signin';
import SignUp from 'pages/signup';
import Home from 'pages/home';
import userData from 'users.json';

const AppRoutes = () => {
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(userData));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
