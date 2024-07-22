import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import Countdown, { zeroPad } from "react-countdown";

const Completionist = ({ labels }) => (
  <div className="col-12">
    <p className="text-center fs-4 text-danger pt-2">
      {labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        ? labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        : <div>Counter session ended. please <a className="text-danger fw-bold  text-decoration-underline" href='#!'>contact</a> eventsite managment</div>}
    </p>
  </div>
);
const Variation13 = ({ event, labels, settings }) => {
    // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {

      return (
        <React.Fragment>
          <div className="ebs-countdown-wrapp d-flex w-100 countdown-wrapp ebs-counter-v10">
            {Math.floor(days / 30) > 0 && <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(Math.floor(days / 30))}<span className="countdown-period m-0 text-white">Months</span></div></span>
            </span>}
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(Math.floor(days % 30))} <span className="countdown-period m-0 text-white">Days</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(hours)}<span className="countdown-period m-0 text-white">Hours</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(minutes)}<span className="countdown-period m-0 text-white">Minutes</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(seconds)}<span className="countdown-period m-0 text-white">Seconds</span></div></span>
              
            </span>
          </div>

          {completed && <Completionist labels={labels}/>}
    
        </React.Fragment>
      );
    
  };
  const bgStyle =
    settings && settings.background_color !== ""
      ? { backgroundColor: settings.background_color }
      : {};

  return (
    <div style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding ebs-counter-holder">
      <div className="position-relative" style={{zIndex: 5}}>
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={true}
          label={labels.SECTION_SOCIAL_FRONT_TITLE}
          align={"center"}
        />
      <div className="row py-5 d-flex align-items-center justify-content-center">
       <Countdown date={new Date().getTime() + 5000} renderer={renderer} />
        
      </div>
      </div>

      </div>
    </div>
  );
};

export default Variation13;
