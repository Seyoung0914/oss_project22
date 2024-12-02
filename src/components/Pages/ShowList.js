import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowList = ({ books, setBooks, cart, addToCart }) => {
  const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 도서
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [showAvailableOnly, setShowAvailableOnly] = useState(false); // 대여 가능만 보기
  const [languageFilter, setLanguageFilter] = useState(""); // 언어 필터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const itemsPerPage = 20; // 한 페이지에 표시할 항목 수
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // 데이터 패칭
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("Fetching books from API...");
        const response = await axios.get(
          "http://openapi.seoul.go.kr:8088/58624c767a63796c37386a42726a66/xml/SeoulLibraryBookSearchInfo/1/999"
        );

        console.log("API Response:", response.data);

        // XML 데이터를 JSON으로 변환
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");
        const items = Array.from(xmlDoc.getElementsByTagName("row")).map((item) => ({
          CTRLNO: item.getElementsByTagName("CTRLNO")[0]?.textContent,
          TITLE: item.getElementsByTagName("TITLE")[0]?.textContent,
          AUTHOR: item.getElementsByTagName("AUTHOR")[0]?.textContent,
          PUBLER: item.getElementsByTagName("PUBLER")[0]?.textContent,
          LANG_NAME: item.getElementsByTagName("LANG_NAME")[0]?.textContent || "기타",
        }));

        console.log("Parsed Books:", items);

        setBooks(items); // 전체 도서 리스트 설정
        setFilteredBooks(items); // 필터링용 데이터 초기화
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBooks();
  }, [setBooks]);

  // 필터링 및 검색 적용
  useEffect(() => {
    console.log("Applying filters...");
    console.log("Original Books:", books);

    let updatedBooks = books;

    // 검색 필터
    if (searchKeyword) {
      updatedBooks = updatedBooks.filter((book) =>
        book.TITLE?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      console.log("After Search Filter:", updatedBooks);
    }

    // 대여 가능 필터 (장바구니에 없는 도서만 보기)
    if (showAvailableOnly) {
      updatedBooks = updatedBooks.filter(
        (book) => !cart.some((item) => item.CTRLNO === book.CTRLNO)
      );
      console.log("After Available Only Filter:", updatedBooks);
    }

    // 언어 필터
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

  console.log("Displayed Books:", displayedBooks);

  // 페이지 변경
  const changePage = (pageNumber) => {
    console.log("Changing to Page:", pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>도서 리스트</h1>

      {/* 검색 및 필터링 */}
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
        {displayedBooks.map((book) => (
          <div key={book.CTRLNO} className="book-item">
            <span>{`${book.TITLE} - ${book.AUTHOR} (${book.PUBLER})`}</span>
            <button
              className="btn btn-warning"
              onClick={() => addToCart(book)}
              disabled={cart.some((item) => item.CTRLNO === book.CTRLNO)}
            >
              {cart.some((item) => item.CTRLNO === book.CTRLNO) ? "장바구니에 있음" : "장바구니 추가"}
            </button>
            <button
              className="btn btn-info"
              onClick={() => alert(`상세정보: ${book.TITLE}`)}
            >
              상세보기
            </button>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-btn ${currentPage === pageNumber ? "active" : ""}`}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
