import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './Pages/ShowList.js';
import CartList from './Pages/CartList.js';
import Detail from './Pages/Detail.js';
import RentalList from './Pages/RentalList.js';

const Router = () => {
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]); // 전체 도서 목록
  const [rentalList, setRentalList] = useState([]); // 대여 목록

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

  // 대여리스트에서 도서 반납
  const removeFromRental = (book) => {
    // 대여리스트에서 책을 제거
    setRentalList(rentalList.filter((rentalBook) => rentalBook.CTRLNO !== book.CTRLNO));

    // books 배열에서 해당 책의 AVAILABLE을 '대여 가능'으로 변경
    setBooks(books.map((b) => (b.CTRLNO === book.CTRLNO ? { ...b, AVAILABLE: '대여 가능' } : b)));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<ShowList books={books} addToCart={addToCart} rentalList={rentalList} />} />
        <Route path="/cart" element={<CartList cart={cart} removeFromCart={removeFromCart} checkout={checkout} />} />
        <Route path="/book/:CTRLNO" element={<Detail />} />
        <Route path="/rental" element={<RentalList rentalList={rentalList} removeFromRental={removeFromRental} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
