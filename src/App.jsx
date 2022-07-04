import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from 'pages/signin';
import SignUp from 'pages/signup';
import Home from 'pages/home';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
