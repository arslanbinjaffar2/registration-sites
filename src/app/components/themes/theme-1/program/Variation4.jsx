import React, { Component } from 'react'
import moment from "moment";

export default class Variation4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
    }
    render() {
        const {activeIndex, tabIndex } = this.state;
        const {programs} = this.props;
        return (
            <div style={{ padding: '80px 0' }} className="module-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <div style={{ marginBottom: '30px' }} className="edgtf-title-section-holder">
                                <h2 className="edgtf-title-with-dots edgtf-appeared">
                                    Event Schedule </h2>
                                <h6 style={{ fontSize: '16px', lineHeight: '1.5' }} className="edgtf-section-subtitle">A schedule at a glance is listed below. Check the program for this year's conference and learn about the speakers and sessions in store for tech enthusiasts.</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                {programs && ( <div className="schedulev4-wrapper">
                        <div className="schedule-tab-wrapper">
                            <ul>
                            {programs && programs.length > 0 && programs.map((element, k) =>
                                    <li key={k}>
                                        <a style={{ pointerEvents: k === activeIndex ? 'none' : '' }} onClick={() => this.setState({ tabIndex: 0, activeIndex: k })} className={k === activeIndex ? 'active' : ''} href="#!">
                                            {moment(new Date(element[0].start_date)).format(
                                                "DD MMM"
                                            )}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="schedule-content-wrapper">
                            <div className="schdedule-target">
                                <div className="schdedule-accordion">
                                {programs[activeIndex] && programs[activeIndex].map((element, k) =>
                                    (<div className="schdedule-accordion-wrapper">
                                        <div className="sc-accordion-content">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="sc-left-description">
                                                        {element.info.topic && (<h4 >{element.info.topic}</h4>)}
                                                        {element.info.description && (<p >{element.info.description}</p>)}
                                                        {element.speakers && element.speakers.length > 0 && <div className="schedule-info">
                                                        {element.speakers.map((speaker, k) =>(<ul>
                                                                <li className="time"><span className="icon_clock_alt "></span>12:30 am – 14:30 am</li>
                                                                <li className="speakername"><span className="icon_mic_alt "></span>Jhonny Bravo</li>
                                                                <li className="designation">CEO</li>
                                                            </ul>
                                                        ))}
                                                        </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        )
    }
}
