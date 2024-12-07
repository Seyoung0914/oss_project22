import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './Pages/ShowList.js';
import CartList from './Pages/CartList.js';
import Detail from './Pages/Detail.js';
import RentalList from './Pages/RentalList.js';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<ShowList />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/book" element={<Detail />} />
        <Route path="/rental" element={<RentalList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
