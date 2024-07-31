import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const Completionist = ({ event, completed }) => (
    <div className="col-12">
        <div className="text-center fs-4 text-danger pt-5">
            {completed && (
                <div dangerouslySetInnerHTML={{ __html: event.count_down_section.expiry_message }} />
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
    const expiryDate = event?.count_down_section?.expiry_date
        ? new Date(event.count_down_section.expiry_date.replace(' ', 'T'))
        : null;
    if (expiryDate && isNaN(expiryDate.getTime())) {
        console.error("Invalid date format provided for expiry_date:", event.count_down_section.expiry_date);
        return null;
    }
    return (
        <div style={bgStyle} className="edgtf-container ebs-default-padding">
            <div className="edgtf-container-inner container">
                <HeadingElement
                    dark={false}
                    label={event.count_down_section.title}
                    desc={event.count_down_section.description}
                    align={settings.text_align}
                />
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
    );
};

export default Variation1;
