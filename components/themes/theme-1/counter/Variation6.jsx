import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";
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
const Variation6 = ({ event, labels, settings }) => {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
   
      return (
        <React.Fragment>
          <div className="border rounded-3 ebs-counter-v5 ebs-counter-dark mb-2 d-flex">
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
            {<Completionist completed={completed} event={event} />}
        </React.Fragment>
      );
  };
  const bgStyle ={backgroundImage:settings.background_image? `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + settings.background_image}`:"", backgroundPosition: "center top", backgroundSize: 'cover', }

    const expiryDate = new Date(event.count_down_section.expiry_date.replace(' ', 'T'));
    return (
        <div style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding ebs-counter-holder">
            <div className="position-relative" style={{ zIndex: 5 }}>
                <div className="edgtf-container-inner pt-4 container">
                    <HeadingElement
                        dark={true}
                        label={event.count_down_section.title}
                        desc={event.count_down_section.description}
                        align={settings.text_align}
                    />
                    <div className="row py-5 d-flex align-items-center justify-content-center">
                        <div className="">
                            <Countdown date={expiryDate.getTime() + 5000 } renderer={renderer} />
                        </div>
                        {/*<div className="text-center pt-5">*/}
                        {/*    <a style={{ border: '2px solid #fff', color: '#fff' }} href="#!" rel="noopener" className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{labels.EVENTSITE_REGISTER_NOW2}</a>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Variation6;
