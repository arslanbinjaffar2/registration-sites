import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const Completionist = ({ event, completed }) => (
    <div className="col-12">
        <div className="text-center fs-4 text-danger pt-5">
            {completed && (
                <div dangerouslySetInnerHTML={{ __html: event.count_down_section.expiry_message }} />
            )}
        </div>
    </div>
);
const Variation4 = ({ event, labels, settings }) => {
  const [completed, setCompleted] = React.useState(false)
  const bgStyle =
    settings && settings.background_color !== ""
      ? { backgroundColor: settings.background_color }
      : {};
    const expiryDate = new Date(event.count_down_section.expiry_date.replace(' ', 'T'));
  return (
    <div style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding ebs-counter-holder">
      <div className="position-relative" style={{zIndex: 5}}>
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={true}
          label={event.count_down_section.title}
          align={settings.text_align}
        />
          <div align={"center"} dangerouslySetInnerHTML={{__html: event.count_down_section.description}} />
      </div>

          <div className="row py-5 d-flex align-items-center justify-content-center">
              <FlipClockCountdown
                  onComplete={() => setCompleted(true)}
                  hideOnComplete={false}
                  className='flip-clock-2'
                  to={expiryDate.getTime()}
              />
              {<Completionist completed={completed} event={event} />}
          </div>
      </div>
    </div>
  );
};

export default Variation4;
