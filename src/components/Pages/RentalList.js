import React from 'react';

const RentalList = ({ rentals = [] }) => {
  if (rentals.length === 0) {
    return (
      <div className="container">
        <h1>대여한 도서</h1>
        <p>대여한 도서가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>대여한 도서</h1>
      <div id="rental-list" style={{ marginTop: '20px' }}>
        {rentals.map((book, index) => (
          <div key={index} className="rental-item">
            <strong>{book.TITLE}</strong>
            <p>{`${book.AUTHOR} / ${book.PUBLER}`}</p>
            <span
              style={{
                color: book.AVAILABLE === '대여 가능' ? 'green' : 'red',
              }}
            >
              대여 중
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalList;
