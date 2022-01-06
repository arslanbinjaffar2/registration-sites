import React from "react";

const Variation6 = ({ attendees }) => {
  return (
    <div>
      <div style={{ padding: "80px 0" }} className="module-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div
                style={{ marginBottom: "30px" }}
                className="edgtf-title-section-holder"
              >
                <h2 className="edgtf-title-with-dots edgtf-appeared">
                  Our attendees
                </h2>
                <span class="edge-title-separator edge-enable-separator"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex algin-items-center">
            {attendees &&
              attendees.map((attendee, i) => (
                <div key={i} className="col-md-3">
                  <div className="speakerv6-wrapper">
                    <div className="speakerv6-image">
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
                      <div className="caption">
                        <span className="plus"></span>
                      </div>
                    </div>
                    <div className="speakerv6-caption">
                      <h3>{attendee.first_name} {attendee.last_name}</h3>
                      <span style={{ display: "inline-block" }} className="edge-title-separator"></span>
                      <div className="ebs-attendee-designation">
												Technical Manager Welltec
											</div>
											<div className="ebs-email-phone">
											<span data-icon="&#xe076;"></span>
												<a href={`mailto:${attendee.email}`} className="edgtf-team-position">
													{attendee.email}
												</a>
											</div>
											<div className="ebs-email-phone">
											<span data-icon="&#xe090;"></span>
												<a href={`tel: +78-54-897666`} className="edgtf-team-position">
													+78-54-897666
												</a>
											</div>
											<div className="social-icons">
												<a target="_blank" href="#!"><span data-icon="&#xe0aa;"></span></a>
												<a target="_blank" href="#!"><span data-icon="&#xe0ab;"></span></a>
												<a target="_blank" href="#!"><span data-icon="&#xe0b1;"></span></a>
												<a target="_blank" href="#!"><span data-icon="&#xe0b7;"></span></a>
											</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation6;
