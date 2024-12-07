import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './Pages/ShowList.js';
import CartList from './Pages/CartList.js';
import Detail from './Pages/Detail.js';
import RentalList from './Pages/RentalList.js';

const Router = () => {
  const [cart, setCart] = useState([]);

  // 장바구니에 도서 추가하는 함수
  const addToCart = (book) => {
    if (!cart.some((item) => item.CTRLNO === book.CTRLNO)) {
      setCart([...cart, book]);
    } else {
      alert('이 도서는 이미 장바구니에 추가되어 있습니다.');
    }
  };

  // 장바구니에서 도서 삭제하는 함수
  const removeFromCart = (ctrlNo) => {
    setCart(cart.filter((item) => item.CTRLNO !== ctrlNo));
  };

  // 장바구니 전체 대여 완료
  const checkout = () => {
    alert('도서가 대여되었습니다.');
    setCart([]); // 장바구니 비우기
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<ShowList cart={cart} addToCart={addToCart} />} />
        <Route path="/cart" element={<CartList cart={cart} removeFromCart={removeFromCart} checkout={checkout} />} />
        <Route path="/book/:CTRLNO" element={<Detail />} />
        <Route path="/rental" element={<RentalList cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
