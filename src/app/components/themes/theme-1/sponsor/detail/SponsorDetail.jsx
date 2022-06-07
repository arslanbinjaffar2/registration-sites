import React from "react";

const Variation1 = ({ sponsor, labels }) => {
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
                    <span>Sponsor</span>
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
                      sponsor.image && sponsor.image !== ""
                        ? process.env.REACT_APP_EVENTCENTER_URL +
                          "/assets/sponsors/" +
                          sponsor.image
                        : "https://via.placeholder.com/1000.jpeg"
                    }
                    alt=""
                    width="800"
                    height="800"
                  />{" "}
                </div>
                <div className="edge-grid-col-12 edgtf-team-list-single-info">
                  <h2 className="edge-name">
                    {sponsor.name && sponsor.name}
                  </h2>
                  <div className="edge-grid-row edge-info">
                    <div className="edge-grid-col-12">
                      {sponsor.description && sponsor.description && (
                        <div
                          style={{ paddingBottom: 10 }}
                          className="edge-team-single-content"
                        >
                          <h4 className="info">ABOUT </h4>
                          <p  dangerouslySetInnerHTML={{__html:sponsor.description}} ></p>
                        </div>
                      )}
                      {sponsor.email && (
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
                              href={`mailto:${sponsor.email}`}
                            >
                              {sponsor.email}
                            </a>
                          </p>
                        </div>
                      )}
                      {sponsor.phone_number && (
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
                              href={`tel:${sponsor.phone_number}`}
                            >
                              {sponsor.phone_number}
                            </a>
                          </p>
                        </div>
                      )}
                      <div
                        style={{ marginBottom: 20 }}
                        className="edge-info-row"
                      >
                        <div className="social-icons">
                          {sponsor.facebook && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${sponsor.facebook}`}
                            >
                              <span data-icon="&#xe0aa;"></span>
                            </a>
                          )}
                          {sponsor.twitter && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${sponsor.twitter}`}
                            >
                              <span data-icon="&#xe0ab;"></span>
                            </a>
                          )}
                          {sponsor.linkedin && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${sponsor.linkedin}`}
                            >
                              <span data-icon="&#xe0b1;"></span>
                            </a>
                          )}
                          {sponsor.website && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${sponsor.website}`}
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
              Reminder for developer: Needed to implement document sections
              needs to be implemented
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation1;
