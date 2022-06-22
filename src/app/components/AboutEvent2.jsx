import * as React from 'react';
import HeadingElement from '@/ui-components/HeadingElement';
const AboutEvent2 = () => {

    return (
      <div className="module-section">
        <div style={{padding: '80px 0' }} className="">
        <div className="container">
        <HeadingElement dark={false} label={"About the Event"}  align={'left'} />
          <div className="row d-flex ebs-about-event-section">
            <div className="col-lg-5 mb-5">
              <div className="ebs-event-detail ebs-dark-about">
                <ul>
                  <li>
                    <i className="material-icons">date_range</i>
                    <span className="break">Wednesday ,14 May 2022</span>
                    <span className="break">Saturday  ,17 May 2022</span>
                  </li>
                  <li>
                    <i className="material-icons">location_on</i>
                    <address>225 W 52nd Street New York, <br /> NY 10019 US</address>
                  </li>
                  <li>
                    <i className="material-icons">watch_later</i>
                    <strong>Check-in open: </strong> 09:00 AM
                  </li>
                </ul>
                <a style={{border: '2px solid #363636', color: '#363636',  fontWeight: 500, paddingTop: 10,paddingBottom: 10}} href="#!" rel="noopener" className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">Register now </a>  
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <figure>
                <img style={{width: '100%'}} src="https://via.placeholder.com/660x440.png" alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }


export default AboutEvent2;
