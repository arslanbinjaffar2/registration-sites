import React from "react";

const Variation5 = ({ attendees }) => {
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <div
              style={{ marginBottom: "30px" }}
              className="edgtf-title-section-holder"
            >
              <h2 className="edgtf-title-with-dots edgtf-appeared">
                Our attendees{" "}
              </h2>
              <span class="edge-title-separator edge-enable-separator"></span>
              <h6
                style={{ fontSize: "16px", lineHeight: "1.5" }}
                className="edgtf-section-subtitle"
              >
                A schedule at a glance is listed below. Check the program for
                this year's conference and learn about the attendees and
                sessions in store for tech enthusiasts.
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {attendees &&
            attendees.map((attendee, i) => (
              <div key={i} className="col-4">
                <div className="speakerv5-wrapper">
                  <div className="speakerv5-area text-center">
                    <div className="speakerv5-image">
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
                    </div>
                      <h5>
                        {attendee.first_name} {attendee.last_name}
                      </h5>
                      <div className="ebs-attendee-designation">
                        Technical Manager Welltec
                      </div>
                      <div className="ebs-email-phone">
                        <a href={`mailto:${attendee.email}`} className="edgtf-team-position">
                          {attendee.email}
                        </a>
                      </div>
                      <div className="ebs-email-phone">
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
  );
};

export default Variation5;
