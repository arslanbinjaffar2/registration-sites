import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import Countdown, { zeroPad } from "react-countdown";


const Completionist = ({ event, completed }) => (
  <div className="col-12">
  <div className="container">
     {(event.eventsiteSettings.show_count_down_text == 0 || (completed && event.count_down_section && event.count_down_section.expiry_message)) && (
      <div className="text-center fs-4 pt-5">
          <div dangerouslySetInnerHTML={{ __html: event.count_down_section.expiry_message }} />
      </div>
      )}
  </div>
  </div>
);
const Variation11 = ({ event, labels, settings }) => {
    // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
      return (
        <React.Fragment>
          <div className="ebs-countdown-wrapp d-flex w-100 countdown-wrapp ebs-counter-v10">
            {Math.floor(days / 30) > 0 && <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(Math.floor(days / 30))}<span className="countdown-period m-0 text-white">{event?.labels?.COUNTDOWN_LABEL_MONTHS}</span></div></span>
            </span>}
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(Math.floor(days % 30))} <span className="countdown-period m-0 text-white">{event?.labels?.COUNTDOWN_LABEL_DAYS}</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(hours)}<span className="countdown-period m-0 text-white">{event?.labels?.COUNTDOWN_LABEL_HOURS}</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(minutes)}<span className="countdown-period m-0 text-white">{event?.labels?.COUNTDOWN_LABEL_MINUTES}</span></div></span>
              
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount rounded-circle bg-primary"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(seconds)}<span className="countdown-period m-0 text-white">{event?.labels?.COUNTDOWN_LABEL_SECONDS}</span></div></span>
              
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
 const expiryDate = event.count_down_section && event.count_down_section.expiry_date
    ? new Date(event.count_down_section.expiry_date.replace(' ', 'T'))
    : null;
  const isValidDate = expiryDate && !isNaN(expiryDate.getTime());
    return (
        <div>
      {isValidDate && (
    <div style={bgStyle} className="edgtf-container ebs-default-padding">
      <div className="position-relative pt-4" style={{zIndex: 5}}>
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={false}
          page_header={true}
      label={event.count_down_section && event.count_down_section.title}
          align={settings.text_align}
        />
        {event.count_down_section && <div className="edgtf-title-section-holder">
            <div className="ebs-no-margin-wrapp ebs-all-tags-white" style={{textAlign: settings.text_align ? settings.text_align : 'left'}} dangerouslySetInnerHTML={{__html: event.count_down_section.description}} />
        </div> }
      <div className="row py-5 d-flex align-items-center justify-content-center">
          <Countdown date={expiryDate.getTime() + 5000 } renderer={renderer} />
        
      </div>
      </div>

      </div>
    </div>
      )}
    </div>
  );
};

export default Variation11;
