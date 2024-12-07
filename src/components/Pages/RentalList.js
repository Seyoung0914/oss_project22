import React from 'react';
import { useNavigate } from 'react-router-dom';

const RentalList = ({ rentalList = [], removeFromRental = () => {} }) => {
  const navigate = useNavigate();

  const handleReturnBook = (book) => {
    // 반납하기 클릭 시 대여리스트에서 책을 제거
    removeFromRental(book);
  };

  if (rentalList.length === 0) {
    return <p>대여한 도서가 없습니다.</p>;
  }

  return (
    <div className="container">
      <h1>대여 리스트</h1>

      <div id="rental-list" style={{ marginTop: '20px' }}>
        {rentalList.map((book) => (
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ marginBottom: '10px' }}>
                <button className="btn btn-danger" onClick={() => handleReturnBook(book)} style={{ marginTop: '10px' }}>
                  반납하기
                </button>
              </div>
              <span
                style={{
                  color: book.AVAILABLE === '대여 가능' ? 'green' : 'red',
                }}
              >
                {book.AVAILABLE}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalList;
