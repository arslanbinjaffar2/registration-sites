import React from "react";
import { Link } from "react-router-dom";
const Variation7 = ({ speakers, listing, searchBar, loadMore, event }) => {
  return (
    <div
      style={{
        padding: "50px 0",
      }}
      className="edgtf-parallax-section-holder"
    >
      <div className="container">
        <div className="row d-flex mb-5">
          <div className="col-12">
            <div className="edgtf-title-section-holder text-center">
              <h2
                className="edgtf-title-with-dots edgtf-appeared"
              >
                {event.labels.EVENTSITE_SPEAKERS}
              </h2>
              <span className="edge-title-separator edge-enable-separator"></span>
            </div>
          </div>
        </div>
        {listing && searchBar()}

        <div className="row d-flex edgtf-team-list-holder edgtf-team-info-below-image">
          {/* Grid */}
          {speakers &&
            speakers.map((speaker, i) => (
              <div
                key={i}
                className="col-12 col-sm-6 col-md-3 pl-0 pr-0 ebs-attendee-v1 ebs-attendee-v3"
              >
                <div className="edgtf-team-list-holder-inner info_box">
                  <div className="edgtf-team w-100 mb-3">
                    <div className="edgtf-team-inner">
                      <div className="edgtf-team-image">
                        <Link to={`/${event.url}/speakers/${speaker.id}`}>
                          <img
                            style={{ width: "100%" }}
                            src={
                              speaker.image && speaker.image !== ""
                                ? process.env.REACT_APP_EVENTCENTER_URL +
                                  "/assets/attendees/" +
                                  speaker.image
                                : require("img/square.jpg")
                            }
                            alt="g"
                          />
                        </Link>
                      </div>
                      {/* Description */}
                      <div className="edgtf-team-info">
                        <div className="edgtf-team-title-holder">
                          {(speaker.first_name || speaker.last_name) && (
                            <Link to={`/${event.url}/speakers/${speaker.id}`}>
                              <h3 className="edgtf-team-name">
                                {speaker.first_name && speaker.first_name}{" "}
                                {speaker.last_name && speaker.last_name}
                              </h3>
                            </Link>
                          )}
                          {speaker.info &&
                            (speaker.info.company_name ||
                              speaker.info.title) && (
                              <div style={{color: '#666666'}} className="ebs-attendee-designation">
                                {speaker.info.title && speaker.info.title}
                                {speaker.info.title &&
                                  speaker.info.company_name &&
                                  " "}
                                {speaker.info.company_name &&
                                  speaker.info.company_name}
                              </div>
                            )}
                          {listing && speaker.email && (
                            <div style={{color: '#666666'}} className="ebs-email-phone">
                              <a
                                href={`mailto:${speaker.email}`}
                                className="edgtf-team-position"
                                style={{color: '#666666'}}
                              >
                                {speaker.email}
                              </a>
                            </div>
                          )}

                          {listing && speaker.phone && (
                            <div style={{color: '#666666'}} className="ebs-email-phone">
                              <a
                                href={`tel: ${speaker.phone}`}
                                className="edgtf-team-position"
                                style={{color: '#666666'}}
                              >
                                {speaker.phone}
                              </a>
                            </div>
                          )}
                        </div>
                        {listing &&
                          speaker.info &&
                          (speaker.info.facebook ||
                            speaker.info.twitter ||
                            speaker.info.linkedin ||
                            speaker.info.website) && (
                            <div className="edgtf-team-social-holder-between">
                              <div className="edgtf-team-social">
                                <div className="edgtf-team-social-inner">
                                  <div className="edgtf-team-social-wrapp">
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                      {/* Description */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* Grid */}
        </div>
        {listing && speakers.length === 0 && <div>No Speakers Found...</div>}
        {listing && speakers.length > 0 && loadMore()}
      </div>
    </div>
  );
};

export default Variation7;
