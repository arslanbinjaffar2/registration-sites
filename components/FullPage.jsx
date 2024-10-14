import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import ReactPageScroller from "components/scroller";

const FullPage = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const handlePageChange = (number) => {
    setCurrentPage(number); // set currentPage number, to reset it from the previous selected.
  };

  const getPagesNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= 4; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} eventKey={i - 1} onSelect={handlePageChange}>
          {i}
        </Pagination.Item>
      );
    }

    return [...pageNumbers];
  };

  const pagesNumbers = getPagesNumbers();

  return (
    <React.Fragment>
      <ReactPageScroller
        pageOnChange={handlePageChange}
        customPageNumber={currentPage}
      >
        <div
          style={{ backgroundImage: `url(${require("public/img/h1-slide2.jpg")})` }}
          className="component parallax-backgroud"
        >
          <div>{/* <OurProgramv3 /> */}</div>
        </div>
        <div className="component">
          <div>{/* <Video /> */}</div>
        </div>
        <div
          style={{ backgroundImage: `url(${require("public/img/h2-slide3.jpg")})` }}
          className="component"
        >
          Lorem ipsum dolor sit.
        </div>
        <div
          style={{ backgroundImage: `url(${require("public/img/h1-slide1.jpg")})` }}
          className="component"
        >
          Lorem ipsum dolor sit.
        </div>
        <div
          style={{ backgroundImage: `url(${require("public/img/h1-slide2.jpg")})` }}
          className="component"
        >
          Lorem ipsum dolor sit.
        </div>
      </ReactPageScroller>
      <Pagination className="pagination-additional-class tp-bullet" bsSize="large">
        {pagesNumbers}
      </Pagination>
    </React.Fragment>
  );
};

export default FullPage;
