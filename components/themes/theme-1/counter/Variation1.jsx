import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const Completionist = ({ event, completed }) => (
  <div className="col-12">
  <div className="container">
   {(event.count_down_section.show_count_down_text == 0 || (completed && event.count_down_section && event.count_down_section.expiry_message)) && (
      <div className="text-center fs-4 text-danger pt-5">
          <div className="ebs-text-danger" dangerouslySetInnerHTML={{ __html: event.count_down_section.expiry_message }} />
      </div>
      )}
  </div>
  </div>
);
const Variation1 = ({ event, labels, settings }) => {
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
            <div  className="edgtf-container-inner pt-4 container">
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
                {expiryDate != '0000-00-00 00:00:00' ? (
                    <FlipClockCountdown
                        onComplete={() => setCompleted(true)}
                        hideOnComplete={false}
                        className="flip-clock"
                        to={expiryDate.getTime()}
                    />

                ) : (
                    <FlipClockCountdown className="flip-clock" to={new Date().getTime() + 240 * 3600 * 1000 + 50000}>
                        <p>Completed</p>
                    </FlipClockCountdown>
                )}
                {expiryDate && <Completionist completed={completed} event={event} />}
            </div>
        </div>
        )}
          </div>
    );
};

export default Variation1;
