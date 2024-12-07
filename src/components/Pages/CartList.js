import React from 'react';
import { Link } from 'react-router-dom';

function CartList({ cartBooks, setCartBooks, rentalBooks, setRentalBooks }) {
  const handleRemoveFromCart = (id) => {
    setCartBooks(cartBooks.filter((book) => book.CTRLNO !== id));
  };

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
            <li className="list-group-item d-flex justify-content-between align-items-center" key={book.CTRLNO}>
              <div>
                <strong>{book.TITLE}</strong> by {book.AUTHOR}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(book.CTRLNO)}>
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
