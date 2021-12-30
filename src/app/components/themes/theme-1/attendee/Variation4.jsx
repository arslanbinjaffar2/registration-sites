import React from "react";

const Variation4 = ({ attendees }) => {
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
                Build your base{" "}
              </h2>
              <span className="edge-title-separator edge-enable-separator"></span>
            </div>
          </div>
        </div>
        <div className="row d-flex edgtf-team-list-holder edgtf-team-info-on-hover">
          {/* Grid */}
          {attendees &&
            attendees.map((attendee, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-4 pl-0 pr-0">
                <div className="edgtf-team-list-holder-inner info_box">
                  <div
                    style={{ width: "100%" }}
                    className="edgtf-team edgtf-team-light mb-0"
                  >
                    <div className="edgtf-team-inner">
                      <div className="edgtf-team-image">
                        <img
                          style={{ width: "100%" }}
                          src={
                            attendee.image && attendee.image !== ""
                              ? process.env.REACT_APP_EVENTCENTER_URL +
                                "/assets/attendees/" +
                                attendee.image
                              : "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"
                          }
                          alt="g"
                        />
                      </div>
                      {/* Description */}
                      <div className="edgtf-team-info">
                        <div className="edgtf-team-title-holder">
                          <h3 className="edgtf-team-name">
                            {attendee.first_name} {attendee.last_name}
                          </h3>
                          <span className="edgtf-team-position">
                            {attendee.email}
                          </span>
                          <div className="edgtf-team-social-holder">
                            <div className="edgtf-team-social-holder-inner">
                              {attendee.info.facebook && (
                                <a
                                  target="_blank"
                                  href={`${attendee.info.facebook_protocol}${attendee.info.facebook}`}
                                >
                                  <span
                                    className="social_facebook_circle"
                                    aria-hidden="true"
                                  ></span>{" "}
                                </a>
                              )}
                              {attendee.info.twitter && (
                                <a
                                  target="_blank"
                                  href={`${attendee.info.twitter_protocol}${attendee.info.twitter}`}
                                >
                                  <span
                                    className="social_twitter_circle"
                                    aria-hidden="true"
                                  ></span>{" "}
                                </a>
                              )}
                              {attendee.info.linkedin && (
                                <a
                                  target="_blank"
                                  href={`${attendee.info.linkedin_protocol}${attendee.info.linkedin}`}
                                >
                                  <span
                                    className="social_linkedin_circle"
                                    aria-hidden="true"
                                  ></span>{" "}
                                </a>
                              )}
                              {attendee.info.website && (
                                <a
                                  target="_blank"
                                  href={`${attendee.info.website_protocol}${attendee.info.website}`}
                                >
                                  <span
                                    className="social_share_circle"
                                    aria-hidden="true"
                                  ></span>{" "}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="edgtf-team-social-holder-between">
                          <div className="edgtf-team-social">
                            <div className="edgtf-team-social-inner">
                              <div className="edgtf-team-social-wrapp"></div>
                            </div>
                          </div>
                        </div>
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
    </div>
  );
};

export default Variation4;
