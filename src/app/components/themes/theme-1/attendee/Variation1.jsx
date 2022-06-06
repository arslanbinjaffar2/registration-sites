import React from "react";
import { Link } from "react-router-dom";

const Variation1 = ({ attendees, searchBar, loadMore, event }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
        padding: "50px 0",
      }}
      className="edgtf-parallax-section-holder"
    >
      <div className="container-fluid">
        <div className="row d-flex mb-5">
          <div className="col-12">
            <div className="edgtf-title-section-holder text-center">
              <h2
                style={{ color: "#ffffff" }}
                className="edgtf-title-with-dots edgtf-appeared"
              >
                {event.labels.EVENTSITE_SPEAKERS}
              </h2>
              <span className="edge-title-separator edge-enable-separator"></span>
            </div>
          </div>
        </div>
        {searchBar()}
        <div className="container">
          <div className="row d-flex edgtf-team-list-holder edgtf-team-info-on-hover ebs-team-vairation-9">
            {/* Grid */}
            {attendees &&
              attendees.map((attendee, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 pb-4">
                  <div className="edgtf-team-list-holder-inner info_box">
                    <div
                      style={{ width: "100%" }}
                      className="edgtf-team edgtf-team-light"
                    >
                      <div className="edgtf-team-inner">
                        <div className="edgtf-team-image">
                          <Link to={`/${event.url}/attendees/${attendee.id}`}>
                            <img
                              style={{ width: "100%" }}
                              src={
                                attendee.image && attendee.image !== ""
                                  ? process.env.REACT_APP_EVENTCENTER_URL +
                                    "/assets/attendees/" +
                                    attendee.image
                                  : require("img/user-placeholder.jpg")
                              }
                              alt="g"
                            />
                          </Link>
                        </div>
                        {/* Description */}
                        <div className="edgtf-team-info">
                          <div className="edgtf-team-title-holder">
                            {(attendee.first_name || attendee.last_name) && (
                              <Link to={`/${event.url}/speakers/${attendee.id}`}>
                                <h3 style={{lineHeight: 1}} className="edgtf-team-name">
                                  {attendee.first_name && attendee.first_name}{" "}
                                  {attendee.last_name && attendee.last_name}
                                </h3>
                              </Link>
                            )}
                            {attendee.info &&
                              (attendee.info.company_name ||
                                attendee.info.title) && (
                                <div style={{paddingBottom: 4}} className="ebs-attendee-designation">
                                  <span className="edgtf-team-position">
                                    {attendee.info.title && attendee.info.title}
                                    {attendee.info.company_name &&
                                      attendee.info.title &&
                                      " "}
                                    {attendee.info.company_name &&
                                      attendee.info.company_name}
                                  </span>
                                </div>
                              )}
                            <div className="d-flex ebs-box-bottom">
                              <div className="col-6">
                                  {attendee.email && (
                                  <div className="ebs-email-phone">
                                    <a
                                      href={`mailto:${attendee.email}`}
                                      className="edgtf-team-position"
                                    >
                                      {attendee.email}
                                    </a>
                                  </div>
                                )}
                                {attendee.phone && (
                                  <div className="ebs-email-phone">
                                    <a
                                      href={`tel: ${attendee.phone}`}
                                      className="edgtf-team-position"
                                    >
                                      {attendee.phone}
                                    </a>
                                  </div>
                                )}
                              </div>
                              <div className="col-6">
                                {
                                attendee.info &&
                                (attendee.info.facebook ||
                                  attendee.info.twitter ||
                                  attendee.info.linkedin ||
                                  attendee.info.website) && (
                                  <div className="edgtf-team-social-holder">
                                    <div className="edgtf-team-social-holder-inner">
                                      <div className="edgtf-team-social-wrapp">
                                        <div className="social-icons text-right">
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
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            
                          </div>
                          {/* <div className="edgtf-team-social-holder-between">
                            <div className="edgtf-team-social">
                              <div className="edgtf-team-social-inner">
                                <div className="edgtf-team-social-wrapp"></div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                        {/* Description */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* Grid */}
          </div>
        </div>
        {attendees.length === 0 && <div>No Attendees Found...</div>}
        {attendees.length > 0 && loadMore()}
      </div>
    </div>
  );
};

export default Variation1;
