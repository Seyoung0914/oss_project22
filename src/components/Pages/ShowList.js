import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowList = ({ cart = [], addToCart }) => {
  const [books, setBooks] = useState([]); // 전체 도서 데이터를 저장할 상태
  const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 도서
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [showAvailableOnly, setShowAvailableOnly] = useState(false); // 대여 가능만 보기
  const [languageFilter, setLanguageFilter] = useState(""); // 언어 필터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const itemsPerPage = 20; // 한 페이지에 표시할 항목 수

  // 데이터 패칭
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching books from API...");
        const response = await axios.get("/api/books"); // Vercel API 호출
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
          CTRLNO: row.getElementsByTagName("CTRLNO")[0]?.textContent || "N/A",
          TITLE: row.getElementsByTagName("TITLE")[0]?.textContent || "제목 없음",
          AUTHOR: row.getElementsByTagName("AUTHOR")[0]?.textContent || "저자 없음",
          PUBLER: row.getElementsByTagName("PUBLER")[0]?.textContent || "출판사 없음",
          LANG_NAME: row.getElementsByTagName("LANG_NAME")[0]?.textContent || "기타",
        }));

        console.log("Parsed Books:", bookArray);

        setBooks(bookArray); // 전체 도서 리스트 설정
        setFilteredBooks(bookArray); // 필터링용 데이터 초기화
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

    console.log("Applying filters...");
    console.log("Original Books:", books);

    let updatedBooks = books;

    if (searchKeyword) {
      updatedBooks = updatedBooks.filter((book) =>
        book.TITLE?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      console.log("After Search Filter:", updatedBooks);
    }

    if (showAvailableOnly && cart.length > 0) {
      updatedBooks = updatedBooks.filter(
        (book) => !cart.some((item) => item.CTRLNO === book.CTRLNO)
      );
      console.log("After Available Only Filter:", updatedBooks);
    }

    if (languageFilter) {
      updatedBooks = updatedBooks.filter((book) => book.LANG_NAME === languageFilter);
      console.log("After Language Filter:", updatedBooks);
    }

    setFilteredBooks(updatedBooks);
  }, [books, searchKeyword, showAvailableOnly, languageFilter, cart]);

  // 현재 페이지의 도서 데이터 가져오기
  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (pageNumber) => {
    console.log("Changing to Page:", pageNumber);
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>데이터를 불러오는 중입니다...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className="container">
      <h1>도서 리스트</h1>

      {/* 필터 섹션 */}
      <div className="filters">
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <select
          onChange={(e) => setLanguageFilter(e.target.value)}
          value={languageFilter}
        >
          <option value="">모든 언어</option>
          <option value="한국어">한국어</option>
          <option value="영어">영어</option>
          <option value="기타">기타</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
          />
          대여 가능 도서만 보기
        </label>
      </div>

      {/* 도서 리스트 */}
      <div id="data-list">
        {filteredBooks?.length > 0 ? (
          displayedBooks.map((book) => (
            <div key={book.CTRLNO} className="book-item">
              <span>{`${book.TITLE} - ${book.AUTHOR} (${book.PUBLER})`}</span>
              <button
                className="btn btn-warning"
                onClick={() => addToCart(book)}
                disabled={cart?.some((item) => item.CTRLNO === book.CTRLNO)}
              >
                {cart?.some((item) => item.CTRLNO === book.CTRLNO)
                  ? "장바구니에 있음"
                  : "장바구니 추가"}
              </button>
              <button
                className="btn btn-info"
                onClick={() => alert(`상세정보: ${book.TITLE}`)}
              >
                상세보기
              </button>
            </div>
          ))
        ) : (
          <p>도서 데이터가 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBooks.length / itemsPerPage) }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`page-btn ${currentPage === pageNumber ? "active" : ""}`}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ShowList;
