import React from "react";
import ProgramItem from "components/themes/theme-1/program/components/ProgramItem";
import WorkShop from "components/themes/theme-1/program/components/WorkShop";
import {localeProgramMoment} from 'helpers/helper';
const Variation1 = ({ speaker, moduleName ,siteLabels, eventUrl, showWorkshop, eventLanguageId}) => {
  return (
    <div data-fixed="false" className="ebs-transparent-box">
      <div
        style={{
          backgroundImage: `url(${require("public/img/h1-parallax1.jpg")})`,
          minHeight: 250,
        }}
        className="edgtf-title edgtf-standard-type edgtf-has-background edgtf-content-left-alignment edgtf-title-large-text-size edgtf-animation-no edgtf-title-image-not-responsive edgtf-title-with-border"
      >
        <div className="edgtf-title-holder d-flex align-items-center justify-content-center">
            <div className="container">
              <div className="edgtf-title-subtitle-holder">
                <div className="edgtf-title-subtitle-holder-inner">
                  <h1 style={{ color: "white" }}>
                    <span>{moduleName}</span>
                  </h1>
                </div>
              </div>
            </div>
        </div>
        <div></div>
      </div>
      <div className="single-team-member">
        <div className="edgtf-container-inner container clearfix">
          <div className="edgtf-team-single-holder">
            <div className="edge-team-single-holder">
              <div className="edge-grid-row">
                <div className="edge-grid-col-12 edgtf-team-list-single-image">
                  <span style={{border: '1px solid #ccc'}} className="gallery-img-wrapper-square">
                    <img
                      onLoad={(e) => e.target.style.opacity = 1} 
                      src={
                        speaker.image && speaker.image !== ""
                          ? process.env.REACT_APP_EVENTCENTER_URL +
                            "/assets/attendees/" +
                            speaker.image
                          : require("public/img/square.jpg")
                      }
                      alt="g"
                    />
                  </span>
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
                              <span data-icon="&#xe0b4;"></span>
                            </a>
                          )}
                          {speaker.info && speaker.info.website && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${speaker.info.website_protocol}${speaker.info.website}`}
                            >
                              <span data-icon="&#xe0e3;"></span>
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
        <div className="edgtf-container-inner container">
          <div className="edgtf-title-section-holder pb-1 ebs-program-listing-wrapper">
            <h2 className="edgtf-title-with-dots edgtf-appeared">Programes</h2>
            <span className="edge-title-separator edge-enable-separator"></span>
          <div className="ebs-main-program-listing">

            {speaker.programs && Object.keys(speaker.programs).map((key ,k ) => (
                <div className="ebs-program-parent" key={k}>
                  {speaker.programs[key][0] && <div className="ebs-date-border">{localeProgramMoment(eventLanguageId, speaker.programs[key][0].heading_date)}</div>}
                    {speaker.programs[key].map((item, i)=>
                          item.workshop_id > 0 ? 
                          <WorkShop item={item} key={i} eventUrl={eventUrl} showWorkshop={showWorkshop} /> : <ProgramItem program={item} key={i} eventUrl={eventUrl} />
                    
                    )}
                </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation1;
