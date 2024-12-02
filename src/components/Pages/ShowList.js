import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowList = ({ cart, addToCart }) => {
  const [books, setBooks] = useState([]); // 전체 도서 데이터를 저장할 상태
  const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 도서
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [searchType, setSearchType] = useState("TITLE"); // 검색 유형
  const [showAvailableOnly, setShowAvailableOnly] = useState(false); // 대여 가능만 보기
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const navigate = useNavigate(); // 페이지 이동용 네비게이션

  const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

  // 데이터 패칭
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching books from API...");
        const response = await axios.get("/api/books"); // Vercel API 호출
        const xmlData = response.data;

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
        const bookArray = Array.from(rows).map((row) => ({
          CTRLNO: row.getElementsByTagName("CTRLNO")[0]?.textContent || "N/A",
          TITLE: row.getElementsByTagName("TITLE")[0]?.textContent || "제목 없음",
          AUTHOR: row.getElementsByTagName("AUTHOR")[0]?.textContent || "저자 없음",
          PUBLER: row.getElementsByTagName("PUBLER")[0]?.textContent || "출판사 없음",
          AVAILABLE: true, // 기본적으로 대여 가능
        }));

        setBooks(bookArray);
        setFilteredBooks(bookArray);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 필터링 및 검색 적용
  useEffect(() => {
    if (!books || books.length === 0) return;

    let updatedBooks = books;

    if (searchKeyword) {
      updatedBooks = updatedBooks.filter((book) =>
        book[searchType]?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (showAvailableOnly) {
      updatedBooks = updatedBooks.filter((book) => book.AVAILABLE);
    }

    setFilteredBooks(updatedBooks);
  }, [books, searchKeyword, searchType, showAvailableOnly]);

  if (loading) return <p>데이터를 불러오는 중입니다...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className="container">
      <h1>도서 리스트</h1>

      {/* 검색 및 필터 */}
      <div className="filters">
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <select
          onChange={(e) => setSearchType(e.target.value)}
          value={searchType}
        >
          <option value="TITLE">책 제목</option>
          <option value="AUTHOR">저자</option>
          <option value="PUBLER">출판사</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
          />
          대여 가능 도서만 보기
        </label>
        <button onClick={() => navigate("/cart")} className="btn btn-primary">
          장바구니 보기
        </button>
        <button onClick={() => navigate("/rental")} className="btn btn-secondary">
          대여 리스트 보기
        </button>
      </div>

      {/* 도서 목록 */}
      <div id="data-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.CTRLNO} className="book-item">
              <hr />
              <div>
                <strong>{book.TITLE}</strong>
                <p>{`${book.AUTHOR} / ${book.PUBLER}`}</p>
                <span>
                  {book.AVAILABLE ? (
                    <span style={{ color: "green" }}>대여 가능</span>
                  ) : (
                    <span style={{ color: "red" }}>대여 불가능</span>
                  )}
                </span>
              </div>
              <div>
                <button
                  className="btn btn-warning"
                  onClick={() => addToCart(book)}
                  disabled={!book.AVAILABLE}
                >
                  장바구니 추가
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => navigate(`/book/${book.CTRLNO}`)}
                >
                  상세보기
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>도서 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ShowList;
