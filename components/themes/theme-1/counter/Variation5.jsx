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
const Variation3 = ({ event, labels, settings }) => {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist labels={labels} />;
    } else {
      return (
        <React.Fragment>
          <div className="d-flex">
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
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={false}
          label={labels.SECTION_SOCIAL_FRONT_TITLE}
          align={"center"}
        />
        <div className="row py-5 d-flex align-items-center justify-content-center">
          <div style={{background: '#F2F2F2'}} className="border rounded-3 ebs-counter-v5 mb-2">
            <Countdown date={new Date().getTime() + 240 * 3600 * 1000 + 50000} renderer={renderer} />
          </div>
          <div className="text-center pt-5">
          <a style={{ border: '2px solid #fff', color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn bg-primary edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>

          </div>
        </div>
      </div>
      </div>

  );
};

export default Variation3;
