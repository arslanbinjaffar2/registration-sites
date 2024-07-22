import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import Countdown, { zeroPad } from "react-countdown";

const Completionist = ({ labels }) => (
  <div className="col-12">
    <h2>
      {labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        ? labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        : "This event is going on."}
    </h2>
  </div>
);
const Variation12 = ({ event, labels, settings }) => {
    // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist labels={labels}/>;
    } else {
      return (
        <React.Fragment>
          <div className="ebs-countdown-wrapp d-flex w-100 countdown-wrapp ebs-counter-v10">
            {Math.floor(days / 30) > 0 && <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(Math.floor(days / 30))}<span className="countdown-period m-0 text-white">Months</span></div></span>
            </span>}
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(Math.floor(days % 30))} <span className="countdown-period m-0 text-white">Days</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(hours)}<span className="countdown-period m-0 text-white">Hours</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(minutes)}<span className="countdown-period m-0 text-white">Minutes</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(seconds)}<span className="countdown-period m-0 text-white">Seconds</span></div></span>
              
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
    <div style={bgStyle} className="edgtf-container ebs-default-padding">
      <div className="position-relative" style={{zIndex: 5}}>
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={false}
          label={labels.SECTION_SOCIAL_FRONT_TITLE}
          align={"center"}
        />
      <div className="row py-5 d-flex align-items-center justify-content-center">
       <Countdown date={new Date().getTime() + 240 * 3600 * 1000 + 50000} renderer={renderer} />
        
      </div>
      </div>

      </div>
    </div>
  );
};

export default Variation12;
