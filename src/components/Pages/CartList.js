import React from 'react';
import { Link } from 'react-router-dom';

function CartList({ cartBooks, setCartBooks, rentalBooks, setRentalBooks }) {
  // 장바구니에서 도서 삭제
  const handleRemoveFromCart = (id) => {
    setCartBooks(cartBooks.filter((book) => book.id !== id));
  };

  // "대여하기" 기능: 장바구니 도서를 대여 목록으로 이동
  const handleRentBooks = () => {
    const updatedRentalBooks = [...rentalBooks, ...cartBooks];
    setRentalBooks(updatedRentalBooks);
    setCartBooks([]); // 장바구니 비우기
  };

  return (
    <div className="container">
      <h2>장바구니</h2>
      {cartBooks.length > 0 ? (
        <ul className="list-group">
          {cartBooks.map((book) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={book.id}>
              <div>
                <strong>{book.title}</strong> by {book.author}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(book.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>장바구니가 비어 있습니다.</p>
      )}
      <div className="mt-3">
        <button className="btn btn-success" onClick={handleRentBooks} disabled={cartBooks.length === 0}>
          대여하기
        </button>
        <Link to="/home" className="btn btn-secondary ms-2">
          도서 리스트로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default CartList;
