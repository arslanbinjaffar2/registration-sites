import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import Countdown, { zeroPad } from "react-countdown";

const Completionist = ({ event, completed }) => (
    <div className="col-12">
        <p className="text-center fs-4 text-danger pt-5">
            {completed && event.count_down_section.expiry_message }
        </p>
    </div>
);
const Variation10 = ({ event, labels, settings }) => {
    // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
   
      return (
        <React.Fragment>
          <div className="ebs-countdown-wrapp d-flex w-100 countdown-wrapp ebs-counter-v10">
            {Math.floor(days / 30) > 0 && <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount"><div className="position-absolute top-50 start-50 translate-middle">{zeroPad(Math.floor(days / 30))}</div></span>
              <span className="countdown-period">Months</span>
            </span>}
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount"><div className="position-absolute top-50 start-50 translate-middle">{zeroPad(Math.floor(days % 30))}</div></span>
              <span className="countdown-period">Days</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount"><div className="position-absolute top-50 start-50 translate-middle">{zeroPad(hours)}</div></span>
              <span className="countdown-period">Hours</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount"><div className="position-absolute top-50 start-50 translate-middle">{zeroPad(minutes)}</div></span>
              <span className="countdown-period">Minutes</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount"><div className="position-absolute top-50 start-50 translate-middle">{zeroPad(seconds)}</div></span>
              <span className="countdown-period">Seconds</span>
            </span>
          </div>
            {<Completionist completed={completed} event={event} />}
        </React.Fragment>
      );
    
  };
  const bgStyle =
    settings && settings.background_color !== ""
      ? { backgroundColor: settings.background_color }
      : {};
    const expiryDate = new Date(event.count_down_section.expiry_date.replace(' ', 'T'));
  return (
    <div style={bgStyle} className="edgtf-container ebs-default-padding">
      <div className="position-relative" style={{zIndex: 5}}>
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={false}
          label={event.count_down_section.title}
          desc={event.count_down_section.description}
          align={"center"}
        />
      <div className="row py-5 d-flex align-items-center justify-content-center">
          <Countdown date={expiryDate.getTime() + 5000 } renderer={renderer} />
        
      </div>
      </div>

      </div>
    </div>
  );
};

export default Variation10;
