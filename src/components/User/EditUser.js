import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios"; 

const EditUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "남",
    nationality: "내국인",
  });
  const [editCount, setEditCount] = useState(0); 
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("id");
  const apiUrl = `https://672819d3270bd0b975545f98.mockapi.io/api/vi/users/${userId}`;

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const birthDateRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(apiUrl); 
        setFormData(response.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchUser();
  }, [apiUrl]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setEditCount((prev) => prev + 1);

    try {
      await axios.put(apiUrl, { ...formData, [name]: value }); 
    } catch (error) {
      alert(error.message);
    }
  };

  const validateInput = () => {
    if (!formData.firstName) {
      alert("이름을 입력하세요.");
      firstNameRef.current.focus();
      return false;
    }
    if (!formData.lastName) {
      alert("성을 입력하세요.");
      lastNameRef.current.focus();
      return false;
    }
    if (!formData.birthDate) {
      alert("생년월일을 입력하세요.");
      birthDateRef.current.focus();
      return false;
    }
    return true;
  };

  const handleNavigateBack = () => {
    if (!validateInput()) return; 
    navigate("/list");
  };

  return (
    <div className="container">
      <h1>데이터 수정</h1>
      <div className="mb-3">
        <label>이름:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          ref={firstNameRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>성:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          ref={lastNameRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>생년월일:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          ref={birthDateRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>성별:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-control"
        >
          <option value="남">남</option>
          <option value="여">여</option>
        </select>
      </div>
      <div className="mb-3">
        <label>국적:</label>
        <select
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className="form-control"
        >
          <option value="내국인">내국인</option>
          <option value="외국인">외국인</option>
        </select>
      </div>
      <div className="mb-3">
        <label>수정 횟수:</label>
        <p>{editCount}번</p>
      </div>
      <button className="btn btn-secondary" onClick={handleNavigateBack}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default EditUser;
