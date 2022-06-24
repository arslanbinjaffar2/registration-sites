import React from "react";
import DocumentsListing from "components/ui-components/DocumentsListing";
import Image from 'next/image'

const SponsorDetail = ({ sponsor, documents, labels, sponsorSettings, moduleName }) => {

  return (
    <div data-fixed="false" className="ebs-transparent-box">
      <div
        style={{
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
                  <span style={{ border: '1px solid #ccc' }} className="gallery-img-wrapper-square">
                    {sponsor.logo && sponsor.logo !== '' ? (
                      <img
                        style={{ maxWidth: '90%', width: 'auto' }}
                        onLoad={(e) => e.target.style.opacity = 1}
                        src={process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo}
                        alt=""
                      />
                    ) : (
                      <Image
                        style={{ maxWidth: '90%', width: 'auto' }}
                        onLoad={(e) => e.target.style.opacity = 1}
                        src={require('public/img/exhibitors-default.png')}
                        alt=""
                      />
                    )}
                  </span>
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
                          <p dangerouslySetInnerHTML={{ __html: sponsor.description }} ></p>
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
                              target="_blank" rel="noreferrer"
                              href={`${sponsor.facebook}`}
                            >
                              <span data-icon="&#xe0aa;"></span>
                            </a>
                          )}
                          {sponsor.twitter && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank" rel="noreferrer"
                              href={`${sponsor.twitter}`}
                            >
                              <span data-icon="&#xe0ab;"></span>
                            </a>
                          )}
                          {sponsor.linkedin && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank" rel="noreferrer"
                              href={`${sponsor.linkedin}`}
                            >
                              <span data-icon="&#xe0b4;"></span>
                            </a>
                          )}
                          {sponsor.website && (
                            <a
                              style={{ fontSize: "30px" }}
                              target="_blank" rel="noreferrer"
                              href={`${sponsor.website}`}
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
      {sponsorSettings.show_contact_person && <div style={{ paddingBottom: 50 }} className="">
        <div className="container">
          <div className="edgtf-title-section-holder pb-1">
            <h3 className="edgtf-title-with-dots edgtf-appeared pb-2">Contacts</h3>
          </div>
          <div className="row d-flex ebs-program-speakers">
            {sponsor.sponsors_attendee.map((attendee, o) =>
              <div key={o} style={{ animationDelay: 50 * o + 'ms' }} className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box ebs-animation-layer">
                <span style={{ marginBottom: 10 }} className="gallery-img-wrapper-square">
                  {attendee.image && attendee.image !== "" ? (
                    <img
                      onLoad={(e) => e.target.style.opacity = 1}
                      style={{ width: '90%' }}
                      src={
                        process.env.REACT_APP_EVENTCENTER_URL +
                        "/assets/attendees/" +
                        attendee.image
                      } alt="" />
                  ) : (
                    <Image
                      onLoad={(e) => e.target.style.opacity = 1}
                      style={{ width: '90%' }}
                      src={
                        require("public/img/user-placeholder.jpg")
                      } alt="" />
                  )}
                </span>
                <h4>{attendee.first_name} {attendee.last_name}</h4>
                <p>{attendee.info.title && (attendee.info.title)} {attendee.info.company_name && (attendee.info.company_name)}</p>
              </div>
            )}
          </div>
        </div>
      </div>}
      {documents && documents.length > 0 && <div style={{ paddingBottom: 80 }} className="edgtf-full-width">
        <div className="edgtf-container-inner container">
          <div className="edgtf-title-section-holder pb-1">
            <h3 className="edgtf-title-with-dots edgtf-appeared mb-0 pb-2">Documents</h3>
          </div>
          <DocumentsListing documents={documents} />
        </div>
      </div>}
    </div>
  );
};

export default SponsorDetail;
