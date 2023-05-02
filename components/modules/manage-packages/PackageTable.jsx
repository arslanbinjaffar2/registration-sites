import moment from 'moment';
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

const PackageTable = ({eventUrl, item, labels}) => {

  const registerDateEnd = React.useMemo(()=>{
    let currentDate = moment();
    let endDate = moment(`${moment(item.eventsite_setting.registration_end_date).format('YYYY-MM-DD')} ${item.eventsite_setting.registration_end_time}`);
    let diff = item.eventsite_setting.registration_end_date !== "0000-00-00 00:00:00" ? (currentDate.diff(endDate) < 0) : false;
    return diff;
  },[item]);

  return (
    <div className='ebs-package-table-wrapp'>
      <h5>{(labels.EVENTSITE_TICKETS_LEFT !== undefined && labels.EVENTSITE_TICKETS_LEFT !== "") ? labels.EVENTSITE_TICKETS_LEFT : "Tickets left:"} {(item.total_tickets - item.sold_tickets) > 0 ? (item.total_tickets - item.sold_tickets) : 0}</h5>
      <h3>{item.heading}</h3>
      <p>{item.sub_heading}</p> 
      <div className="ebs-table-price">{item.price}<small>DKK</small></div>
      <div className="ebs-table-price-listing" dangerouslySetInnerHTML={{__html:item.description}}>
      </div>
      {registerDateEnd && 
        <div className="ebs-table-timer">
          <h4>{(labels.EVENTSITE_TIME_LEFT !== undefined && labels.EVENTSITE_TIME_LEFT !== "") ?  labels.EVENTSITE_TIME_LEFT : "Time left:"}</h4>
          <Countdown date={moment(`${moment(item.eventsite_setting.registration_end_date).format('YYYY-MM-DD')} ${item.eventsite_setting.registration_end_time}`)} renderer={renderer} />
        </div>
      }
    {registerDateEnd && <div className="ebs-footer-table">
      <a href={`${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${eventUrl}/attendee/registration-form/${item.registration_form_id}`} className="btn-table">{labels.EVENTSITE_REGISTER_NOW2}</a>  
    </div>}
    </div>
  )
}

export default PackageTable