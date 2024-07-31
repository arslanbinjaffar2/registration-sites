import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import Countdown, { zeroPad } from "react-countdown";

const Completionist = ({ event, completed }) => (
    <div className="col-12">
        <div className="text-center fs-4 text-danger pt-5">
            {completed && (
                <div dangerouslySetInnerHTML={{ __html: event.count_down_section.expiry_message }} />
            )}
        </div>
    </div>
);
const Variation12 = ({ event, labels, settings }) => {
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

            {<Completionist completed={completed} event={event} />}
    
        </React.Fragment>
      );
    
  };
 const bgStyle ={backgroundImage:settings.background_image? `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + settings.background_image}`:"", backgroundPosition: "center top", backgroundSize: 'cover', }
    const expiryDate = new Date(event.count_down_section.expiry_date.replace(' ', 'T'));
  return (
    <div style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding ebs-counter-holder">
      <div className="position-relative" style={{zIndex: 5}}>
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={true}
          label={event.count_down_section.title}
          desc={event.count_down_section.description}
          align={settings.text_align}
        />
      <div className="row py-5 d-flex align-items-center justify-content-center">
          <Countdown date={expiryDate.getTime() + 5000 } renderer={renderer} />
        
      </div>
      </div>

      </div>
    </div>
  );
};

export default Variation12;
