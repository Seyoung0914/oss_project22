import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rental = () => {
  const [rentalList, setRentalList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 대여 리스트 불러오기
    const storedRentalList = localStorage.getItem('rentalList');
    if (storedRentalList) {
      setRentalList(JSON.parse(storedRentalList));
    }
  }, []);

  // 도서 반납 함수
  const handleReturnBook = (ctrlno) => {
    const updatedRentalList = rentalList.filter((book) => book.CTRLNO !== ctrlno);
    setRentalList(updatedRentalList);
    localStorage.setItem('rentalList', JSON.stringify(updatedRentalList));
  };

  if (rentalList.length === 0) {
    return <p>대여 중인 도서가 없습니다.</p>;
  }

  return (
    <div className="container">
      <h1>대여한 도서 목록</h1>
      <div>
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
            <div>
              <button className="btn btn-danger" onClick={() => handleReturnBook(book.CTRLNO)}>
                반납
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
        도서 목록으로 돌아가기
      </button>
    </div>
  );
};

export default Rental;
