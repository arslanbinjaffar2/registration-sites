import React from "react";
import Countdown, {zeroPad} from "react-countdown";



const Completionist = ({ event, completed }) => (
  <div className="col-12">
  <div className="container">
   {(event.eventsiteSettings.show_count_down_text == 0 || (completed && event.count_down_section && event.count_down_section.expiry_message)) && (
      <div className="text-center fs-4 pt-2">
          <div dangerouslySetInnerHTML={{ __html: event.count_down_section.expiry_message }} />
      </div>
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
                  <span className="countdown-amount text-white">
                    {zeroPad(Math.floor(days / 30))}
                  </span>
                  <span className="countdown-amount text-white">m</span>
                </span>
                <div className="vr bg-white"></div>
              </>
            )}
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount text-white">
                {zeroPad(Math.floor(days % 30))}
              </span>
              <span className="countdown-period text-white">DAYS</span>
            </span>
            <div className="vr bg-white"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount text-white">{zeroPad(hours)}</span>
              <span className="countdown-period text-white">HOURS</span>
            </span>
            <div className="vr bg-white"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount text-white">{zeroPad(minutes)}</span>
              <span className="countdown-period text-white">MUNUTES</span>
            </span>
            <div className="vr bg-white"></div>
            <span className="edgtf-countdown is-countdown">
              <span className="countdown-amount text-white">{zeroPad(seconds)}</span>
              <span className="countdown-period text-white">SECONDS</span>
            </span>
          </div>
            {<Completionist completed={completed} event={event} />}
        </React.Fragment>
      );

  };
  const bgStyle ={backgroundImage:settings.background_image? `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + settings.background_image}`:"", backgroundPosition: "center top", backgroundSize: 'cover', }
 const expiryDate = event.count_down_section && event.count_down_section.expiry_date
    ? new Date(event.count_down_section.expiry_date.replace(' ', 'T'))
    : null;
  const isValidDate = expiryDate && !isNaN(expiryDate.getTime());
    return (
        <div>
      {isValidDate && (
    <div style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding ebs-counter-holder" >
      <div className="position-relative" style={{zIndex: 5}}>
      <div style={{maxWidth: 1900}} className="container-fluid px-5">
        <div className="row py-5 d-flex align-items-center text-center text-sm-center text-md-start justify-content-center">
          {(event.count_down_section.title || event.count_down_section.description) && <div className="col-sm-4">
            <div style={{textAlign: settings.text_align ? settings.text_align : 'left'}} className="edgtf-title-section-holder" >
              <div>
              <h2 className="edgtf-title-with-dots edgtf-appeared text-white mt-2">{event.count_down_section.title}</h2>
              </div>
              {event.count_down_section.title && <span className="edge-title-separator edge-enable-separator"></span>}
                 {event.count_down_section && <div className="edgtf-title-section-holder text-white">
                  <div className="ebs-no-margin-wrapp ebs-all-tags-white" style={{textAlign: settings.text_align ? settings.text_align : 'left'}} dangerouslySetInnerHTML={{__html: event.count_down_section.description}} />
              </div> }
            </div>
          </div>}
          <div className="col">
            <div  className=" mb-0">
                <Countdown date={expiryDate.getTime() + 5000 } renderer={renderer} />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      )}
      </div>
  );
};

export default Variation8;
