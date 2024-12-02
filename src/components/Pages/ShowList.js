import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowList = () => {
  const [books, setBooks] = useState([]); // 전체 도서 데이터
  const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 도서 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const API_URL =
    "http://openapi.seoul.go.kr:8088/58624c767a63796c37386a42726a66/xml/SeoulLibraryBookSearchInfo/1/10"; // 테스트용 URL (최대 10개)

  // 데이터 로드
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL); // XML 데이터 가져오기
        const parser = new DOMParser(); // DOMParser를 사용해 XML 데이터를 파싱
        const xmlDoc = parser.parseFromString(response.data, "application/xml");

        // XML 데이터를 JSON으로 변환
        const items = Array.from(xmlDoc.getElementsByTagName("row")).map((item) => ({
          CTRLNO: item.getElementsByTagName("CTRLNO")[0]?.textContent || "",
          TITLE: item.getElementsByTagName("TITLE")[0]?.textContent || "",
          AUTHOR: item.getElementsByTagName("AUTHOR")[0]?.textContent || "",
          PUBLER: item.getElementsByTagName("PUBLER")[0]?.textContent || "",
          PUBLER_YEAR: item.getElementsByTagName("PUBLER_YEAR")[0]?.textContent || "",
          ISBN: item.getElementsByTagName("ISBN")[0]?.textContent || "",
          LANG_NAME: item.getElementsByTagName("LANG_NAME")[0]?.textContent || "",
          LOCA_NAME: item.getElementsByTagName("LOCA_NAME")[0]?.textContent || "",
        }));

        setBooks(items);
        setFilteredBooks(items); // 초기 데이터 설정
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
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
      <div>
        {filteredBooks.map((book) => (
          <div key={book.CTRLNO} className="book-item">
            <h3>{book.TITLE}</h3>
            <p>저자: {book.AUTHOR}</p>
            <p>출판사: {book.PUBLER}</p>
            <p>출판년도: {book.PUBLER_YEAR}</p>
            <p>ISBN: {book.ISBN}</p>
            <p>언어: {book.LANG_NAME}</p>
            <p>도서관: {book.LOCA_NAME}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
