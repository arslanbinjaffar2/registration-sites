import React from "react";
import Countdown, {zeroPad} from "react-countdown";


const Completionist = ({ event, completed }) => (
    <div className="col-12">
        <p className="text-center fs-4 text-danger pt-5">
            {completed && event.count_down_section.expiry_message }
        </p>
    </div>
);
const Variation9 = ({ event, labels, settings }) => {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
 
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
    <div style={bgStyle} className="edgtf-parallax-section-holder  ebs-bg-holder ebs-default-padding ebs-counter-holder">
      <div className="position-relative" style={{zIndex: 5}}>
      <div style={{maxWidth: 1900}} className="container-fluid px-5">
        <div className="row py-5 d-flex align-items-center text-center text-sm-center text-md-start justify-content-center">
          <div className="col-md-4">
            <div className="edgtf-title-section-holder">
              <h2 className="edgtf-title-with-dots edgtf-appeared text-white">{event.count_down_section.title}</h2>
              <span className="edge-title-separator edge-enable-separator"></span>
              <div className="edgtf-title-section-holder">
               <h6 className="edgtf-section-subtitle mb-4 mt-0 text-white">{event.count_down_section.description}</h6>
              </div>
            </div>
            {/*<a style={{ border: '2px solid #fff', color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn  edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>*/}
          </div>
          <div className="col-md-8">
            <div  className=" mb-2">
                <Countdown date={expiryDate.getTime() + 5000 } renderer={renderer} />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>

  );
};

export default Variation9;
