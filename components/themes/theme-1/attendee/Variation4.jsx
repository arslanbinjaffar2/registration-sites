import React, { useEffect, useRef } from "react";
import ActiveLink from "components/atoms/ActiveLink";
import HeadingElement from "components/ui-components/HeadingElement";
import Image from 'next/image'

const Variation4 = ({ attendees, searchBar, loadMore, event, settings, siteLabels }) => {

  const _bgimage = `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/variation_background/${settings.background_image}`;
  const bgStyle = (settings && settings.background_image !== "") ? { backgroundImage: `url(${_bgimage})` } : {}


  return (
    <div style={bgStyle}
      className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding"
    >
      {/* <div className="container">
        <HeadingElement dark={true} label={event.labels.EVENTSITE_ATTENDEES} desc={event.labels.EVENT_ATTENDEES_LOWER_HEAD} align={settings.text_align} />
      </div> */}
      {searchBar()}
      <div className="container">
        <div className="row d-flex edgtf-team-list-holder edgtf-team-info-on-hover ebs-team-vairation-9">
          {/* Grid */}
          {attendees &&
            attendees.map((attendee, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-4 pb-4">
                <div style={{ animationDelay: 50 * i + 'ms' }} className="edgtf-team-list-holder-inner info_box ebs-animation-layer">
                  <div
                    style={{ width: "100%" }}
                    className="edgtf-team edgtf-team-light"
                  >
                    <div className="edgtf-team-inner">
                      <div className="edgtf-team-image">
                        <ActiveLink href={`/${event.url}/attendees/${attendee.id}`}>
                          <span className="gallery-img-wrapper-square">
                            {attendee.image && attendee.image !== "" ? (
                              <img
                                onLoad={(e) => e.target.style.opacity = 1}
                                src={
                                  process.env.NEXT_APP_EVENTCENTER_URL +
                                  "/assets/attendees/" +
                                  attendee.image
                                }
                                alt="g"
                              />
                            ) : (
                              <Image objectFit='contain' layout="fill"
                                onLoad={(e) => e.target.style.opacity = 1}
                                src={
                                  require("public/img/user-placeholder.jpg")
                                }
                                alt="g"
                              />
                            )}
                          </span>
                        </ActiveLink>
                      </div>
                      {/* Description */}
                      <div className="edgtf-team-info">
                        <div className="edgtf-team-title-holder">
                          {(attendee.first_name || attendee.last_name) && (
                            <ActiveLink href={`/${event.url}/attendees/${attendee.id}`}>
                              <h3 style={{ lineHeight: 1 }} className="edgtf-team-name">
                                {attendee.info &&
                                  attendee.info.initial && (
                                    <>
                                      {attendee.info.initial &&
                                        attendee.info.initial}&nbsp;
                                    </>
                                  )}
                                {attendee.first_name && attendee.first_name}{" "}
                                {attendee.last_name && attendee.last_name}
                              </h3>
                            </ActiveLink>
                          )}
                          {attendee.info &&
                            (attendee.info.company_name ||
                              attendee.info.title) && (
                              <div style={{ paddingBottom: 4 }} className="ebs-attendee-designation">
                                <span className="edgtf-team-position">
                                  {attendee.info.title && attendee.info.title}
                                  {attendee.info.company_name &&
                                    attendee.info.title &&
                                    ", "}
                                  {attendee.info.company_name &&
                                    attendee.info.company_name}
                                </span>
                              </div>
                            )}
                          <div className="d-flex ebs-box-bottom">
                            <div className="col-6">
                              {attendee.email && (
                                <div className="ebs-email-phone">
                                  <a
                                    href={`mailto:${attendee.email}`}
                                    className="edgtf-team-position"
                                  >
                                    {attendee.email}
                                  </a>
                                </div>
                              )}
                              {attendee.phone && (
                                <div className="ebs-email-phone">
                                  <a
                                    href={`tel: ${attendee.phone}`}
                                    className="edgtf-team-position"
                                  >
                                    {attendee.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                            <div className="col-6">
                              {
                                attendee.info &&
                                (attendee.info.facebook ||
                                  attendee.info.twitter ||
                                  attendee.info.linkedin ||
                                  attendee.info.website) && (
                                  <div className="edgtf-team-social-holder">
                                    <div className="edgtf-team-social-holder-inner">
                                      <div className="edgtf-team-social-wrapp">
                                        <div className="social-icons text-right">
                                          {attendee.info.facebook && (
                                            <a
                                              target="_blank" rel="noreferrer"
                                              href={`${attendee.info.facebook_protocol}${attendee.info.facebook}`}
                                            >
                                              <span data-icon="&#xe0aa;"></span>
                                            </a>
                                          )}
                                          {attendee.info.twitter && (
                                            <a
                                              target="_blank" rel="noreferrer"
                                              href={`${attendee.info.twitter_protocol}${attendee.info.twitter}`}
                                            >
                                              <span className="fa-brands fa-x-twitter"></span>
                                            </a>
                                          )}
                                          {attendee.info.linkedin && (
                                            <a
                                              target="_blank" rel="noreferrer"
                                              href={`${attendee.info.linkedin_protocol}${attendee.info.linkedin}`}
                                            >
                                              <span data-icon="&#xe0b4;"></span>
                                            </a>
                                          )}
                                          {attendee.info.website && (
                                            <a
                                              target="_blank" rel="noreferrer"
                                              href={`${attendee.info.website_protocol}${attendee.info.website}`}
                                            >
                                              <span data-icon="&#xe0e3;"></span>
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>


                        </div>
                        {/* <div className="edgtf-team-social-holder-between">
                            <div className="edgtf-team-social">
                              <div className="edgtf-team-social-inner">
                                <div className="edgtf-team-social-wrapp"></div>
                              </div>
                            </div>
                          </div> */}
                      </div>
                      {/* Description */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* Grid */}
        </div>
        {attendees.length === 0 && <div>{siteLabels.GENERAL_NO_RECORD}</div>}
        {attendees.length > 0 && loadMore()}
      </div>
    </div>
  );




};

export default Variation4;
