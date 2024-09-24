import React, { useEffect, useRef } from "react";
import ActiveLink from "components/atoms/ActiveLink";
import HeadingElement from "components/ui-components/HeadingElement";
import Image from 'next/image'

const Variation1 = ({ speakers, listing, searchBar, loadMore, event, settings, siteLabels }) => {

  const _bgimage = `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/variation_background/${settings.background_image}`;

  const bgStyle = (settings && settings.background_image !== "") ? { backgroundImage: `url(${_bgimage})` } : {}

  return (
    <div style={bgStyle}
    >
      {!listing && <div className="container">
        <HeadingElement dark={false} label={event.labels.EVENTSITE_SPEAKERS} desc={event.labels.EVENTSITE_AMAZING_SPEAKERS} align={settings.text_align} />
      </div>}
      {listing && searchBar()}
      <div className="container">
        <div className={`row ebs-speaker-variation-v1 d-flex edgtf-team-list-holder edgtf-team-info-below-image ${!listing ? 'justify-content-center' : ''}`}>
          {/* Grid */}

          {speakers &&
            speakers.map((speaker, i) => {
              return (
                <div key={i} className="col-12 col-sm-6 col-md-4 pl-0 pr-0">
                  <div style={{ animationDelay: 50 * i + 'ms' }} className="edgtf-team-list-holder-inner info_box ebs-animation-layer">
                    <div className="edgtf-team edgtf-team-dark mb-3 w-100">
                      <div className="edgtf-team-inner">
                        <div className="edgtf-team-image">
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
                            <div className="edgtf-team-social-holder d-flex align-items-center justify-content-center">
                               <div>
                                {
                                 speaker.info &&
                                 (speaker.info.facebook ||
                                   speaker.info.twitter ||
                                   speaker.info.linkedin ||
                                   speaker.info.website) && (
                                   <div className="edgtf-team-social-holder-between">
                                     <div className="edgtf-team-social">
                                       <div className="edgtf-team-social-inner">
                                         <div className="edgtf-team-social-wrapp">
                                           <div className="social-icons">
                                             {speaker.info.facebook && (
                                               <a
                                                 target="_blank" className="fs-16" rel="noreferrer"
                                                 href={`${speaker.info.facebook_protocol}${speaker.info.facebook}`}
                                               >
                                                 <i className="fa-brands fa-facebook-f"></i>
                                               </a>
                                             )}
                                             {speaker.info.twitter && (
                                               <a
                                                 target="_blank" className="fs-16" rel="noreferrer"
                                                 href={`${speaker.info.twitter_protocol}${speaker.info.twitter}`}
                                               >
                                                 <span className="fa-brands fa-x-twitter"></span>
                                               </a>
                                             )}
                                             {speaker.info.linkedin && (
                                               <a
                                                 target="_blank" className="fs-16" rel="noreferrer"
                                                 href={`${speaker.info.linkedin_protocol}${speaker.info.linkedin}`}
                                               >
                                                 <i class="fa-brands fa-linkedin-in"></i>
                                               </a>
                                             )}
                                             {speaker.info.website && (
                                               <a
                                                 target="_blank" className="fs-16" rel="noreferrer"
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
                                 )}
                               </div>
                            </div>
                          </ActiveLink>
                        </div>
                        {/* Description */}
                        <div className="edgtf-team-info">
                          <div className="edgtf-team-title-holder">
                            {(speaker.first_name || speaker.last_name) && (
                              <ActiveLink href={`/${event.url}/speakers/${speaker.id}`}>
                                <h3 className="edgtf-team-name">
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
                              (speaker.info.company_name ||
                                speaker.info.title) && (
                                <div className="ebs-attendee-designation text-primary">
                                  {speaker.info.title && speaker.info.title}

                                  {speaker.info.company_name &&
                                    speaker.info.title &&
                                    ", "}
                                  {speaker.info.company_name &&
                                    speaker.info.company_name}
                                </div>
                              )}
                            {listing && <div className="ebs-border-wrapp">
                              {speaker.email && listing && (
                                <div className="ebs-email-phone">
                                  <a
                                    href={`mailto:${speaker.email}`}
                                    className="edgtf-team-position"
                                  >
                                    {speaker.email}
                                  </a>
                                </div>
                              )}
                              {speaker.phone && listing && (
                                <div className="ebs-email-phone">
                                  <a
                                    href={`tel: ${speaker.phone}`}
                                    className="edgtf-team-position"
                                  >
                                    {speaker.phone}
                                  </a>
                                </div>
                              )}
                            </div>}
                          </div>
                         
                        </div>
                        {/* Description */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Grid */}
        </div>
        {listing && speakers.length === 0 && <div>{siteLabels.GENERAL_NO_RECORD}</div>}
        {listing && speakers.length > 0 && loadMore()}
      </div>
    </div>
  );
};

export default Variation1;
