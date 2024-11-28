import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Detail = () => {
  const [user, setUser] = useState(null); 
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();
  const userId = searchParams.get("id"); 
  const apiUrl = `https://672819d3270bd0b975545f98.mockapi.io/api/vi/users/${userId}`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("사용자 데이터 로드 실패");
        const result = await response.json();
        setUser(result);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchUser();
  }, [apiUrl]);

  const goToList = () => {
    navigate("/list"); 
  };

  return (
    <div className="container">
      <h1>상세 정보</h1>
      {user ? (
        <div className="detail">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>이름:</strong> {user.firstName}</p>
          <p><strong>성:</strong> {user.lastName}</p>
          <p><strong>생년월일:</strong> {user.birthDate}</p>
          <p><strong>성별:</strong> {user.gender}</p>
          <p><strong>국적:</strong> {user.nationality}</p>
          <button className="btn btn-secondary mt-3" onClick={goToList}>
            목록으로 돌아가기
          </button>
        </div>
      ) : (
        <p>데이터 로드 중</p>
      )}
    </div>
  );
};

export default Detail;
