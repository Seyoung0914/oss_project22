import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Rental({ rentalBooks, setRentalBooks }) {
  // 반납 기능: 대여 목록에서 도서를 삭제
  const handleReturn = (id) => {
    setRentalBooks(rentalBooks.filter((book) => book.id !== id));
  };

  return (
    <div className="container">
      <h2>대여 중인 도서 목록</h2>
      {rentalBooks.length > 0 ? (
        <ul className="list-group">
          {rentalBooks.map((book) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={book.id}>
              <div>
                <strong>{book.title}</strong> by {book.author}
              </div>
              <div>
                <button className="btn btn-danger btn-sm" onClick={() => handleReturn(book.id)}>
                  반납
                </button>
                <Link to={`/book/${book.id}`} className="btn btn-primary btn-sm ms-2">
                  상세보기
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>대여 중인 도서가 없습니다.</p>
      )}
      <Link to="/home" className="btn btn-secondary mt-3">
        도서 리스트로 돌아가기
      </Link>
    </div>
  );
}

export default Rental;
