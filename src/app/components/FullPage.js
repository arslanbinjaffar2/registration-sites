import React from "react";
import OurProgramv3 from '@/OurProgramv3'
import Video from '@/Video'
import { Pager } from "react-bootstrap";

import ReactPageScroller from "@/scroller";


export default class FullPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: null };
  }

  handlePageChange = number => {
    this.setState({ currentPage: number }); // set currentPage number, to reset it from the previous selected.
  };

  getPagesNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= 4; i++) {
      pageNumbers.push(
        <Pager.Item key={i} eventKey={i - 1} onSelect={this.handlePageChange}>
          {i}
        </Pager.Item>,
      );
    }

    return [...pageNumbers];
  };

  render() {
    const pagesNumbers = this.getPagesNumbers();

    return (
      <React.Fragment>
        <ReactPageScroller
          pageOnChange={this.handlePageChange}
          customPageNumber={this.state.currentPage}
        >
         <div style={{ backgroundImage: `url(${require('img/h1-slide2.jpg')})` }} className="component parallax-backgroud">
           <div>
             <OurProgramv3 />
           </div>
         </div>
         <div className="component">
           <div>
             <Video />
           </div>
         </div>
         <div style={{ backgroundImage: `url(${require('img/h2-slide3.jpg')})` }} className="component">Lorem ipsum dolor sit.</div>
         <div style={{ backgroundImage: `url(${require('img/h1-slide1.jpg')})` }} className="component">Lorem ipsum dolor sit.</div>
         <div style={{ backgroundImage: `url(${require('img/h1-slide2.jpg')})` }} className="component">Lorem ipsum dolor sit.</div>
        </ReactPageScroller>
        <Pager className="pagination-additional-class tp-bullet" bsSize="large">
          {pagesNumbers}
        </Pager>
      </React.Fragment>
    );
  }
}
