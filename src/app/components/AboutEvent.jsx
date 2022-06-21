import * as React from 'react';
import HeadingElement from '@/ui-components/HeadingElement';
class AboutEvent extends React.Component {
  render() {
    return (
      <div className="module-section">
        <div style={{ backgroundImage: `url(${require('img/h1-parallax1.jpg')})`, padding: '100px 0' }} className="edgtf-parallax-section-holder ebs-bg-holder">
        <div className="container">
        <HeadingElement dark={true} label={"About the Event"}  align={'left'} />
          <div className="row d-flex ebs-about-event-section">
            <div className="col-md-5">
              <div className="ebs-event-detail">
                <ul>
                  <li>
                    <i className="material-icons">date_range</i>
                    <span className="break">Wednesday ,14 May 2022</span>
                    <span className="break">Saturday  ,17 May 2022</span>
                  </li>
                  <li>
                    <i className="material-icons">location_on</i>
                    <address>225 W 52nd Street New York, NY 10019 US</address>
                  </li>
                  <li>
                    <i className="material-icons">watch_later</i>
                    <strong>Check-in open: </strong> 09:00 AM
                  </li>
                </ul>
                <a style={{border: '2px solid #fff', color: '#fff'}} href="#!" rel="noopener" className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">Register now </a>  
              </div>
            </div>
            <div className="col-md-6 offset-md-1">
              <figure>
                <img src="https://via.placeholder.com/660x440.png" alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default AboutEvent;
