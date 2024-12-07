import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartList = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 장바구니 데이터 불러오기
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // 장바구니에서 책 제거
  const handleRemoveFromCart = (ctrlno) => {
    const updatedCart = cart.filter((book) => book.CTRLNO !== ctrlno);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // 도서 대여 기능
  const handleRentBooks = () => {
    const storedRentalList = localStorage.getItem('rentalList');
    const existingRentalList = storedRentalList ? JSON.parse(storedRentalList) : [];
    const updatedRentalList = [...existingRentalList, ...cart];

    localStorage.setItem('rentalList', JSON.stringify(updatedRentalList));
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    navigate('/rental');
  };

  if (cart.length === 0) {
    return <p>장바구니에 담긴 도서가 없습니다.</p>;
  }

  return (
    <div className="container">
      <h1>장바구니</h1>
      <div>
        {cart.map((book) => (
          <div
            key={book.CTRLNO}
            className="book-item"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
              padding: '10px 0',
            }}
          >
            <div>
              <strong>{book.TITLE}</strong>
              <p>{`${book.AUTHOR} / ${book.PUBLER}`}</p>
            </div>
            <div>
              <button className="btn btn-danger" onClick={() => handleRemoveFromCart(book.CTRLNO)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-success" onClick={handleRentBooks} style={{ marginTop: '20px' }}>
        모든 도서 대여하기
      </button>

      <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
        도서 목록으로 돌아가기
      </button>
    </div>
  );
};

export default CartList;
