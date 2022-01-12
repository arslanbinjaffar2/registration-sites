import React from "react";
const Variation5 = ({ speakers, listing, searchBar }) => {
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <div
              style={{ marginBottom: "30px" }}
              className="edgtf-title-section-holder"
            >
              <h2 className="edgtf-title-with-dots edgtf-appeared">
                Our Speakers{" "}
              </h2>
              <span class="edge-title-separator edge-enable-separator"></span>
              <h6
                style={{ fontSize: "16px", lineHeight: "1.5" }}
                className="edgtf-section-subtitle"
              >
                A schedule at a glance is listed below. Check the program for
                this year's conference and learn about the attendees and
                sessions in store for tech enthusiasts.
              </h6>
            </div>
          </div>
        </div>
      </div>
      {listing && searchBar() }
      <div className="container">
        <div className="row">
          {speakers &&
            speakers.map((speaker, i) => (
              <div key={i} className="col-4">
                <div className="speakerv5-wrapper">
                  <div className="speakerv5-area text-center">
                    <div className="speakerv5-image">
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
                    </div>
                    <h5>
                      {speaker.first_name} {speaker.last_name}
                    </h5>
                    {speaker.info && speaker.info.company_name && (
                      <div className="ebs-attendee-designation">
                        {speaker.info.title && speaker.info.title}{" "}
                        {speaker.info.company_name && speaker.info.company_name}
                      </div>
                    )}

                    {listing && speaker.email && (
                      <div className="ebs-email-phone">
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
                        <a
                          href={`tel: ${speaker.phone}`}
                          className="edgtf-team-position"
                        >
                          {speaker.phone}
                        </a>
                      </div>
                    )}
                    {listing && speaker.info && <div className="social-icons">
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
                    </div>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Variation5;
