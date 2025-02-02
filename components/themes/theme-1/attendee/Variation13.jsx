import React from "react";
import ActiveLink from "components/atoms/ActiveLink";
import HeadingElement from "components/ui-components/HeadingElement";
import Image from 'next/image'

const Variation13 = ({ attendees, searchBar, loadMore, event, settings, siteLabels }) => {
  const bgStyle = (settings && settings.background_color !== "") ? { backgroundColor: settings.background_color } : {}

  return (
    <div
      style={bgStyle}
      className="edgtf-parallax-section-holder ebs-default-padding"
    >
      {/* <div className="container">
        <HeadingElement dark={false} label={event.labels.EVENTSITE_ATTENDEES} desc={event.labels.EVENT_ATTENDEES_LOWER_HEAD} align={settings.text_align} />
      </div> */}
      {searchBar()}
      <div className="container">
        <div className="edgtf-team-list-holder">
          {/* Grid */}
          {attendees &&
            attendees.map((attendee, i) => (
              <div
                key={i}
                className="ebs-attendees-list"
              >
                <div style={{ animationDelay: 50 * i + 'ms' }} className="edgtf-team-list-holder-inner info_box ebs-animation-layer">
                  <div className="edgtf-team p-0 w-100 p-0 mb-4 lh-base">
                    <div className="edgtf-team-inner w-auto row">
                      <div className="edgtf-team-image mb-4 mb-md-0 col-lg-3 col-xl-2 col-md-4 col-sm-4 col-12">
                        <ActiveLink href={`/${event.url}/attendees/${attendee.id}`}>
                          <span className="gallery-img-wrapper-square">
                            {attendee.image && attendee.image !== "" ? (
                              <img
                                className="rounded-circle border border-sm-0"
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
                                className="rounded-circle border border-sm-0"
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
                      <div className="col-md-8 ps-md-4  col-lg-9 col-xl-10 col-sm-8 col-12">
                        <div className="d-flex align-items-center border h-100 w-100">
                          <div className="edgtf-team-info text-start w-100  text-xs-center px-4 py-5 py-sm-2 py-md-2 m-0">
                            <div className="edgtf-team-title-holder m-0">
                              {(attendee.first_name || attendee.last_name) && (
                                <ActiveLink href={`/${event.url}/attendees/${attendee.id}`}>
                                  <h3 className="edgtf-team-name mt-0 mb-1">
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
                                  <div  className="ebs-attendee-designation mb-1">
                                    {attendee.info.title && attendee.info.title}
                                    {attendee.info.title &&
                                      attendee.info.company_name &&
                                      ", "}
                                    {attendee.info.company_name &&
                                      attendee.info.company_name}
                                  </div>
                                )}
                              <div className="ebs-border-wrapp">
                                {attendee.email && (
                                  <div  className="ebs-email-phone mb-1">
                                    <a
                                      href={`mailto:${attendee.email}`}
                                      className="edgtf-team-position"
                                      
                                    >
                                      {attendee.email}
                                    </a>
                                  </div>
                                )}

                                {attendee.phone && (
                                  <div  className="ebs-email-phone mb-1">
                                    <a
                                      href={`tel: ${attendee.phone}`}
                                      className="edgtf-team-position"
                                      
                                    >
                                      {attendee.phone}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                            {
                              attendee.info &&
                              (attendee.info.facebook ||
                                attendee.info.twitter ||
                                attendee.info.linkedin ||
                                attendee.info.website) && (
                                <div className="edgtf-team-social-holder-between">
                                  <div className="edgtf-team-social">
                                    <div className="edgtf-team-social-inner">
                                      <div className="edgtf-team-social-wrapp">
                                        <div className="social-icons pt-1 text-start">
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
                                </div>
                              )}
                          </div>
                        </div>
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

export default Variation13;
