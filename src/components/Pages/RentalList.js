import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RentalList = () => {
  const [rentalList, setRentalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentalList = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/rentals');
        setRentalList(response.data);
      } catch (err) {
        setError('대여 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRentalList();
  }, []);

  const handleReturn = async (ctrlNo) => {
    try {
      await axios.post(`/api/return/${ctrlNo}`);
      setRentalList(rentalList.filter((book) => book.CTRLNO !== ctrlNo));
      alert('도서가 반납되었습니다.');
    } catch (error) {
      alert('반납에 실패했습니다.');
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  if (rentalList.length === 0) {
    return (
      <div className="container">
        <h1>대여 리스트</h1>
        <p>대여한 도서가 없습니다.</p>
        <button className="btn btn-primary" onClick={() => navigate('/home')} style={{ marginTop: '20px' }}>
          도서 리스트로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>대여 리스트</h1>

      <div id="rental-list" style={{ marginTop: '20px' }}>
        {rentalList.map((book) => (
          <div
            key={book.CTRLNO}
            className="rental-item"
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
              <button
                className="btn btn-danger"
                onClick={() => handleReturn(book.CTRLNO)}
                style={{ marginBottom: '10px' }}
              >
                반납
              </button>
              <span
                style={{
                  color: 'green',
                }}
              >
                대여 중
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rental-actions" style={{ marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/home')}>
          도서 리스트로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default RentalList;
