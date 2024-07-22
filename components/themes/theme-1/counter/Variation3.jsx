import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const Completionist = ({ labels }) => (
  <div className="col-12">
    <h2>
      {labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        ? labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        : "This event is going on."}
    </h2>
  </div>
);
const Variation3 = ({ event, labels, settings }) => {
  const bgStyle =
    settings && settings.background_color !== ""
      ? { backgroundColor: settings.background_color }
      : {};

  return (
    <div style={bgStyle} className="edgtf-container ebs-default-padding">
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={false}
          label={labels.SECTION_SOCIAL_FRONT_TITLE}
          align={"center"}
        />
      </div>

      <div className="row py-5 d-flex align-items-center justify-content-center ebs-digital-clock">
        <FlipClockCountdown  className='flip-clock-2' to={new Date().getTime() + 240 * 3600 * 1000 + 50000}>
          <p>Completed</p>
        </FlipClockCountdown>
        
      </div>
    </div>
  );
};

export default Variation3;
