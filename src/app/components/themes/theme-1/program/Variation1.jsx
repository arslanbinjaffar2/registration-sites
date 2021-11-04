import * as React from "react";
import moment from "moment";

class Variation1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      activeIndex: 0,
    };
  }
  componentDidMount() {
    this.setState(
      {
        data: this.props.programs ? this.props.programs.slice(0, 5) : null,
      },
      () => {
        console.log(this.state.data);
      }
    );
  }
  render() {
    const {data, activeIndex} = this.state;
    return (
      <React.Fragment>
        {data && (
          <div style={{padding: "80px 0"}} className="module-section">
            <div className="container">
              <div className="edgtf-tabs edgtf-horizontal-tab edgtf-tab-without-icon clearfix ui-tabs ui-widget ui-widget-content ui-corner-all">
                <ul className="edgtf-tabs-nav ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                  {data.map((element, k) => (
                    <li
                      key={k}
                      className={`ui-state-default ui-corner-top ${
                        k === activeIndex && "ui-tabs-active ui-state-active"
                      }`}>
                      <a href="#!" onClick={() => this.setState({activeIndex: k})} className="ui-tabs-anchor">
                        <span className="edgtf-tab-text-after-icon">
                          {moment(new Date(element[0].start_date)).format(
                            "DD MMM"
                          )}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div
                  style={{paddingTop: "0"}}
                  className="edgtf-tab-container ui-tabs-panel ui-widget-content ui-corner-bottom">
                  {data[activeIndex] &&
                    data[activeIndex].map((element, k) => (
                      <React.Fragment key={k}>
                        <div
                          style={{
                            backgroundColor:
                              k % 2 !== 0 ? "#f9f9f9" : "transparent",
                          }}
                          className="section-element-holder pb-4 pt-3">
                          <div className="row d-flex align-items-top">
                            <div className="col-12 col-md-3 col-lg-2 text-center">
                              <h4 className="mt-3 mb-4">
                                <span style={{color: "#808080"}}>
                                  {moment(element.start_time, "HH:mm:ss").format("HH:mm")}
                                  –
                                  {moment(element.detail.end_time,"HH:mm:ss").format("HH:mm")}
                                </span>
                              </h4>
                            </div>
                            <div className="col-12 col-md-9 col-lg-10">
                              <div className="edgtf-elements-holder-item-content">
                                {element.detail.topic && (
                                  <h4 className="mt-3 mb-4">
                                    {element.detail.topic}
                                  </h4>
                                )}
                                {element.detail.description && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: element.detail.description,
                                    }}
                                  />
                                )}

                                {element.program_speakers && element.program_speakers.length > 0 && <div
                                  style={{marginTop: "35px"}}
                                  className="edgtf-team-list-holder edgtf-team-info-in-tooltip"
                                  data-type="info_in_tooltip"
                                  data-order-by="date"
                                  data-order="ASC"
                                  data-category="team-2">
                                  <div className="edgtf-tl-inner clearfix">

                                    {element.program_speakers.map((speaker,k) =>
																			<div key={k} className="edgtf-team">
																				<div
																					className="edgtf-team-inner"
																					data-member-id="9058">
																					<div className="edgtf-team-image">
																						<img
																						src={speaker.image && speaker.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/attendees/' + speaker.image : require('img/square.jpg')}
																							className="attachment-81x81 size-81x81 wp-post-image"
																							alt="v"
																							width="81"
																							height="81"
																						/>
																					</div>
																					<div className="edgtf-team-info">
																						<div className="edgtf-team-title-holder">
																							<h6 className="edgtf-team-name">
																								{speaker.first_name && speaker.first_name} {" "}
																								{speaker.last_name && speaker.last_name}
																							</h6>
																						</div>
																					</div>
																				</div>
																			</div>
																		 )}
                                  </div>
                                </div>}
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
                            }} />
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
  }
}

export default Variation1;
