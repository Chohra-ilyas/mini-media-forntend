import React from "react";
import "./pagination.css";
const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const pagesarray = [];
  for (let i = 1; i <= pages; i++) {
    pagesarray.push(i);
  }
  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        className="page previous"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pagesarray.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "active page" : "page"}
          key={page}
        >
          {page}
        </div>
      ))}
      <button
        className="page next"
        onClick={() =>
          setCurrentPage((prev) => (prev < pages ? prev + 1 : prev))
        }
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
