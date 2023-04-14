import React from 'react';
import Countdown, { zeroPad } from "react-countdown";
const Completionist = () =>  
  <div className="col-12">
    <h2>This event is going on.</h2>
  </div>
;

// Renderer callback with condition
const renderer = ({ months,days,hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <React.Fragment>
          <div className="ebs-countdown-wrapp d-flex">
            {Math.floor(days/30) > 0 &&<span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period">Month</span>
              <span className="ebs-countdown-amount">{zeroPad(Math.floor(days/30))}</span>
            </span>}
            <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period">Days</span>
              <span className="ebs-countdown-amount">{zeroPad(Math.floor(days%30))}</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period">Hours</span>
              <span className="ebs-countdown-amount">{zeroPad(hours)}</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period">Min</span>
              <span className="ebs-countdown-amount">{zeroPad(minutes)}</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period">Sec</span>
              <span className="ebs-countdown-amount">{zeroPad(seconds)}</span>
            </span>
          </div>
      </React.Fragment>
    );
  }
};

const PackageTable = ({timer}) => {
  return (
    <div className='ebs-package-table-wrapp'>
      <h5>Remaining tickets : 04</h5>
      <h3>General attendee</h3>
      <p>Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt veniam.</p> 
      <div className="ebs-table-price">164 <small>DKK</small></div>
      <ul>
        <li>Access to table reservation for meetings</li>
        <li>Two day event pass</li>
        <li>Meet exhibitors and startups</li>
        <li>Access to our online event platform</li>
        <li>Watch stage content via live stream</li>
        <li>30+ World Leading Experts</li>
      </ul>
    {timer && <div className="ebs-table-timer">
      <h4>Ticket remaining time :</h4>
      <Countdown date={new Date('2023-12-12')} renderer={renderer} />
    </div>}
    <div className="ebs-footer-table">
      <a href="" className="btn-table">REGISTER</a>  
    </div>
    </div>
  )
}

export default PackageTable