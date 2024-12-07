import React from 'react';
import { Link } from 'react-router-dom';

function RentalList({ rentalBooks, setRentalBooks }) {
  const handleReturn = (id) => {
    setRentalBooks(rentalBooks.filter((book) => book.CTRLNO !== id));
  };

  return (
    <div className="container">
      <h2>대여 중인 도서 목록</h2>
      {rentalBooks.length > 0 ? (
        <ul className="list-group">
          {rentalBooks.map((book) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={book.CTRLNO}>
              <div>
                <strong>{book.TITLE}</strong> by {book.AUTHOR}
              </div>
              <div>
                <button className="btn btn-danger btn-sm" onClick={() => handleReturn(book.CTRLNO)}>
                  반납
                </button>
                <Link to={`/book/${book.CTRLNO}`} className="btn btn-primary btn-sm ms-2">
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

export default RentalList;
