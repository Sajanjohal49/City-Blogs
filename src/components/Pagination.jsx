import "../css/pagination.scss";
import classnames from "classnames";
//I have used this classnames component to define the css styling on the current page Number in pagination

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import usePagination, { DOTS } from "../hooks/usePagination";

import PropTypes from "prop-types";
import React from "react";
import { nanoid } from "nanoid";

function Pagination({
  onPageChange,
  onPageSizeOptionChange,
  totalCount,
  currentPage,
  siblingCount = 1,
  pageSize,
  postPerPage,
  pageSizeOptions,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    siblingCount,
  });
  // I have written some comments for better clarification
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  //If the first and last page is the same, then previous and next arrow buttons are disabled
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className="wrapper"
      // Do not remove the aria-label below, it is used for City automation.
      aria-label="Blog post pagination list"
    >
      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton left"
          // Do not remove the aria-label below, it is used for City automation.
          aria-label="Goto previous page"
          onClick={onPrevious}
          //If user at the beginning of the results, the previous button should be disabled
          disabled={currentPage === 1} // change this line to disable a button.
        >
          <ChevronLeftIcon />
        </button>
      </li>

      {paginationRange.map((pageNumber) => {
        const key = nanoid();

        if (pageNumber === DOTS) {
          return (
            <li key={key} className="dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={key}
            className="paginationItem"
            aria-current="page" // change this line to highlight a current page.
          >
            <button
              type="button"
              // Do not remove the aria-label below, it is used for City automation.
              aria-label={`Goto page ${pageNumber}`}
              //here is what i was talking about(CSS Styling on the current page Number)
              className={classnames("", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
               
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton right"
          // Do not remove the aria-label below, it is used for City automation.
          aria-label="Goto next page"
          onClick={onNext}
          //If user at the end of the results, the next button should be disabled
          disabled={currentPage === lastPage} // change this line to disable a button.
          aria-current="page2"
        >
          <ChevronRightIcon />
        </button>
      </li>

      <select
        className="paginationSelector"
        // Do not remove the aria-label below, it is used for City automation.
        aria-label="Select page size"
        value={postPerPage}
        //When user changes “X per page” (the only options will be 15, 25, 50 and 100), it should only display at maximum that amount of blogs per page and the first page is displayed
        onChange={(e) => {
          onPageSizeOptionChange(e.target.value);
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} defaultValue={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </ul>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.instanceOf(Array),
  onPageChange: PropTypes.func,
  onPageSizeOptionChange: PropTypes.func,
};

Pagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 1,
  pageSizeOptions: [15, 25, 50, 100],
  onPageChange: () => {},
  onPageSizeOptionChange: () => {},
};

export default Pagination;
