import React from 'react';
import Countdown, { zeroPad } from "react-countdown";
import moment from 'moment';
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

const Variation3 = ( {eventSiteSettings, labels, registerDateEnd, checkTickets, waitingList, moduleVariation} ) => {
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container">
      {(!registerDateEnd && (!checkTickets.ticketsSet || checkTickets.remainingTickets > 0)) && (
        <React.Fragment>
          <div className="row d-flex mb-5">
              <div className="col-md-8 offset-md-2 text-center">
                <div className="edgtf-title-section-holder">
                  <h2 className="edgtf-title-with-dots edgtf-appeared">
                  {labels.EVENTSITE_REGISTER_NOW}
                  </h2>
                  <span className="edge-title-separator edge-enable-separator"></span>
                </div>
                {(checkTickets.ticketsSet && eventSiteSettings.eventsite_tickets_left && checkTickets.remainingTickets > 0) && <div className="edgtf-title-section-holder">
                  <h6 className="edgtf-section-subtitle">
                  {labels.EVENTSITE_TICKETS_ARE_FLYING}
                  </h6>
                </div>}
              </div>
            </div>
            <div className="ebs-register-now-sec ebs-register-v3">
              <div className="row d-flex align-items-center flex-row-reverse">
              {(checkTickets.ticketsSet && eventSiteSettings.eventsite_tickets_left && checkTickets.remainingTickets > 0) && <div className="col-md-3">
                  <div className="ebs-ticket-remaning">
                    <div className="ebs-ticket-counter">{checkTickets.remainingTickets}</div>
                    <div className="ebs-ticket-status">{labels.EVENTSITE_TICKETS_LEFT}</div>
                  </div>
                </div>}
                <div className="col-md-9">
                  <div className="ebs-caption-box">
                    <div className="ebs-description-area">{labels.EVENTSITE_HOME_REGISTRATION_TEXT}</div>
                  </div>
                </div>
              </div>
              <Countdown date={moment(eventSiteSettings.registration_end_date)} renderer={renderer} />
              <div className="text-center">
                <a href="#!" rel="noopener" className="edgtf-btn edgtf-btn-medium edgtf-btn-solid"><span className="edgtf-btn-text">{labels.EVENTSITE_REGISTER_NOW2}</span></a>
              </div>
            </div>
        </React.Fragment>
      )}

      {(registerDateEnd && (!checkTickets.ticketsSet || checkTickets.remainingTickets > 0) && !waitingList) && (
        <div className="container">
          <div className="alert alert-danger alert-dismissable">{labels.REGISTER_DATE_END}</div>
        </div>
      )}
      
      {(!registerDateEnd && (checkTickets.ticketsSet && checkTickets.remainingTickets <= 0) && !waitingList ) && (
        <div className="container">
          <div className="alert alert-danger alert-dismissable">{labels.REGISTER_TICKET_END}</div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Variation3;
