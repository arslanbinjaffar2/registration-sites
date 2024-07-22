import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";
import Countdown, {zeroPad} from "react-countdown";


const Completionist = ({ labels }) => (
  <div className="col-12">
    <p className="text-center fs-4 text-danger pt-5">
      {labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        ? labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON
        : <div>Counter session ended. please <a className="text-danger fw-bold  text-decoration-underline" href='#!'>contact</a> eventsite managment</div>}
    </p>
  </div>
);
const Variation5 = ({ event, labels, settings }) => {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
   
      return (
        <React.Fragment>
          <div style={{background: '#F2F2F2'}} className="border rounded-3 ebs-counter-v5 mb-2 d-flex">
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
            <span className="edgtf-countdown is-countdown d-flex align-items-center justify-content-center">
              <span className="countdown-amount">
                {zeroPad(Math.floor(days % 30))}
              </span>
              <span className="countdown-amount">d</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown d-flex align-items-center justify-content-center">
              <span className="countdown-amount">{zeroPad(hours)}</span>
              <span className="countdown-amount">h</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown d-flex align-items-center justify-content-center">
              <span className="countdown-amount">{zeroPad(minutes)}</span>
              <span className="countdown-amount">m</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown d-flex align-items-center justify-content-center">
              <span className="countdown-amount">{zeroPad(seconds)}</span>
              <span className="countdown-amount">s</span>
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
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={false}
          label={labels.SECTION_SOCIAL_FRONT_TITLE}
          align={"center"}
        />
        <div className="row py-5 d-flex align-items-center justify-content-center">
          <div>
            <Countdown date={new Date().getTime() + 5000} renderer={renderer} />
          </div>
          <div className="text-center pt-5">
          <a style={{ border: '2px solid #fff', color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn bg-primary edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>

          </div>
        </div>
      </div>
      </div>

  );
};

export default Variation5;
