import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './Pages/ShowList.js';
import CartList from './Pages/CartList.js';
import Detail from './Pages/Detail.js';
import RentalList from './Pages/RentalList.js';

const Router = () => {
  const [cartBooks, setCartBooks] = useState([]); // 장바구니 도서 목록
  const [rentalBooks, setRentalBooks] = useState([]); // 대여 중인 도서 목록

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={<ShowList cart={cartBooks} addToCart={(book) => setCartBooks([...cartBooks, book])} />}
        />
        <Route
          path="/cart"
          element={
            <CartList
              cartBooks={cartBooks}
              setCartBooks={setCartBooks}
              rentalBooks={rentalBooks}
              setRentalBooks={setRentalBooks}
            />
          }
        />
        <Route path="/book/:id" element={<Detail />} />
        <Route path="/rental" element={<RentalList rentalBooks={rentalBooks} setRentalBooks={setRentalBooks} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
