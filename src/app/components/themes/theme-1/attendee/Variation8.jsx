import React from "react";
import { Link } from "react-router-dom";
import HeadingElement from "@/ui-components/HeadingElement";
const Variation8 = ({ attendees, searchBar, loadMore, event, settings }) => {
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container">
      <HeadingElement dark={false} label={event.labels.EVENTSITE_ATTENDEES} desc={event.labels.EVENT_ATTENDEES_LOWER_HEAD} align={settings.text_align} />
      </div>
      { searchBar()}
      <div className="container">
        <div className="row d-flex algin-items-center">
          {attendees &&
            attendees.map((attendee, i) => (
              <div
                key={i}
                style={{ marginBottom: "30px" }}
                className="col-md-4 col-sm-6"
              >
                <div style={{ height: "100%", marginBottom: 0, animationDelay: 20*i+'ms' }}
                  className="speakerv7-wrapper ebs-animation-layer">
                  <div className="speakerv7-image">
                    <span>
                      <Link to={`/${event.url}/attendees/${attendee.id}`}>
                        <span className="gallery-img-wrapper-square">
                            <img
                              onLoad={(e) => e.target.style.opacity = 1} 
                              src={
                                attendee.image && attendee.image !== ""
                                  ? process.env.REACT_APP_EVENTCENTER_URL +
                                    "/assets/attendees/" +
                                    attendee.image
                                  : require("img/user-placeholder.jpg")
                              }
                              alt="g"
                            />
                        </span>
                      </Link>
                    </span>
                  </div>
                  <div className="attendeev7-caption">
                    {(attendee.first_name || attendee.last_name) && (
                      <Link to={`/${event.url}/attendees/${attendee.id}`}>
                        <h3>
                          {attendee.first_name && attendee.first_name}{" "}
                          {attendee.last_name && attendee.last_name}
                        </h3>
                      </Link>
                    )}

                    {attendee.info &&
                      (attendee.info.company_name || attendee.info.title) && (
                        <p>
                          {attendee.info.title && attendee.info.title}
                          {attendee.info.company_name &&
                            attendee.info.company_name && <br />}
                          {attendee.info.company_name &&
                            attendee.info.company_name}
                        </p>
                      )}
                    { attendee.email && (
                      <div className="email">
                        <a href={`mailto:${attendee.email}`}>{attendee.email}</a>
                      </div>
                    )}

                    { attendee.phone && (
                      <div className="speakerv7-phone">
                        <a href={`tel:${attendee.phone}`}>{attendee.phone}</a>
                      </div>
                    )}
                    {
                      attendee.info &&
                      (attendee.info.facebook ||
                        attendee.info.twitter ||
                        attendee.info.linkedin ||
                        attendee.info.website) && (
                        <div className="d-flex">
                          <div className="social-icons">
                            {attendee.info.facebook && (
                              <a
                                target="_blank"
                                href={`${attendee.info.facebook_protocol}${attendee.info.facebook}`}
                              >
                                <span data-icon="&#xe0aa;"></span>
                              </a>
                            )}
                            {attendee.info.twitter && (
                              <a
                                target="_blank"
                                href={`${attendee.info.twitter_protocol}${attendee.info.twitter}`}
                              >
                                <span data-icon="&#xe0ab;"></span>
                              </a>
                            )}
                            {attendee.info.linkedin && (
                              <a
                                target="_blank"
                                href={`${attendee.info.linkedin_protocol}${attendee.info.linkedin}`}
                              >
                                <span data-icon="&#xe0b1;"></span>
                              </a>
                            )}
                            {attendee.info.website && (
                              <a
                                target="_blank"
                                href={`${attendee.info.website_protocol}${attendee.info.website}`}
                              >
                                <span data-icon="&#xe0b7;"></span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        { attendees.length === 0 && <div>No Speakers Found...</div>}
        { attendees.length > 0 && loadMore()}
      </div>
    </div>
  );
};

export default Variation8;
