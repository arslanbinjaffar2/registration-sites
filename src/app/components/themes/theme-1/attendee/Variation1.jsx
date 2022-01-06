import React from "react";

const Variation1 = ({ attendees }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
        padding: "50px 0",
      }}
      className="edgtf-parallax-section-holder"
    >
      <div className="container">
        <div className="row d-flex mb-5">
          <div className="col-4">
            <div className="edgtf-title-section-holder">
              <h2
                style={{ color: "#ffffff" }}
                className="edgtf-title-with-dots edgtf-appeared">
                Build your base
              </h2>
              <span className="edge-title-separator edge-enable-separator"></span>
            </div>
          </div>
          <div className="col-8">
            <div className="edgtf-title-section-holder">
              <span className="edge-title-separator edge-disable-separator"></span>
              <h6
                className="edgtf-section-subtitle"
                style={{ color: "#ffffff" }}>
                Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad
                his suavitate complectitur ruis dicant facilisi
              </h6>
            </div>
          </div>
        </div>
        <div className="row d-flex edgtf-team-list-holder edgtf-team-info-below-image">
          {/* Grid */}

          {attendees &&
            attendees.map((attendee, i) => {
              return (
                <div key={i} className="col-12 col-md-4 pl-0 pr-0 ebs-attendee-v1">
                  <div className="edgtf-team-list-holder-inner info_box">
                    <div className="edgtf-team edgtf-team-light mb-5 w-100">
                      <div className="edgtf-team-inner">
                        <div className="edgtf-team-image">
                          <img
                            style={{ width: "100%" }}
                            src={
                              attendee.image && attendee.image !== ""
                                ? process.env.REACT_APP_EVENTCENTER_URL +
                                  "/assets/attendees/" +
                                  attendee.image
                                : require("img/square.jpg")
                            }
                            alt="g"
                          />
                          <div className="edgtf-team-social-holder">
                            <div className="edgtf-team-social-holder-inner"></div>
                          </div>
                        </div>
                        {/* Description */}
                        <div className="edgtf-team-info">
                          <div className="edgtf-team-title-holder">
                            <h3 className="edgtf-team-name">
                              {attendee.first_name} {attendee.last_name}
                            </h3>
                            <div className="ebs-attendee-designation">
                              Technical Manager Welltec
                            </div>
                            <div className="ebs-email-phone">
                              <a href={`mailto:${attendee.email}`} className="edgtf-team-position">
                                {attendee.email}
                              </a>
                            </div>
                            <div className="ebs-email-phone">
                              <a href={`tel: +78-54-897666`} className="edgtf-team-position">
                                +78-54-897666
                              </a>
                            </div>
                          </div>
                          <div className="edgtf-team-social-holder-between">
                            <div className="edgtf-team-social">
                              <div className="edgtf-team-social-inner">
                                <div className="edgtf-team-social-wrapp">
                                <div className="social-icons">
                                      <a
                                        target="_blank"
                                        href="#!"
                                      >
                                        <span data-icon="&#xe0aa;"></span>
                                      </a>
                                      <a
                                        target="_blank"
                                        href="#!"
                                      >
                                        <span data-icon="&#xe0ab;"></span>
                                      </a>
                                      <a
                                        target="_blank"
                                        href="#!"
                                      >
                                        <span data-icon="&#xe0b1;"></span>
                                      </a>
                                      <a
                                        target="_blank"
                                        href="#!"
                                      >
                                        <span data-icon="&#xe0b7;"></span>
                                      </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Description */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Grid */}
        </div>
      </div>
    </div>
  );
};

export default Variation1;
