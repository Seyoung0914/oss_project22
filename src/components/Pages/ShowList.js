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

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");
        const items = Array.from(xmlDoc.getElementsByTagName("row")).map((item) => ({
          CTRLNO: item.getElementsByTagName("CTRLNO")[0]?.textContent || "",
          TITLE: item.getElementsByTagName("TITLE")[0]?.textContent || "",
          AUTHOR: item.getElementsByTagName("AUTHOR")[0]?.textContent || "",
          PUBLER: item.getElementsByTagName("PUBLER")[0]?.textContent || "",
        }));

        setBooks(items); // 데이터 상태에 저장
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data from API:", err);
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
      {books.map((book) => (
        <div key={book.CTRLNO}>
          <h3>{book.TITLE}</h3>
          <p>저자: {book.AUTHOR}</p>
          <p>출판사: {book.PUBLER}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
