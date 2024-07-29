import React from "react";
import Countdown, {zeroPad} from "react-countdown";


const Completionist = ({ event, completed }) => (
    <div className="col-12">
        <div className="text-center fs-4 text-danger pt-5">
            {completed && (
                <div dangerouslySetInnerHTML={{ __html: event.count_down_section.expiry_message }} />
            )}
        </div>
    </div>
);
const Variation8 = ({ event, labels, settings }) => {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {

      return (
        <React.Fragment>
          <div className="ebs-counter-v7 ebs-countdown-wrapp countdown-wrapp d-flex align-items-center text-center w-100">
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
              <span className="countdown-period">DAYS</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(hours)}</span>
              <span className="countdown-period">HOURS</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(minutes)}</span>
              <span className="countdown-period">MUNUTES</span>
            </span>
            <div className="vr"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount">{zeroPad(seconds)}</span>
              <span className="countdown-period">SECONDS</span>
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
    <div style={bgStyle} className="edgtf-container ebs-default-padding ebs-gray-color">
      <div style={{maxWidth: 1900}} className="container-fluid px-5">
        <div className="row py-5 d-flex align-items-center text-center text-sm-center text-md-start justify-content-center">
          <div className="col-sm-4">
            <div className="edgtf-title-section-holder" >
              <div align={settings.text_align}>
              <h2 className="edgtf-title-with-dots edgtf-appeared">{event.count_down_section.title}</h2>
              </div>
              <span className="edge-title-separator edge-enable-separator"></span>
               <div className="edgtf-title-section-holder">
                 <div  dangerouslySetInnerHTML={{__html: event.count_down_section.description}} />
              </div>
            </div>
            {/*<a style={{  color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn bg-primary edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>*/}
          </div>
          <div className="col-sm-8">
            <div  className=" mb-2">
                <Countdown date={expiryDate.getTime() + 5000 } renderer={renderer} />
            </div>
          </div>
        </div>
      </div>
      </div>

  );
};

export default Variation8;
