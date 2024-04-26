import React from "react";
import ActiveLink from "components/atoms/ActiveLink";
import HeadingElement from "components/ui-components/HeadingElement";
import Image from 'next/image'

const Variation8 = ({ speakers, listing, searchBar, loadMore, event, settings, siteLabels }) => {
  const bgStyle = (settings && settings.background_color !== "") ? { backgroundColor: settings.background_color } : {}

  return (
    <div style={bgStyle} className="module-section ebs-default-padding">
      {!listing && <div className="container">
        <HeadingElement dark={false} label={event.labels.EVENTSITE_SPEAKERS} desc={event.labels.EVENTSITE_AMAZING_SPEAKERS} align={settings.text_align} />
      </div>}
      {listing && searchBar()}
      <div className="container">
        <div className={`row d-flex algin-items-center ${!listing ? 'justify-content-center' : ''}`}>
          {speakers &&
            speakers.map((speaker, i) => (
              <div
                key={i}
                style={{ marginBottom: "30px" }}
                className="col-md-4 col-sm-6"
              >
                <div
                  style={{ height: "100%", marginBottom: 0, animationDelay: 50 * i + 'ms' }}
                  className="speakerv7-wrapper ebs-animation-layer"
                >
                  <div className="speakerv7-image">
                    <span className="box">
                      <ActiveLink href={`/${event.url}/speakers/${speaker.id}`}>
                        <span className="gallery-img-wrapper-square">
                          {speaker.image && speaker.image !== "" ? (
                            <img
                              onLoad={(e) => e.target.style.opacity = 1}
                              src={
                                process.env.NEXT_APP_EVENTCENTER_URL +
                                "/assets/attendees/" +
                                speaker.image
                              }
                              alt={speaker.first_name || 'Speaker'}
                            />
                          ) : (
                            <Image objectFit='contain' layout="fill"
                              onLoad={(e) => e.target.style.opacity = 1}
                              src={
                                require("public/img/user-placeholder.jpg")
                              }
                              alt={speaker.first_name || 'Speaker'}
                            />
                          )}
                        </span>
                      </ActiveLink>
                    </span>
                  </div>
                  <div className="speakerv7-caption">
                    {(speaker.first_name || speaker.last_name) && (
                      <ActiveLink href={`/${event.url}/speakers/${speaker.id}`}>
                        <h3>
                          {speaker.info &&
                            speaker.info.initial && (
                              <>
                                {speaker.info.initial &&
                                  speaker.info.initial}&nbsp;
                              </>
                            )}
                          {speaker.first_name && speaker.first_name}{" "}
                          {speaker.last_name && speaker.last_name}
                        </h3>
                      </ActiveLink>
                    )}

                    {speaker.info &&
                      (speaker.info.company_name || speaker.info.title) && (
                        <p>
                          {speaker.info.title && speaker.info.title}
                          {speaker.info.company_name &&
                            speaker.info.company_name && <br />}
                          {speaker.info.company_name &&
                            speaker.info.company_name}
                        </p>
                      )}
                    {listing && speaker.email && (
                      <div className="email">
                        <a aria-label="Email" href={`mailto:${speaker.email}`}>{speaker.email}</a>
                      </div>
                    )}

                    {listing && speaker.phone && (
                      <div className="speakerv7-phone">
                        <a aria-label="Phone" href={`tel:${speaker.phone}`}>{speaker.phone}</a>
                      </div>
                    )}
                    {listing &&
                      speaker.info &&
                      (speaker.info.facebook ||
                        speaker.info.twitter ||
                        speaker.info.linkedin ||
                        speaker.info.website) && (
                        <div className="d-flex">
                          <ul className="social-icons list-inline m-0">
                            {speaker.info.facebook && (
                              <li className="list-inline-item">
                                <a
                                  target="_blank" rel="noreferrer"
                                   aria-label="Facebook (opens in new window)"
                                  href={`${speaker.info.facebook_protocol}${speaker.info.facebook}`}
                                >
                                  <span data-icon="&#xe0aa;"></span>
                                </a>
                              </li>
                            )}
                            {speaker.info.twitter && (
                              <li className="list-inline-item">
                                <a
                                  target="_blank" rel="noreferrer"
                                   aria-label="X (opens in new window)"
                                  href={`${speaker.info.twitter_protocol}${speaker.info.twitter}`}
                                >
                                  <span data-icon="&#xe0ab;"></span>
                                </a>
                              </li>
                            )}
                            {speaker.info.linkedin && (
                              <li className="list-inline-item">
                                <a
                                  target="_blank" rel="noreferrer"
                                   aria-label="Linkedin (opens in new window)"
                                  href={`${speaker.info.linkedin_protocol}${speaker.info.linkedin}`}
                                >
                                  <span data-icon="&#xe0b4;"></span>
                                </a>
                              </li>
                            )}
                            {speaker.info.website && (
                              <li className="list-inline-item">
                                <a
                                  target="_blank" rel="noreferrer"
                                   aria-label="Website (opens in new window)"
                                  href={`${speaker.info.website_protocol}${speaker.info.website}`}
                                >
                                  <span data-icon="&#xe0e3;"></span>
                                </a>
                              </li>
                            )}
                          </ul>
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

export default Variation8;
