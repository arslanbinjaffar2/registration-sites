import React from "react";

const Variation6 = ({ speakers, listing, searchBar, loadMore }) => {
  return (
    <div>
      <div style={{ padding: "80px 0" }} className="module-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div
                style={{ marginBottom: "30px" }}
                className="edgtf-title-section-holder"
              >
                <h2 className="edgtf-title-with-dots edgtf-appeared">
                  Our Speakers
                </h2>
                <span class="edge-title-separator edge-enable-separator"></span>
              </div>
            </div>
          </div>
        </div>
        {listing && searchBar() }
        <div className="container">
          <div className="row d-flex algin-items-center">
            {speakers &&
              speakers.map((speaker, i) => (
                <div key={i} className="col-md-3">
                  <div className="speakerv6-wrapper">
                    <div className="speakerv6-image">
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
                      {/* <div className="caption">
                        <span className="plus"></span>
                      </div> */}
                    </div>
                    <div className="speakerv6-caption">
                      <h3>
                        {speaker.first_name} {speaker.last_name}
                      </h3>
                      <span
                        style={{ display: "inline-block" }}
                        className="edge-title-separator"
                      ></span>

                      {speaker.info && speaker.info.company_name && (
                        <div className="ebs-attendee-designation">
                          {speaker.info.title && speaker.info.title}{" "}
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
                      {speaker.info && listing && (
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
          {listing && speakers.length === 0 && <div>No Speakers Found...</div> }
        {listing && speakers.length > 0 && loadMore()}
        </div>
      </div>
    </div>
  );
};

export default Variation6;
