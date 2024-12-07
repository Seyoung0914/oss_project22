import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router.js';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const [rentals, setRentals] = useState([]); // 📘 대여한 도서 상태 추가
  const [loading, setLoading] = useState(false); // 대여 요청 중 로딩 상태 관리

  // 📘 장바구니에 도서 추가하는 함수
  const addToCart = (book) => {
    if (!cart.some((item) => item.CTRLNO === book.CTRLNO)) {
      setCart([...cart, book]);
      console.log(`🛒 장바구니에 추가됨: ${book.TITLE}`);
    } else {
      alert('이 도서는 이미 장바구니에 추가되어 있습니다.');
      console.log(`⚠️ 이미 장바구니에 추가된 도서: ${book.TITLE}`);
    }
  };

  // 📘 장바구니에서 도서 삭제하는 함수
  const removeFromCart = (ctrlNo) => {
    const updatedCart = cart.filter((item) => item.CTRLNO !== ctrlNo);
    setCart(updatedCart);
    console.log('❌ 삭제 후 장바구니:', updatedCart);
  };

  // 📘 장바구니 전체 대여 완료
  const checkout = async () => {
    if (cart.length === 0) {
      alert('장바구니에 도서가 없습니다.');
      return;
    }

    try {
      setLoading(true); // 로딩 시작
      console.log('🚀 대여 요청 도서 목록:', cart);

      const apiUrl = 'https://oss-project22-z6jk.vercel.app/api/rentals';
      const response = await axios.post(apiUrl, { cart });

      console.log('📘 대여 요청 응답:', response.data);
      alert('대여가 완료되었습니다.');

      // 📘 대여한 도서 정보 추가 (기존 rentals에 대여한 도서 추가)
      setRentals((prevRentals) => [...prevRentals, ...cart]);

      setCart([]); // 장바구니 비우기
    } catch (error) {
      console.error('❌ 대여 요청 실패:', error);
      alert('대여 요청에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="App">
      <Router
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        checkout={checkout}
        loading={loading}
        rentals={rentals} // 📘 대여한 도서 정보 전달
      />
    </div>
  );
}

export default App;
