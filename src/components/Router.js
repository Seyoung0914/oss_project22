import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from '../Pages/ShowList.js';
import CartList from '../Pages/CartList.js';
import Detail from '../Pages/Detail.js';
import RentalList from '../Pages/RentalList.js';

const Router = ({ cart, addToCart, removeFromCart, checkout, loading }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<ShowList cart={cart} addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={<CartList cart={cart} removeFromCart={removeFromCart} checkout={checkout} loading={loading} />}
        />
        <Route path="/book/:CTRLNO" element={<Detail />} />
        <Route path="/rental" element={<RentalList cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
