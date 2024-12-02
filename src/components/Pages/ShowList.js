import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("Fetching books from Serverless Function...");
        const response = await axios.get("/api/books"); // Vercel Serverless Function 호출
        console.log("API Response:", response.data);
        // XML을 JSON으로 변환하거나 파싱 필요
        setBooks(response.data); // 필요 시 XML 파싱 추가
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>데이터를 불러오는 중입니다...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>도서 리스트</h1>
      {books.map((book, index) => (
        <div key={index}>
          <h3>{book.TITLE}</h3>
          <p>저자: {book.AUTHOR}</p>
          <p>출판사: {book.PUBLER}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
