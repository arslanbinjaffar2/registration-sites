import React from "react";
import { Link } from "react-router-dom";
import HeadingElement from "@/ui-components/HeadingElement";
const Variation6 = ({ attendees, searchBar, loadMore, event, settings }) => {
  return (
    <div>
      <div style={{ padding: "80px 0" }} className="module-section">
        <div className="container">
          <HeadingElement dark={false} label={event.labels.EVENTSITE_ATTENDEES} desc={event.labels.EVENT_ATTENDEES_LOWER_HEAD} align={settings.text_align} />
        </div>
        { searchBar()}
        <div className="container">
          <div className="row d-flex algin-items-center">
            {attendees &&
              attendees.map((attendee, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div style={{animationDelay: 20*i+'ms'}} className="speakerv6-wrapper ebs-animation-layer">
                    <div className="speakerv6-image">
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
                      {/* <div className="caption">
                        <span className="plus"></span>
                      </div> */}
                    </div>
                    <div className="speakerv6-caption">
                      {(attendee.first_name || attendee.last_name) && (
                        <Link to={`/${event.url}/attendees/${attendee.id}`}>
                          <h3>
                            {attendee.first_name && attendee.first_name}{" "}
                            {attendee.last_name && attendee.last_name}
                          </h3>
                        </Link>
                      )}
                      <span
                        style={{ display: "inline-block" }}
                        className="edge-title-separator"
                      ></span>

                      {attendee.info &&
                        (attendee.info.company_name || attendee.info.title) && (
                          <div className="ebs-attendee-designation">
                            {attendee.info.title && attendee.info.title}
                            {attendee.info.company_name &&
                              attendee.info.title &&
                              " "}
                            {attendee.info.company_name &&
                              attendee.info.company_name}
                          </div>
                        )}

                      { attendee.email && (
                        <div className="ebs-email-phone">
                          <span data-icon="&#xe076;"></span>
                          <a
                            href={`mailto:${attendee.email}`}
                            className="edgtf-team-position"
                          >
                            {attendee.email}
                          </a>
                        </div>
                      )}
                      { attendee.phone && (
                        <div className="ebs-email-phone">
                          <span data-icon="&#xe090;"></span>
                          <a
                            href={`tel: ${attendee.phone}`}
                            className="edgtf-team-position"
                          >
                            {attendee.phone}
                          </a>
                        </div>
                      )}
                      {attendee.info &&
                        
                        (attendee.info.facebook ||
                          attendee.info.twitter ||
                          attendee.info.linkedin ||
                          attendee.info.website) && (
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
    </div>
  );
};

export default Variation6;
