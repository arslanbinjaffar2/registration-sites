import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";
import Countdown, {zeroPad} from "react-countdown";


const Completionist = ({ labels }) => (
  <div className="col-12">
    <h2>
      {labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        ? labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        : "This event is going on."}
    </h2>
  </div>
);
const Variation9 = ({ event, labels, settings }) => {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist labels={labels}/>;
    } else {
      return (
        <React.Fragment>
          <div className="ebs-counter-v7 ebs-counter-dark ebs-countdown-wrapp countdown-wrapp d-flex align-items-center text-center w-100">
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
              <span className="countdown-period text-white">Days</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(hours)}</span>
              <span className="countdown-period text-white">Hours</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(minutes)}</span>
              <span className="countdown-period text-white">Minutes</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(seconds)}</span>
              <span className="countdown-period text-white">Seconds</span>
            </span>
          </div>
        </React.Fragment>
      );
    }
  };
  const bgStyle =
    settings && settings.background_color !== ""
      ? { backgroundColor: settings.background_color }
      : {};

  return (
    <div style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding ebs-counter-holder">
      <div className="position-relative" style={{zIndex: 5}}>
      <div style={{maxWidth: 1900,padding: '200px 0'}} className="container-fluid px-5">
        <div className="row py-5 d-flex align-items-center justify-content-center">
          <div className="col-sm-4">
            <h2 className="text-white">{labels.SECTION_SOCIAL_FRONT_TITLE}</h2>
            <p className="fs-4 mb-4 text-white">Join thousands experiencing expo 2024 right now!</p>
            <a style={{ border: '2px solid #fff', color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn  edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>
          </div>
          <div className="col-sm-8">
            <div  className=" mb-2 d-flex align-items-center justify-content-end">
              <Countdown date={new Date().getTime() + 240 * 3600 * 1000 + 50000} renderer={renderer} />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>

  );
};

export default Variation9;
