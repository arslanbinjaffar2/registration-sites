import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

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

const Variation2 = ({ event, labels, settings }) => {
    const [completed, setCompleted] = React.useState(false);
  const bgStyle ={backgroundImage:settings.background_image? `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + settings.background_image}`:"", backgroundPosition: "center top", backgroundSize: 'cover', }
 const expiryDate = event.count_down_section && event.count_down_section.expiry_date
    ? new Date(event.count_down_section.expiry_date.replace(' ', 'T'))
    : null;
  const isValidDate = expiryDate && !isNaN(expiryDate.getTime());
    return (
        <div>
      {isValidDate && (
        <div style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding ebs-counter-holder">
            <div className="position-relative pt-4" style={{ zIndex: 5 }}>
                <div className="edgtf-container-inner container">
                    <HeadingElement
                        dark={true}
                        page_header={true}
                        label={event.count_down_section && event.count_down_section.title}
                        align={settings.text_align}
                    />
                     {event.count_down_section && <div className="edgtf-title-section-holder text-white">
                    <div className="ebs-no-margin-wrapp ebs-all-tags-white" style={{textAlign: settings.text_align ? settings.text_align : 'left'}} dangerouslySetInnerHTML={{__html: event.count_down_section.description}} />
                </div> }
                </div>

                <div className="row py-5 d-flex align-items-center justify-content-center">
                    <>
                    <FlipClockCountdown
                        onComplete={() => setCompleted(true)}
                        hideOnComplete={false}
                        className='flip-clock'
                        labels={[event?.labels?.COUNTDOWN_LABEL_DAYS, event?.labels?.COUNTDOWN_LABEL_HOURS, event?.labels?.COUNTDOWN_LABEL_MINUTES, event?.labels?.COUNTDOWN_LABEL_SECONDS]}
                        to={expiryDate.getTime()}
                    />
                    <Completionist completed={completed} event={event} />
                    </>
                </div>
            </div>
            </div>
          )}
          </div>
    );
  
};

export default Variation2;
