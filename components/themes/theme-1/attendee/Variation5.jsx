import React from "react";
import Link from 'next/link'
import HeadingElement from "components/ui-components/HeadingElement";
import Image from 'next/image'

const Variation5 = ({ attendees,  searchBar, loadMore, event, settings, siteLabels }) => {
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container">
        <HeadingElement dark={false} label={event.labels.EVENTSITE_ATTENDEES} desc={event.labels.EVENT_ATTENDEES_LOWER_HEAD} align={settings.text_align} />
      </div>
      { searchBar()}
      <div className="container">
        <div className="row">
          {attendees &&
            attendees.map((attendee, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-4">
                <div style={{animationDelay: 50*i+'ms'}} className="speakerv5-wrapper ebs-animation-layer">
                  <div className="speakerv5-area text-center">
                    <div className="speakerv5-image">
                      <Link href={`/${event.url}/attendees/${attendee.id}`}>
                        <span className="gallery-img-wrapper-square">
                          <img
                            onLoad={(e) => e.target.style.opacity = 1} 
                            src={
                              attendee.image && attendee.image !== ""
                                ? process.env.REACT_APP_EVENTCENTER_URL +
                                  "/assets/attendees/" +
                                  attendee.image
                                : require("public/img/user-placeholder.jpg")
                            }
                            alt="g"
                          />
                        </span>
                      </Link>
                    </div>
                    {(attendee.first_name || attendee.last_name) && (
                      <Link href={`/${event.url}/attendees/${attendee.id}`}>
                        <h5>
                          {attendee.first_name && attendee.first_name}{" "}
                          {attendee.last_name && attendee.last_name}
                        </h5>
                      </Link>
                    )}
                    {attendee.info &&
                      (attendee.info.company_name || attendee.info.title) && (
                        <div className="ebs-attendee-designation">
                          {attendee.info.title && attendee.info.title}
                          {attendee.info.company_name && attendee.info.title && ", "}
                          {attendee.info.company_name &&
                            attendee.info.company_name}
                        </div>
                      )}

                    { attendee.email && (
                      <div className="ebs-email-phone">
                        <a
                          href={`mailto:${attendee.email}`}
                          className="edgtf-team-position"
                        >
                          {attendee.email}
                        </a>
                      </div>
                    )}
                    { attendee.phone && (
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
                        <div className="social-icons">
                          {attendee.info.facebook && (
                            <a
                              target="_blank"
                              href={`${attendee.info.facebook_protocol}${attendee.info.facebook}`}
                            >
                              <span data-icon="&#xe0aa;"></span>
                            </a>
                          )}
                          {attendee.info.twitter && (
                            <a
                              target="_blank"
                              href={`${attendee.info.twitter_protocol}${attendee.info.twitter}`}
                            >
                              <span data-icon="&#xe0ab;"></span>
                            </a>
                          )}
                          {attendee.info.linkedin && (
                            <a
                              target="_blank"
                              href={`${attendee.info.linkedin_protocol}${attendee.info.linkedin}`}
                            >
                              <span data-icon="&#xe0b4;"></span>
                            </a>
                          )}
                          {attendee.info.website && (
                            <a
                              target="_blank"
                              href={`${attendee.info.website_protocol}${attendee.info.website}`}
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
        { attendees.length === 0 && <div>{siteLabels.GENERAL_NO_RECORD}</div>}
        { attendees.length > 0 && loadMore()}
      </div>
    </div>
  );
};

export default Variation5;
