import React from 'react';
import Countdown, { zeroPad } from "react-countdown";
const Completionist = () =>  
  <div className="col-12">
    <h2>This event is going on.</h2>
  </div>
;

// Renderer callback with condition
const renderer = ({ days,hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <React.Fragment>
          <div  className="ebs-countdown-wrapp countdown-wrapp">
            {Math.floor(days/30) > 0 &&<span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(Math.floor(days/30))}</span>
              <span className="countdown-period">Months</span>
            </span>}
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(Math.floor(days%30))}</span>
              <span className="countdown-period">Days</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(hours)}</span>
              <span className="countdown-period">Hours</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(minutes)}</span>
              <span className="countdown-period">Minutes</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(seconds)}</span>
              <span className="countdown-period">Seconds</span>
            </span>
          </div>
      </React.Fragment>
    );
  }
};

const Variation4 = () => {
  return (
    <div className="module-section">
      <div  style={{ backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,padding: "80px 0" }} className="edgtf-parallax-section-holder">
      <div className="container">
      <div className="row d-flex mb-5">
          <div className="col-md-8 offset-md-2 text-center">
            <div className="edgtf-title-section-holder">
              <h2 style={{color: '#fff'}} className="edgtf-title-with-dots edgtf-appeared">
                Book your Tickets
              </h2>
              <span className="edge-title-separator edge-enable-separator"></span>
            </div>
            <div className="edgtf-title-section-holder">
              <h6 className="edgtf-section-subtitle">
                Tickets are flying, get yours now!
              </h6>
            </div>
          </div>
        </div>
        <div className="ebs-register-now-sec ebs-register-v2 ebs-register-v3">
          <div className="row d-flex align-items-center flex-row-reverse">
          <div className="col-md-3">
              <div className="ebs-ticket-remaning">
                <div style={{color: '#fff'}} className="ebs-ticket-counter">79</div>
                <div style={{color: '#fff'}} className="ebs-ticket-status">Tickets left</div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="ebs-caption-box">
                <div style={{color: '#fff'}} className="ebs-description-area">Ablecom Technology is a leading supplier of server chassis design and manufacturing technology. With expert technology and enthusiasm, we have established solid collaborative partnerships with our clients and suppliers for over a decade, developing nearly</div>
              </div>
            </div>
          </div>
          <Countdown date='March 22 2022, 17:00' renderer={renderer} />
          <div className="text-center">
          <a style={{border: '2px solid #fff', color: '#fff'}} href="#!" rel="noopener" className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">Register Now</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Variation4;
