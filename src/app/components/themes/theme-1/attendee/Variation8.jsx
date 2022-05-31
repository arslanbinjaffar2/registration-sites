import React from "react";
import { Link } from "react-router-dom";
const Variation8 = ({ attendees, searchBar, loadMore, event }) => {
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <div
              style={{ marginBottom: "30px" }}
              className="edgtf-title-section-holder"
            >
              <h2 className="edgtf-title-with-dots edgtf-appeared">
                {event.labels.EVENT_ATTENDEES}
              </h2>
              <h6
                style={{ fontSize: "16px", lineHeight: "1.5" }}
                className="edgtf-section-subtitle"
              >
                {event.labels.EVENT_ATTENDEES_LOWER_HEAD}
              </h6>
            </div>
          </div>
        </div>
      </div>
      {searchBar()}
      <div className="container">
        <div className="row d-flex algin-items-center">
          {attendees &&
            attendees.map((attendee, i) => (
              <div
                key={i}
                style={{ marginBottom: "30px" }}
                className="col-md-4"
              >
                <div
                  style={{ height: "100%", marginBottom: 0 }}
                  className="speakerv7-wrapper"
                >
                  <div className="speakerv7-image">
                    <span>
                      <Link to={`/${event.url}/attendees/${attendee.id}`}>
                        <img
                          style={{ width: "100%" }}
                          src={
                            attendee.image && attendee.image !== ""
                              ? process.env.REACT_APP_EVENTCENTER_URL +
                                "/assets/attendees/" +
                                attendee.image
                              : require("img/square.jpg")
                          }
                          alt="g"
                        />
                      </Link>
                    </span>
                  </div>
                  <div className="speakerv7-caption">
                    {(attendee.first_name || attendee.last_name) && (
                      <Link to={`/${event.url}/attendees/${attendee.id}`}>
                        <h3>
                          {attendee.first_name && attendee.first_name}{" "}
                          {attendee.last_name && attendee.last_name}
                        </h3>
                      </Link>
                    )}
                    {attendee.info &&
                      (attendee.info.company_name || attendee.info.title) && (
                        <p>
                          {attendee.info.title && attendee.info.title}
                          {attendee.info.title &&
                            attendee.info.company_name && <br />}
                          {attendee.info.company_name &&
                            attendee.info.company_name}
                        </p>
                      )}
                    {attendee.email && (
                      <div className="email">
                        <a href={`mailto:${attendee.email}`}>
                          {attendee.email}
                        </a>
                      </div>
                    )}

                    {attendee.phone && (
                      <div className="speakerv7-phone">
                        <a href={`tel:${attendee.phone}`}>{attendee.phone}</a>
                      </div>
                    )}
                    {attendee.info &&
                      (attendee.info.facebook ||
                        attendee.info.twitter ||
                        attendee.info.linkedin ||
                        attendee.info.website) && (
                        <div className="d-flex">
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
                                <span data-icon="&#xe0b1;"></span>
                              </a>
                            )}
                            {attendee.info.website && (
                              <a
                                target="_blank"
                                href={`${attendee.info.website_protocol}${attendee.info.website}`}
                              >
                                <span data-icon="&#xe0b7;"></span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {attendees.length === 0 && <div>No Attendees Found...</div>}
        {attendees.length > 0 && loadMore()}
      </div>
    </div>
  );
};

export default Variation8;
