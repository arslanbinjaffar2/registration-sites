import React from "react";

const Variation5 = ({ speakers }) => {
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
              <h6
                style={{ fontSize: "16px", lineHeight: "1.5" }}
                className="edgtf-section-subtitle"
              >
                A schedule at a glance is listed below. Check the program for
                this year's conference and learn about the speakers and sessions
                in store for tech enthusiasts.
              </h6>
            </div>
          </div>
        </div>
      </div>
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
                      <h5>
                        {speaker.first_name} {speaker.last_name}
                      </h5>
                      <span className="sc-desciption">{speaker.email}</span>
                    </div>
                    <div className="speakerv5-caption">
                      <h5>
                        {speaker.first_name} {speaker.last_name}
                      </h5>
                      <span className="sc-desciption">{speaker.email}</span>
                      <p>{speaker.info.about ? speaker.info.about : ""}</p>
                      <div className="sc-social">
                        {speaker.info.twitter && (
                          <a
                            target="_blank"
                            href={`${speaker.info.twitter_protocol}${speaker.info.twitter}`}
                          >
                            <i className="fa fa-twitter-square"></i>
                          </a>
                        )}
                        {speaker.info.facebook && (
                          <a
                            target="_blank"
                            href={`${speaker.info.facebook_protocol}${speaker.info.facebook}`}
                          >
                            <i className="fa fa-facebook-square"></i>
                          </a>
                        )}
                        {speaker.info.linkedin && (
                          <a
                            target="_blank"
                            href={`${speaker.info.linkedin_protocol}${speaker.info.linkedin}`}
                          >
                            <i className="fa fa-linkedin-square"></i>
                          </a>
                        )}
                        {speaker.info.website && (
                          <a
                            target="_blank"
                            href={`${speaker.info.website_protocol}${speaker.info.website}`}
                          >
                            <i className="fa fa-external-link"></i>
                          </a>
                        )}
                      </div>
                    </div>
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
