import moment from "moment";
import React from "react";
import { useState } from "react";
import Image from 'next/image'

const Variation1 = ({ programs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <React.Fragment>
      {programs && (
        <div style={{ padding: "80px 0" }} className="module-section">
          <div className="container">
            <div className="edgtf-tabs edgtf-horizontal-tab edgtf-tab-without-icon clearfix ui-tabs ui-widget ui-widget-content ui-corner-all">
              <ul className="edgtf-tabs-nav ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                {programs.map((element, k) => (
                  <li
                    key={k}
                    className={`ui-state-default ui-corner-top ${k === activeIndex && "ui-tabs-active ui-state-active"
                      }`}
                  >
                    <a
                      href="#!"
                      onClick={() => setActiveIndex(k)}
                      className="ui-tabs-anchor"
                    >
                      <span className="edgtf-tab-text-after-icon">
                        {moment(new Date(element[0].date)).format("DD MMM")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div
                style={{ paddingTop: "0" }}
                className="edgtf-tab-container ui-tabs-panel ui-widget-content ui-corner-bottom"
              >
                {programs[activeIndex] &&
                  programs[activeIndex].map((element, k) => (
                    <React.Fragment key={k}>
                      <div
                        style={{
                          backgroundColor:
                            k % 2 !== 0 ? "#f9f9f9" : "transparent",
                        }}
                        className="section-element-holder pb-4 pt-3"
                      >
                        <div className="row d-flex align-items-top">
                          <div className="col-12 col-md-3 col-lg-2 text-center">
                            <h4 className="mt-3 mb-4">
                              <span style={{ color: "#808080" }}>
                                {moment(element.start_time, "HH:mm:ss").format(
                                  "HH:mm"
                                )}
                                –
                                {moment(element.end_time, "HH:mm:ss").format(
                                  "HH:mm"
                                )}
                              </span>
                            </h4>
                          </div>
                          <div className="col-12 col-md-9 col-lg-10">
                            <div className="edgtf-elements-holder-item-content">
                              {element.topic && (
                                <h4 className="mt-3 mb-4">{element.topic}</h4>
                              )}
                              {element.description && (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: element.description,
                                  }}
                                />
                              )}

                              {element.speakers && element.speakers.length > 0 && (
                                <div
                                  style={{ marginTop: "35px" }}
                                  className="edgtf-team-list-holder edgtf-team-info-in-tooltip"
                                  data-type="info_in_tooltip"
                                  data-order-by="date"
                                  data-order="ASC"
                                  data-category="team-2"
                                >
                                  <div className="edgtf-tl-inner clearfix">
                                    {element.speakers.map((speaker, k) => (
                                      <div key={k} className="edgtf-team">
                                        <div
                                          className="edgtf-team-inner"
                                          data-member-id="9058"
                                        >
                                          <div className="edgtf-team-image">
                                            {speaker.image &&
                                              speaker.image !== "" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_EVENTCENTER_URL +
                                                  "/assets/attendees/" +
                                                  speaker.image
                                                }
                                                className="attachment-81x81 size-81x81 wp-post-image"
                                                alt="v"
                                                width="81"
                                                height="81"
                                              />
                                            ) : (
                                              <Image
                                                src={
                                                  require("public/img/square.jpg")
                                                }
                                                className="attachment-81x81 size-81x81 wp-post-image"
                                                alt="v"
                                                width="81"
                                                height="81"
                                              />
                                            )}
                                          </div>
                                          <div className="edgtf-team-info">
                                            <div className="edgtf-team-title-holder">
                                              <h6 className="edgtf-team-name">
                                                {speaker.first_name &&
                                                  speaker.first_name}{" "}
                                                {speaker.last_name &&
                                                  speaker.last_name}
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Separator */}
                      <div className="edgtf-separator-holder clearfix  edgtf-separator-center">
                        <div
                          className="edgtf-separator"
                          style={{
                            borderColor: " #e5e5e5",
                            borderStyle: "dashed",
                            margin: "0",
                            width: "100%",
                          }}
                        />
                      </div>
                      {/* Separator */}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Variation1;
