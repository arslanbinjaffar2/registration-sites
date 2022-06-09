import React from "react";

const Variation1 = ({ speaker, moduleName}) => {
  return (
    <div data-fixed="true" className="">
      <div
        style={{
          backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
          height: 390,
        }}
        className="edgtf-title edgtf-standard-type edgtf-has-background edgtf-content-left-alignment edgtf-title-large-text-size edgtf-animation-no edgtf-title-image-not-responsive edgtf-title-with-border"
      >
        <div className="edgtf-title-holder">
          <div className="edgtf-container clearfix">
            <div className="edgtf-container-inner">
              <div className="edgtf-title-subtitle-holder">
                <div className="edgtf-title-subtitle-holder-inner">
                  <h1 style={{ color: "white" }}>
                    <span>{moduleName}</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="single-team-member">
        <div className="edgtf-container-inner clearfix">
          <div className="edgtf-team-single-holder">
            <div className="edge-team-single-holder">
              <div className="edge-grid-row">
                <div className="edge-grid-col-12 edgtf-team-list-single-image">
                  <img
                    src={
                      speaker.image && speaker.image !== ""
                        ? process.env.REACT_APP_EVENTCENTER_URL +
                          "/assets/attendees/" +
                          speaker.image
                        : "https://via.placeholder.com/1000.jpeg"
                    }
                    alt=""
                    width="800"
                    height="800"
                  />{" "}
                </div>
                <div className="edge-grid-col-12 edgtf-team-list-single-info">
                  <h2 className="edge-name">
                    {speaker.info &&
                      speaker.info.initial &&
                      `${speaker.info.initial} `}
                    {speaker.first_name && speaker.first_name}{" "}
                    {speaker.last_name && speaker.last_name}
                  </h2>
                  {speaker.info &&
                    (speaker.info.company_name || speaker.info.title) && (
                      <div className="edge-info-row">
                        <p className="info">
                          {speaker.info.title &&
                            `${speaker.info.title}, `}{" "}
                          {speaker.info.company_name &&
                            speaker.info.company_name}
                        </p>
                      </div>
                    )}
                  <div className="edge-grid-row edge-info">
                    <div className="edge-grid-col-12">
                      {speaker.info && speaker.info.about && (
                        <div
                          style={{ paddingBottom: 10 }}
                          className="edge-team-single-content"
                        >
                          <h4 className="info">ABOUT </h4>
                          <p>{speaker.info.about}</p>
                        </div>
                      )}
                      {speaker.email && (
                        <div
                          style={{ marginBottom: 20 }}
                          className="edge-info-row"
                        >
                          <h4
                            style={{
                              textTransform: "uppercase",
                              marginBottom: 10,
                            }}
                            className="info"
                          >
                            Email{" "}
                          </h4>
                          <p>
                            <a
                              style={{ color: "#000" }}
                              href={`mailto:${speaker.email}`}
                            >
                              {speaker.email}
                            </a>
                          </p>
                        </div>
                      )}
                      {speaker.phone && (
                        <div
                          style={{ marginBottom: 20 }}
                          className="edge-info-row"
                        >
                          <h4
                            style={{
                              textTransform: "uppercase",
                              marginBottom: 10,
                            }}
                            className="info"
                          >
                            Phone{" "}
                          </h4>
                          <p>
                            <a
                              style={{ color: "#000" }}
                              href={`tel:${speaker.phone}`}
                            >
                              {speaker.phone}
                            </a>
                          </p>
                        </div>
                      )}
                      <div
                        style={{ marginBottom: 20 }}
                        className="edge-info-row"
                      >
                        <div className="social-icons">
                          {speaker.info && speaker.info.facebook && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${speaker.info.facebook_protocol}${speaker.info.facebook}`}
                            >
                              <span data-icon="&#xe0aa;"></span>
                            </a>
                          )}
                          {speaker.info && speaker.info.twitter && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${speaker.info.twitter_protocol}${speaker.info.twitter}`}
                            >
                              <span data-icon="&#xe0ab;"></span>
                            </a>
                          )}
                          {speaker.info && speaker.info.linkedin && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${speaker.info.linkedin_protocol}${speaker.info.linkedin}`}
                            >
                              <span data-icon="&#xe0b1;"></span>
                            </a>
                          )}
                          {speaker.info && speaker.info.website && (
                            <a
                              style={{ fontSize: "30px" }}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: 80 }} className="edgtf-full-width">
        <div className="edgtf-container-inner">
          <div className="edgtf-title-section-holder pb-1">
            <h2 className="edgtf-title-with-dots edgtf-appeared">Programes</h2>
            <span className="edge-title-separator edge-enable-separator"></span>
            <h6>
              Reminder for developer: Needed to implement programme sections
              variations
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation1;
