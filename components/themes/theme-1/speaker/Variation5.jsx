import React from "react";
import Link from 'next/link'
import HeadingElement from "components/ui-components/HeadingElement";
import Image from 'next/image'

const Variation5 = ({ speakers, listing, searchBar, loadMore, event, settings, siteLabels }) => {
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container">
        <HeadingElement dark={false} label={event.labels.EVENTSITE_SPEAKERS} desc={event.labels.EVENTSITE_AMAZING_SPEAKERS} align={settings.text_align} />
      </div>
      {listing && searchBar()}
      <div className="container">
        <div className="row">
          {speakers &&
            speakers.map((speaker, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-4">
                <div style={{animationDelay: 50*i+'ms'}} className="speakerv5-wrapper ebs-animation-layer">
                  <div className="speakerv5-area text-center">
                    <div className="speakerv5-image">
                      <Link href={`/${event.url}/speakers/${speaker.id}`}>
                        <span className="gallery-img-wrapper-square">
                          <img
                            onLoad={(e) => e.target.style.opacity = 1} 
                            src={
                              speaker.image && speaker.image !== ""
                                ? process.env.REACT_APP_EVENTCENTER_URL +
                                  "/assets/attendees/" +
                                  speaker.image
                                : require("public/img/user-placeholder.jpg")
                            }
                            alt="g"
                          />
                        </span>
                      </Link>
                    </div>
                    {(speaker.first_name || speaker.last_name) && (
                      <Link href={`/${event.url}/speakers/${speaker.id}`}>
                        <h5>
                          {speaker.first_name && speaker.first_name}{" "}
                          {speaker.last_name && speaker.last_name}
                        </h5>
                      </Link>
                    )}
                    {speaker.info &&
                      (speaker.info.company_name || speaker.info.title) && (
                        <div className="ebs-attendee-designation">
                          {speaker.info.title && speaker.info.title}
                          {speaker.info.company_name && speaker.info.title && ", "}
                          {speaker.info.company_name &&
                            speaker.info.company_name}
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
                    {listing &&
                      speaker.info &&
                      (speaker.info.facebook ||
                        speaker.info.twitter ||
                        speaker.info.linkedin ||
                        speaker.info.website) && (
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
                              <span data-icon="&#xe0b4;"></span>
                            </a>
                          )}
                          {speaker.info.website && (
                            <a
                              target="_blank"
                              href={`${speaker.info.website_protocol}${speaker.info.website}`}
                            >
                              <span data-icon="&#xe0e3;"></span>
                            </a>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {listing && speakers.length === 0 && <div>{siteLabels.GENERAL_NO_RECORD}</div>}
        {listing && speakers.length > 0 && loadMore()}
      </div>
    </div>
  );
};

export default Variation5;
