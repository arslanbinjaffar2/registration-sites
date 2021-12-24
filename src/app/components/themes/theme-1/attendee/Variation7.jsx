import React, { Component } from 'react';

export default class Variation7 extends Component {
    render() {
        const attendees = this.props.attendees;
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
                                    Our attendees </h2>
                                <h6
                                    style={{ fontSize: "16px", lineHeight: "1.5" }}
                                    className="edgtf-section-subtitle"
                                >
                                    A schedule at a glance is listed below. Check the program for
                                    this year's conference and learn about the attendees and
                                    sessions in store for tech enthusiasts. </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row d-flex algin-items-center">
                        {attendees && attendees.map((attendee, i) => <div key={i} style={{marginBottom: '30px'}} className="col-md-4">
                            <div style={{height: '100%',marginBottom: 0}} className="speakerv7-wrapper">
                                <div className="speakerv7-image">
                                    <span>
																		<img style={{width: '100%'}}  src={attendee.image && attendee.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/attendees/' + attendee.image : require('img/square.jpg')} alt="g"  />
                                    </span>
                                </div>
                                <div className="speakerv7-caption">
                                    <h3>{attendee.first_name} {attendee.last_name}</h3>
                                    <p>{attendee.email}</p>
                                    {attendee.info.phone && <div className="speakerv7-phone">
                                        <a href={`tel:${attendee.info.phone}`}>{attendee.info.phone}</a>
                                    </div>}
                                    <div className="d-flex">
                                        <div className="social-icons">
                                            {attendee.info.facebook && <a target="_blank" href={`${attendee.info.facebook_protocol}${attendee.info.facebook}`}><span data-icon="&#xe0aa;"></span></a>}
                                            {attendee.info.twitter && <a target="_blank" href={`${attendee.info.twitter_protocol}${attendee.info.twitter}`}><span data-icon="&#xe0ab;"></span></a>}
                                            {attendee.info.linkedin && <a target="_blank" href={`${attendee.info.linkedin_protocol}${attendee.info.linkedin}`}><span data-icon="&#xe0b1;"></span></a>}
                                            {attendee.info.website && <a target="_blank" href={`${attendee.info.website_protocol}${attendee.info.website}`}><span data-icon="&#xe0b7;"></span></a>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>
        );
    }
}
