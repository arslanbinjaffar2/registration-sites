import React from "react";
import DocumentsListing from "@/ui-components/DocumentsListing";

const Variation1 = ({ exhibitor, labels, documents, moduleName }) => {
  return (
    <div data-fixed="true" className="ebs-transparent-box">
      <div
        style={{
          backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
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
                  <img
                    style={{border: '1px solid #ccc'}}
                    src={exhibitor.logo && exhibitor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + exhibitor.logo : require('img/exhibitors-default.png')}
                    alt=""
                    width="800"
                    height="800"
                  />{" "}
                </div>
                <div className="edge-grid-col-12 edgtf-team-list-single-info">
                    {exhibitor.name && 
                      <h2 className="edge-name">
                        { exhibitor.name}
                    </h2>}
                  <div className="edge-grid-row edge-info">
                    <div className="edge-grid-col-12">
                      {exhibitor.description && (
                        <div
                          style={{ paddingBottom: 10 }}
                          className="edge-team-single-content"
                        >
                          <h4 className="info">ABOUT </h4>
                          <p  dangerouslySetInnerHTML={{__html:exhibitor.description}} ></p>
                        </div>
                      )}
                      {exhibitor.email && (
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
                              href={`mailto:${exhibitor.email}`}
                            >
                              {exhibitor.email}
                            </a>
                          </p>
                        </div>
                      )}
                      {exhibitor.phone_number && (
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
                              href={`tel:${exhibitor.phone_number}`}
                            >
                              {exhibitor.phone_number}
                            </a>
                          </p>
                        </div>
                      )}
                      <div
                        style={{ marginBottom: 20 }}
                        className="edge-info-row"
                      >
                        <div className="social-icons">
                          {exhibitor.facebook && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${exhibitor.facebook}`}
                            >
                              <span data-icon="&#xe0aa;"></span>
                            </a>
                          )}
                          {exhibitor.twitter && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${exhibitor.twitter}`}
                            >
                              <span data-icon="&#xe0ab;"></span>
                            </a>
                          )}
                          {exhibitor.linkedin && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${exhibitor.linkedin}`}
                            >
                              <span data-icon="&#xe0b4;"></span>
                            </a>
                          )}
                          {exhibitor.website && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank"
                              href={`${exhibitor.website}`}
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

      <div className="">
        <div className="container">
          <h2 className="edgtf-title-with-dots edgtf-appeared">Contacts</h2>
          <div className="row d-flex ebs-program-speakers">
            {exhibitor.exhibitors_attendee.map((attendee,o) =>
              <div key={o} className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-attendee-box">
                <img  src={
                  attendee.image && attendee.image !== ""
                    ? process.env.REACT_APP_EVENTCENTER_URL +
                      "/assets/attendees/" +
                      attendee.image
                    : require("img/user-placeholder.jpg")
                } alt="" />
                <h4>{attendee.first_name} {attendee.last_name}</h4>
                <p>{attendee.info.title && (attendee.info.title)} {attendee.info.company_name && (attendee.info.company_name)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {documents && documents.length > 0 && <div style={{ paddingBottom: 80 }} className="edgtf-full-width">
        <div className="edgtf-container-inner container">
          <div className="edgtf-title-section-holder pb-1">
            <h2 className="edgtf-title-with-dots edgtf-appeared">Documents</h2>
            <span className="edge-title-separator edge-enable-separator"></span>
                <DocumentsListing documents={documents} />
            </div>
        </div>
      </div>}
    </div>
  );
};

export default Variation1;
