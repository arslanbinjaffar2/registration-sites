import React from "react";
import { Link } from "react-router-dom";
import HeadingElement from "@/ui-components/HeadingElement";
const Variation6 = ({ speakers, listing, searchBar, loadMore, event, settings }) => {
  return (
    <div>
      <div style={{ padding: "80px 0" }} className="module-section">
        <div className="container">
          <HeadingElement dark={false} label={event.labels.EVENTSITE_SPEAKERS} desc={event.labels.EVENT_SPEAKERS_LOWER_HEAD} align={settings.text_align} />
        </div>
        {listing && searchBar()}
        <div className="container">
          <div className="row d-flex algin-items-center">
            {speakers &&
              speakers.map((speaker, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="speakerv6-wrapper">
                    <div className="speakerv6-image">
                      <Link to={`/${event.url}/speakers/${speaker.id}`}>
                        <img
                          style={{ width: "100%" }}
                          src={
                            speaker.image && speaker.image !== ""
                              ? process.env.REACT_APP_EVENTCENTER_URL +
                              "/assets/attendees/" +
                              speaker.image
                              : require("img/user-placeholder.jpg")
                          }
                          alt="g"
                        />
                      </Link>
                      {/* <div className="caption">
                        <span className="plus"></span>
                      </div> */}
                    </div>
                    <div className="speakerv6-caption">
                      {(speaker.first_name || speaker.last_name) && (
                        <Link to={`/${event.url}/speakers/${speaker.id}`}>
                          <h3>
                            {speaker.first_name && speaker.first_name}{" "}
                            {speaker.last_name && speaker.last_name}
                          </h3>
                        </Link>
                      )}
                      <span
                        style={{ display: "inline-block" }}
                        className="edge-title-separator"
                      ></span>

                      {speaker.info &&
                        (speaker.info.company_name || speaker.info.title) && (
                          <div className="ebs-attendee-designation">
                            {speaker.info.title && speaker.info.title}
                            {speaker.info.company_name &&
                              speaker.info.title &&
                              " "}
                            {speaker.info.company_name &&
                              speaker.info.company_name}
                          </div>
                        )}

                      {listing && speaker.email && (
                        <div className="ebs-email-phone">
                          <span data-icon="&#xe076;"></span>
                          <a
                            href={`mailto:${speaker.email}`}
                            className="edgtf-team-position"
                          >
                            {speaker.email}
                          </a>
                        </div>
                      )}
                      {listing && speaker.phone && (
                        <div className="ebs-email-phone">
                          <span data-icon="&#xe090;"></span>
                          <a
                            href={`tel: ${speaker.phone}`}
                            className="edgtf-team-position"
                          >
                            {speaker.phone}
                          </a>
                        </div>
                      )}
                      {speaker.info &&
                        listing &&
                        (speaker.info.facebook ||
                          speaker.info.twitter ||
                          speaker.info.linkedin ||
                          speaker.info.website) && (
                          <div className="social-icons">
                            {speaker.info.facebook && (
                              <a
                                target="_blank"
                                href={`${speaker.info.facebook_protocol}${speaker.info.facebook}`}
                              >
                                <span data-icon="&#xe0aa;"></span>
                              </a>
                            )}
                            {speaker.info.twitter && (
                              <a
                                target="_blank"
                                href={`${speaker.info.twitter_protocol}${speaker.info.twitter}`}
                              >
                                <span data-icon="&#xe0ab;"></span>
                              </a>
                            )}
                            {speaker.info.linkedin && (
                              <a
                                target="_blank"
                                href={`${speaker.info.linkedin_protocol}${speaker.info.linkedin}`}
                              >
                                <span data-icon="&#xe0b1;"></span>
                              </a>
                            )}
                            {speaker.info.website && (
                              <a
                                target="_blank"
                                href={`${speaker.info.website_protocol}${speaker.info.website}`}
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
          {listing && speakers.length === 0 && <div>No Speakers Found...</div>}
          {listing && speakers.length > 0 && loadMore()}
        </div>
      </div>
    </div>
  );
};

export default Variation6;
