import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
const List = () => {
  const [data, setData] = useState([]); 
  const [isDataLoaded, setIsDataLoaded] = useState(false); 
  const navigate = useNavigate();

  const apiUrl = "https://672819d3270bd0b975545f98.mockapi.io/api/vi/users";

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
      setIsDataLoaded(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`); 
      if (response.status !== 200) throw new Error("삭제 실패");
      alert("삭제 성공");
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  const goToDetail = (id) => {
    navigate(`/detail?id=${id}`);
  };

  const goToUpdate = (id) => {
    navigate(`/update?id=${id}`);
  };

  const goToCreate = () => {
    navigate(`/create`);
  };

  return (
    <div className="container">
      <h1>회원 관리</h1>
      <button className="btn btn-outline-dark" onClick={fetchData}>
        회원 목록 로드
      </button>
      <button className="btn btn-primary ms-2" onClick={goToCreate}>
        데이터 추가
      </button>
      <br />
      <br />
      <h2>회원 목록</h2>
      {isDataLoaded ? (
        data.length > 0 ? (
          <div id="data-list">
            {data.map((user) => (
              <div key={user.id} className="mb-3 d-flex align-items-center">
                <span
                  onClick={() => goToDetail(user.id)} 
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {`ID: ${user.id}, 이름: ${user.firstName}, 성: ${user.lastName}`}
                </span>

                <button
                  className="btn btn-warning ms-2"
                  onClick={() => goToUpdate(user.id)}
                >
                  수정
                </button>

                <button
                  className="btn btn-danger ms-2"
                  onClick={() => deleteUser(user.id)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>데이터가 없습니다.</p>
        )
      ) : (
        <p>데이터가 로드되지 않았습니다.</p>
      )}
    </div>
  );
};

export default List;
