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

const Variation2 = ({eventSiteSettings, labels, registerDateEnd, checkTickets, waitingList, moduleVariation}) => {
  return (
    <div className="module-section">
      <div  style={{ backgroundImage: `url(${moduleVariation.background_image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/variation_background/' + moduleVariation.background_image : require("img/h1-parallax1.jpg")}`,padding: "80px 0", backgroundPosition:"center", backgroundSize:'cover' }} className="edgtf-parallax-section-holder">
      {(!registerDateEnd && (!checkTickets.ticketsSet || checkTickets.remainingTickets > 0)) && (
        <div className="container">
        <div className="row d-flex mb-5">
            <div className="col-md-8 offset-md-2 text-center">
              <div className="edgtf-title-section-holder">
                <h2 style={{ color: "#ffffff" }} className="edgtf-title-with-dots edgtf-appeared">
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
          <div className="ebs-register-now-sec ebs-register-v2">
            {(checkTickets.ticketsSet && eventSiteSettings.eventsite_tickets_left && checkTickets.remainingTickets > 0) && <div className="ebs-ticket-remaning">
              <div style={{ color: "#ffffff" }} className="ebs-ticket-counter">{checkTickets.remainingTickets}</div>
              <div style={{ color: "#ffffff" }} className="ebs-ticket-status">{labels.EVENTSITE_TICKETS_LEFT}</div>
            </div>}
            {eventSiteSettings.eventsite_time_left && <Countdown date={moment(eventSiteSettings.registration_end_date)} renderer={renderer} />}
            <div className="row d-flex">
              <div className="col-md-10 offset-md-1">
                <div className="ebs-caption-box">
                  <div style={{ color: "#ffffff" }} className="ebs-description-area">{labels.EVENTSITE_HOME_REGISTRATION_TEXT}</div>
                  <a style={{border: '2px solid #fff', color: '#fff'}} href="#!" rel="noopener" className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        
        {(!registerDateEnd && (checkTickets.ticketsSet && checkTickets.remainingTickets <= 0) && waitingList ) && (
          <div className="container">
            <div className="row d-flex mb-5">
                  <div className="col-md-8 offset-md-2 text-center">
                    <div className="edgtf-title-section-holder">
                      <h2 className="edgtf-title-with-dots edgtf-appeared">
                        {labels.REGISTER_FOR_WAITING_LIST}
                      </h2>
                      <span className="edge-title-separator edge-enable-separator"></span>
                    </div>
                    <div className="edgtf-title-section-holder">
                      <h6 className="edgtf-section-subtitle">
                        {labels.NO_TICKETS_LEFT_REGISTER_WAITING_LIST}
                      </h6>
                    </div>
                  </div>
            </div>
            <div className="ebs-register-now-sec">
            <div className="row d-flex">
                <div className="col-md-10 offset-md-1">
                  <div className="ebs-caption-box">
                    <div className="ebs-description-area">{labels.WAITING_LIST_EVENTSITE_INTRODUCTION_PARA}</div>
                    <a href="#!" rel="noopener" className="edgtf-btn edgtf-btn-medium edgtf-btn-solid"><span className="edgtf-btn-text">{labels.REGISTER_FOR_WAITING_LIST_BUTTON}</span></a>
                  </div>
                </div>
              </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Variation2;
