import React, { useEffect, useRef } from "react";
import ActiveLink from "components/atoms/ActiveLink";
import HeadingElement from "components/ui-components/HeadingElement";
import Image from 'next/image'



const Variation9 = ({
  attendees,
  searchBar,
  loadMore,
  event,
  settings,
  siteLabels
}) => {

    const _parallax = useRef(null);
    useEffect(() => {
      window.addEventListener("scroll", scollEffect);
      return () => {
        window.removeEventListener("scroll", scollEffect);
      }
    }, [])
    function scollEffect() {
      const scrolled = window.pageYOffset;
      const itemOffset = _parallax.current.offsetTop;
      const itemHeight = _parallax.current.getBoundingClientRect();
      if (scrolled < (itemOffset - window.innerHeight) || scrolled > (itemOffset + itemHeight.height)) return false;
      const _scroll = (scrolled - itemOffset) + itemHeight.height;
      _parallax.current.style.backgroundPosition = `50%  -${(_scroll * 0.1)}px`;
    };
    const _bgimage = `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/variation_background/${settings.background_image}`;
    const bgStyle = (settings && settings.background_image !== "") ? { backgroundImage: `url(${_bgimage})` } : {}
    return (
      <div 
          style={bgStyle}        
          className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding"
          ref={_parallax}>
          <div className="container">
        <HeadingElement dark={true} label={event.labels.EVENTSITE_ATTENDEES} desc={event.labels.EVENT_ATTENDEES_LOWER_HEAD} align={settings.text_align} />
      </div>
      {searchBar()}
      <div className="container">
        <div className="row d-flex edgtf-team-list-holder edgtf-team-info-on-hover">
          {/* Grid */}
          {attendees &&
            attendees.map((attendee, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-4 pl-0 pr-0 pb-0">
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
                              <Image
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
                              <h3 className="edgtf-team-name">
                                {attendee.first_name && attendee.first_name}{" "}
                                {attendee.last_name && attendee.last_name}
                              </h3>
                            </ActiveLink>
                          )}
                          {attendee.info &&
                            (attendee.info.company_name ||
                              attendee.info.title) && (
                              <div className="ebs-attendee-designation">
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
                          {
                            attendee.info &&
                            (attendee.info.facebook ||
                              attendee.info.twitter ||
                              attendee.info.linkedin ||
                              attendee.info.website) && (
                              <div className="edgtf-team-social-holder">
                                <div className="edgtf-team-social-holder-inner">
                                  <div className="edgtf-team-social-wrapp">
                                    <div className="social-icons">
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
                                          <span data-icon="&#xe0ab;"></span>
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

export default Variation9;
