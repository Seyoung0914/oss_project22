import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowList = () => {
  const [books, setBooks] = useState([]); // 도서 데이터를 저장할 상태
  const [error, setError] = useState(null); // 오류 메시지를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching books from API...");
        const response = await axios.get("/api/books"); // API 호출
        const xmlData = response.data; // XML 데이터
        console.log("Raw API Response:", xmlData);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "application/xml");

        // 오류가 있으면 처리
        const resultCode = xmlDoc.getElementsByTagName("CODE")[0]?.textContent;
        if (resultCode !== "INFO-000") {
          throw new Error(
            xmlDoc.getElementsByTagName("MESSAGE")[0]?.textContent || "API Error"
          );
        }

        const rows = xmlDoc.getElementsByTagName("row");
        console.log("Extracted Rows:", rows);

        // 데이터를 배열로 변환
        const bookArray = Array.from(rows).map((row) => ({
          title: row.getElementsByTagName("TITLE")[0]?.textContent || "제목 없음",
          author: row.getElementsByTagName("AUTHOR")[0]?.textContent || "저자 없음",
          publisher: row.getElementsByTagName("PUBLER")[0]?.textContent || "출판사 없음",
          callNumber: row.getElementsByTagName("CALL_NO")[0]?.textContent || "청구기호 없음",
        }));

        console.log("Parsed Books:", bookArray);
        setBooks(bookArray);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>도서 리스트</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <strong>제목:</strong> {book.title} <br />
              <strong>저자:</strong> {book.author} <br />
              <strong>출판사:</strong> {book.publisher} <br />
              <strong>청구기호:</strong> {book.callNumber}
            </li>
          ))}
        </ul>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default ShowList;
