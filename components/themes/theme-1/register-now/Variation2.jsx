import React from 'react';
import Countdown, { zeroPad } from "react-countdown";
import moment from 'moment';
import HeadingElement from 'components/ui-components/HeadingElement';

const Completionist = () =>
  <div className="col-12">
    <h2>This event is going on.</h2>
  </div>
  ;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <React.Fragment>
        <div className="ebs-countdown-wrapp countdown-wrapp">
          {Math.floor(days / 30) > 0 && <span className="edgtf-countdown is-countdown">
            <span className="countdown-amount">{zeroPad(Math.floor(days / 30))}</span>
            <span className="countdown-period">Months</span>
          </span>}
          <span className="edgtf-countdown is-countdown">
            <span className="countdown-amount">{zeroPad(Math.floor(days % 30))}</span>
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


const Variation2 = ({ eventSiteSettings, labels, registerDateEnd, checkTickets, waitingList, moduleVariation }) => {

  const WrapperLayout = (props) => {

    if (props.moduleVariation.background_image !== '') {
      return (
        <div style={{ backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + props.moduleVariation.background_image}`, padding: "80px 0", backgroundPosition: "center", backgroundSize: 'cover' }} className="edgtf-parallax-section-holder ebs-bg-holder">
          {props.children}
        </div>
      );
    } else {
      return (
        <div style={{ padding: "80px 0", backgroundPosition: "center", backgroundSize: 'cover' }} className="edgtf-parallax-section-holder ebs-bg-holder">
          {props.children}
        </div>
      );
    }

  }

  return (
    <div className="module-section">
      <WrapperLayout
        moduleVariation={moduleVariation}>
        {(!registerDateEnd && (!checkTickets.ticketsSet || checkTickets.remainingTickets > 0)) && (
          <div className="container">
            <HeadingElement dark={true} label={labels.EVENTSITE_REGISTER_NOW} desc={labels.EVENTSITE_TICKETS_ARE_FLYING} align={moduleVariation.text_align} />
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
                    <a style={{ border: '2px solid #fff', color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>
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

        {(!registerDateEnd && (checkTickets.ticketsSet && checkTickets.remainingTickets <= 0) && !waitingList) && (
          <div className="container">
            <div className="alert alert-danger alert-dismissable">{labels.REGISTER_TICKET_END}</div>
          </div>
        )}

        {(!registerDateEnd && (checkTickets.ticketsSet && checkTickets.remainingTickets <= 0) && waitingList) && (
          <div className="container">
            <HeadingElement dark={true} label={labels.REGISTER_FOR_WAITING_LIST} desc={labels.NO_TICKETS_LEFT_REGISTER_WAITING_LIST} align={moduleVariation.text_align} />
            <div className="ebs-register-now-sec">
              <div className="row d-flex">
                <div className="col-md-10 offset-md-1">
                  <div className="ebs-caption-box">
                    <div className="ebs-description-area" style={{ color: '#fff' }} >{labels.WAITING_LIST_EVENTSITE_INTRODUCTION_PARA}</div>
                    <a style={{ border: '2px solid #fff', color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.REGISTER_FOR_WAITING_LIST_BUTTON}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </WrapperLayout>
    </div>
  );
};

export default Variation2;
