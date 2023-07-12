import React from "react";
import {PaginationPropTypes} from '../PropTypes/Validaciones';

const Pagination = ({
  offset,
  totalCount,
  currentPage,
  setCurrentPage,
  setOffset,
  filteredCategories,
  filteredTypes,
}) => {
  const limit = 20;

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(totalCount / limit);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (filteredTypes?.length || filteredCategories?.length > 0) {
      goToPreviousPage();
      setOffset(offset - 20);
    } else {
      if (offset > 0) {
        setOffset((prevOffset) => prevOffset - limit);
      }
    }
  };

  const handleNextClick = () => {
    if (filteredTypes?.length || filteredCategories?.length > 0) {
      goToNextPage();
      setOffset(offset + 20);
    } else {
      if (offset + limit < totalCount) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    }
  };

  const handleFirstClick = () => {
    if (filteredTypes?.length || filteredCategories?.length > 0) {
      if (currentPage !== 1) {
        setCurrentPage(1);
        setOffset(0);
      }
    } else {
      setOffset(0)
    }
  };

  const handleLastClick = () => {
    if (filteredTypes?.length || filteredCategories?.length > 0) {
      const totalPages = Math.ceil(totalCount / limit);
      if (currentPage !== totalPages) {
        setCurrentPage(totalPages);
        setOffset((totalPages - 1) * limit);
      }
    } else {
      const lastOffset = Math.max(0, totalCount - (totalCount % limit));
      setOffset(lastOffset)
    }
  };

  const isFirstPage = offset === 0;
  const isLastPage = offset + 20 >= totalCount;

  return (
    <div className="flex justify-center mt-3">
      <div className="flex flex-wrap justify-center">
        <section className="mb-2">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-2 rounded-md ${
              isFirstPage && currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleFirstClick}
            disabled={isFirstPage && currentPage === 1}
          >
            &laquo;
          </button>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-2 rounded-md ${
              isFirstPage && currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePreviousClick}
            disabled={isFirstPage && currentPage === 1}
          >
            Anterior
          </button>
        </section>
        <section className="mb-2">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md ${
              isLastPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextClick}
            disabled={isLastPage}
          >
            Siguiente
          </button>

          <button
            className={`bg-blue-500 hover:bg-blue-700 ml-4 text-white font-bold py-2 px-6 rounded-md ${
              isLastPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleLastClick}
            disabled={isLastPage}
          >
            &raquo;
          </button>
        </section>
      </div>
    </div>
  );
};


Pagination.propTypes = PaginationPropTypes;


export default Pagination;
