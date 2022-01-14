import React from "react";

const Variation2 = ({ attendees, searchBar, loadMore }) => {
  return (
    <div
      style={{ padding: "50px 0" }}
      className="edgtf-parallax-section-holder"
    >
      <div className="container">
        <div className="row d-flex mb-5">
          <div className="col-8 offset-md-2 text-center">
            <div className="edgtf-title-section-holder">
              <h2 className="edgtf-title-with-dots edgtf-appeared">
                Attendees
              </h2>
              <span className="edge-title-separator edge-enable-separator"></span>
            </div>
            <div className="edgtf-title-section-holder">
              <h6 className="edgtf-section-subtitle">
                Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad
                his suavitate complectitur ruis dicant facilisi
              </h6>
            </div>
          </div>
        </div>
        { searchBar() }
        <div className="row d-flex edgtf-team-list-holder edgtf-team-info-below-image ">
          {/* Grid */}
          {attendees &&
            attendees.map((attendee, i) => {
              return (
                <div
                  className="col-12 col-md-4 pl-0 pr-0 ebs-attendee-v2"
                  key={i}
                >
                  <div className="edgtf-team-list-holder-inner info_box">
                    <div className="edgtf-team mb-5 w-100">
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
                        </div>
                        {/* Description */}
                        <div className="edgtf-team-info">
                          <div className="edgtf-team-title-holder">
                            <h3 className="edgtf-team-name">
                              {attendee.first_name} {attendee.last_name}
                            </h3>
                            {attendee.info && attendee.info.company_name && (
                              <div className="ebs-attendee-designation">
                                {attendee.info.title && attendee.info.title}{" "}
                                {attendee.info.company_name &&
                                  attendee.info.company_name}
                              </div>
                            )}
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
                                  href={`tel:${attendee.phone}`}
                                  className="edgtf-team-position"
                                >
                                  {attendee.phone}
                                </a>
                              </div>
                            )}
                          </div>
                          {attendee.info && (
                            <div className="edgtf-team-social-holder-between">
                              <div className="edgtf-team-social">
                                <div className="edgtf-team-social-inner">
                                  <div className="edgtf-team-social-wrapp">
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
              );
            })}
        </div>
        {attendees.length === 0 && <div>No Attendees Found...</div> }
        {attendees.length > 0 && loadMore() }
      </div>
    </div>
  );
};

export default Variation2;
