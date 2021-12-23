import React, { Component } from 'react';
import moment from "moment";

export default class Variation2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            tabIndex: 0
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
                    {programs && (<div className="schedulev2-wrapper">
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
                                    (<div key={k} className="schdedule-accordion-wrapper">
                                        <div onClick={() => this.setState({ tabIndex: k })} className="sc-accordion-header">
                                            <div className="row align-item-center">
                                                <div className="col-2">
                                                    <div className="sc-time">
                                                        <i className="fa fa-clock-o"></i> {" "}
                                                        {moment(element.start_time, "HH:mm:ss").format("HH:mm")}
                                                        –
                                                        {moment(element.info.end_time, "HH:mm:ss").format("HH:mm")}
                                                    </div>
                                                </div>
                                                <div className="col-10">
                                                    <h4>
                                                        {element.info.topic}
                                                        <i className={k === tabIndex ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        {k === tabIndex && <div style={{ display: 'block' }} className="sc-accordion-content">
                                            <div className="row">
                                                <div className="col-2"></div>
                                                <div className="col-10">
                                                    {element.info.description && (
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: element.info.description,
                                                            }}
                                                        />
                                                    )}
                                                    {element.speakers && element.speakers.length > 0 && <div className="d-flex row mt-4">
                                                        <div className="col-12 mb-3"><h5>SPEAKERS</h5></div>
                                                        {element.speakers.map((speaker, k) =>
                                                            <div key={k} className="sc-speaker-container col-md-3 col-sm-4 col-xs-6">
                                                                <img
                                                                    src={speaker.image && speaker.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/attendees/' + speaker.image : require('img/square.jpg')}
                                                                    alt="" />
                                                                <div className="cs-speaker-name">
                                                                    {speaker.first_name && speaker.first_name} {" "}
                                                                    {speaker.last_name && speaker.last_name}
                                                                </div>
                                                                {speaker.email && <div className="cs-speaker-description">{speaker.email}</div>}
                                                            </div>)}
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>}
                                    </div>))}
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        )
    }
}
