import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";
import Countdown, {zeroPad} from "react-countdown";


const Completionist = ({ labels }) => (
  <div className="col-12">
    <p className="text-center fs-4 text-danger pt-2">
      {labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        ? labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        : <div>Counter session ended. please <a className="text-danger fw-bold  text-decoration-underline" href='#!'>contact</a> eventsite managment</div>}
    </p>
  </div>
);
const Variation7 = ({ event, labels, settings }) => {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
   
      return (
        <React.Fragment>
          <div className="ebs-counter-v7 ebs-countdown-wrapp countdown-wrapp d-flex align-items-center text-center w-100">
            {Math.floor(days / 30) > 0 && (
              <>
                <span className="edgtf-countdown is-countdown d-flex align-items-center justify-content-center">
                  <span className="countdown-amount">
                    {zeroPad(Math.floor(days / 30))}
                  </span>
                  <span className="countdown-amount">m</span>
                </span>
                <div className="vr"></div>
              </>
            )}
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">
                {zeroPad(Math.floor(days % 30))}
              </span>
              <span className="countdown-period">Days</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(hours)}</span>
              <span className="countdown-period">Hours</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(minutes)}</span>
              <span className="countdown-period">Minutes</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(seconds)}</span>
              <span className="countdown-period">Seconds</span>
            </span>
          </div>
          {completed && <Completionist labels={labels} />}
        </React.Fragment>
      );
  };
  const bgStyle =
    settings && settings.background_color !== ""
      ? { backgroundColor: settings.background_color }
      : {};

  return (
    <div style={bgStyle} className="edgtf-container ebs-default-padding">
      <div style={{maxWidth: 1900}} className="container-fluid px-5">
        <div className="row py-5 d-flex align-items-center justify-content-center">
           <div className="col-sm-4">
            <div className="edgtf-title-section-holder">
              <h2 className="edgtf-title-with-dots edgtf-appeared">{labels.SECTION_SOCIAL_FRONT_TITLE}</h2>
              <span className="edge-title-separator edge-enable-separator"></span>
               <div className="edgtf-title-section-holder">
               <h6 className="edgtf-section-subtitle mb-4 mt-0 ">Join thousands experiencing expo 2024 right now!</h6>
              </div>
            </div>
            <a style={{  color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn bg-primary edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>
          </div>
          <div className="col-sm-8">
            <div  className=" mb-2">
              <Countdown date={new Date().getTime() + 5000} renderer={renderer} />
            </div>
          </div>
        </div>
      </div>
      </div>

  );
};

export default Variation7;
