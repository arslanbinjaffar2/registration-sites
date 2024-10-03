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
const Variation3 = ({ event, labels, settings }) => {
  const [completed, setCompleted] = React.useState(false);
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
      <div className="edgtf-container-inner pt-4 container">
        <HeadingElement
          dark={false}
          page_header={true}
          label={event.count_down_section && event.count_down_section.title}
          align={settings.text_align}
        />
           {event.count_down_section && <div className="edgtf-title-section-holder">
            <div className="ebs-no-margin-wrapp ebs-all-tags-white" style={{textAlign: settings.text_align ? settings.text_align : 'left'}} dangerouslySetInnerHTML={{__html: event.count_down_section.description}} />
        </div> }
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
    )}
    </div>
  );
};

export default Variation3;
