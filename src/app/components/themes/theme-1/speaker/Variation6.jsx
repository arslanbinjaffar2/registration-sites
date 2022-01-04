import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";

const SpeakerDetail = ({ data, onClose }) => {
  return (
    <div className="wrapper-popup">
      <div className="container-popup speaker-popup">
        <div className="row d-flex m-0">
          <div className="col-5 p-0">
            <img
              style={{ width: "100%" }}
              src={
                data.image && data.image !== ""
                  ? process.env.REACT_APP_EVENTCENTER_URL +
                    "/assets/attendees/" +
                    data.image
                  : require("img/square.jpg")
              }
              alt="g"
            />
          </div>
          <div className="col-7 p-0">
            <div className="speaker-popup-detail">
              <span onClick={onClose} className="btn_close_popup">
                <i aria-hidden="true" data-icon="M"></i>
              </span>
              <h3>
                {data.first_name} {data.last_name}
              </h3>
              {data.info.company_name && (
                <h4>
                  <strong>{data.info.company_name}</strong>
                </h4>
              )}
              <div className="social-icons">
                {data.info.twitter && (
                  <a
                    target="_blank"
                    href={`${data.info.twitter_protocol}${data.info.twitter}`}
                  >
                    <i className="fa fa-2x fa-twitter-square"></i>
                  </a>
                )}
                {data.info.facebook && (
                  <a
                    target="_blank"
                    href={`${data.info.facebook_protocol}${data.info.facebook}`}
                  >
                    <i className="fa fa-2x fa-facebook-square"></i>
                  </a>
                )}
                {data.info.linkedin && (
                  <a
                    target="_blank"
                    href={`${data.info.linkedin_protocol}${data.info.linkedin}`}
                  >
                    <i className="fa fa-2x fa-linkedin-square"></i>
                  </a>
                )}
                {data.info.website && (
                  <a
                    target="_blank"
                    href={`${data.info.website_protocol}${data.info.website}`}
                  >
                    <i className="fa fa-2x fa-external-link"></i>
                  </a>
                )}
              </div>
              <div className="description-area">
                <Scrollbars style={{ width: "100%", height: 220 }}>
                  <div dangerouslySetInnerHTML={{ __html: data.info.about }} />
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Variation6 = ({ speakers }) => {
  const [popupData, setPopupData] = useState(null);
  const [popupDetail, setPopupDetail] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    setPopupDetail(false);
  };
  const handleOpenpopup = (e, data) => {
    e.preventDefault();
    setPopupData(data);
    setPopupDetail(true);
  };

  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      {popupDetail && <SpeakerDetail data={popupData} onClose={handleClose} />}
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <div
              style={{ marginBottom: "30px" }}
              className="edgtf-title-section-holder"
            >
              <h2 className="edgtf-title-with-dots edgtf-appeared">
                Our Speakers
              </h2>
              <h6
                style={{ fontSize: "16px", lineHeight: "1.5" }}
                className="edgtf-section-subtitle"
              >
                A schedule at a glance is listed below. Check the program for
                this year's conference and learn about the speakers and sessions
                in store for tech enthusiasts.
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex algin-items-center">
          {speakers &&
            speakers.map((speaker, i) => (
              <div key={i} className="col-md-3">
                <div className="speakerv6-wrapper">
                  <div className="speakerv6-image">
                    <img
                      style={{ width: "100%" }}
                      src={
                        speaker.image && speaker.image !== ""
                          ? process.env.REACT_APP_EVENTCENTER_URL +
                            "/assets/attendees/" +
                            speaker.image
                          : require("img/square.jpg")
                      }
                      alt="g"
                    />
                    <div
                      onClick={(e) => handleOpenpopup(e, speaker)}
                      className="caption"
                    >
                      <span className="plus"></span>
                    </div>
                  </div>
                  <div className="speakerv6-caption text-center">
                    <h3>
                      {speaker.first_name} {speaker.last_name}
                    </h3>
                    <span
                      style={{ display: "inline-block" }}
                      className="edge-title-separator"
                    ></span>
                    <p>{speaker.email}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Variation6;
