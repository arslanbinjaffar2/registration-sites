import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import HeadingElement from "@/ui-components/HeadingElement";

const Variation4 = ({ speakers, listing, searchBar, loadMore, event, settings }) => {
  const _parallax = useRef(null); 
  const _bgimage =
    settings && settings.background_image !== ""
      ? `${process.env.REACT_APP_EVENTCENTER_URL}/assets/variation_background/${settings.background_image}`
      : require("img/h1-parallax1.jpg");
      useEffect(() => {
        window.addEventListener("scroll",scollEffect);
        return () => {
          window.removeEventListener("scroll",scollEffect);
        }
      }, [])
      
       function scollEffect () {
        const scrolled = window.pageYOffset;
        const itemOffset = _parallax.current.offsetTop;
        const itemHeight = _parallax.current.getBoundingClientRect();
        if (scrolled < (itemOffset - window.innerHeight) || scrolled > (itemOffset + itemHeight.height)) return false;
        _parallax.current.style.backgroundPosition = `50%  -${(scrolled * 0.08)}px`;;
      };
  return (
    <div
      style={{
        backgroundImage: `url(${_bgimage})`,
        padding: "50px 0",
      }}
      className="edgtf-parallax-section-holder"
      ref={_parallax}
    >
      <div className="container">
      <HeadingElement dark={true} label={event.labels.EVENTSITE_SPEAKERS} desc={event.labels.EVENTSITE_AMAZING_SPEAKERS} align={settings.text_align} />
        </div>
        {listing && searchBar()}
        <div className="container">
          <div className="row d-flex edgtf-team-list-holder edgtf-team-info-on-hover ebs-team-vairation-9">
            {/* Grid */}
            {speakers &&
              speakers.map((speaker, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 pb-4">
                  <div style={{animationDelay: 50*i+'ms'}} className="edgtf-team-list-holder-inner info_box ebs-animation-layer">
                    <div
                      style={{ width: "100%" }}
                      className="edgtf-team edgtf-team-light"
                    >
                      <div className="edgtf-team-inner">
                        <div className="edgtf-team-image">
                          <Link to={`/${event.url}/speakers/${speaker.id}`}>
                            <span className="gallery-img-wrapper-square">
                              <img
                                onLoad={(e) => e.target.style.opacity = 1} 
                                src={
                                  speaker.image && speaker.image !== ""
                                    ? process.env.REACT_APP_EVENTCENTER_URL +
                                      "/assets/attendees/" +
                                      speaker.image
                                    : require("img/user-placeholder.jpg")
                                }
                                alt="g"
                              />
                            </span>
                          </Link>
                        </div>
                        {/* Description */}
                        <div className="edgtf-team-info">
                          <div className="edgtf-team-title-holder">
                            {(speaker.first_name || speaker.last_name) && (
                              <Link to={`/${event.url}/speakers/${speaker.id}`}>
                                <h3 style={{lineHeight: 1}} className="edgtf-team-name">
                                  {speaker.first_name && speaker.first_name}{" "}
                                  {speaker.last_name && speaker.last_name}
                                </h3>
                              </Link>
                            )}
                            {speaker.info &&
                              (speaker.info.company_name ||
                                speaker.info.title) && (
                                <div style={{paddingBottom: 4}} className="ebs-attendee-designation">
                                  <span className="edgtf-team-position">
                                    {speaker.info.title && speaker.info.title}
                                    {speaker.info.company_name &&
                                      speaker.info.title &&
                                      ", "}
                                    {speaker.info.company_name &&
                                      speaker.info.company_name}
                                  </span>
                                </div>
                              )}
                            <div className="d-flex ebs-box-bottom">
                              <div className="col-6">
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
                              </div>
                              <div className="col-6">
                                {listing &&
                                speaker.info &&
                                (speaker.info.facebook ||
                                  speaker.info.twitter ||
                                  speaker.info.linkedin ||
                                  speaker.info.website) && (
                                  <div className="edgtf-team-social-holder">
                                    <div className="edgtf-team-social-holder-inner">
                                      <div className="edgtf-team-social-wrapp">
                                        <div className="social-icons text-right">
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
          {listing && speakers.length === 0 && <div>No Speakers Found...</div>}
          {listing && speakers.length > 0 && loadMore()}
        </div>
      </div>
  );
};

export default Variation4;
