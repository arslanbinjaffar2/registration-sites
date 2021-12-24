import React, { Component } from 'react'

export default class Variation5 extends Component {
    render() {
        const attendees = this.props.attendees;
        console.log(attendees)
        return (
            <div style={{ padding: '80px 0' }} className="module-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <div style={{ marginBottom: '30px' }} className="edgtf-title-section-holder">
                                <h2 className="edgtf-title-with-dots edgtf-appeared">
                                    Our attendees </h2>
                                <h6 style={{ fontSize: '16px', lineHeight: '1.5' }} className="edgtf-section-subtitle">A schedule at a glance is listed below. Check the program for this year's conference and learn about the attendees and sessions in store for tech enthusiasts.</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {attendees && attendees.map((attendee, i) => <div key={i} className="col-4">
                            <div className="speakerv5-wrapper">
                                <div className="speakerv5-area text-center">
                                    <div className="speakerv5-image">
                                         <img style={{width: '100%'}}  src={attendee.image && attendee.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/attendees/' + attendee.image : require('img/square.jpg')} alt="g"  />
                                        <h5>{attendee.first_name} {attendee.last_name}</h5>
                                        <span className="sc-desciption">{attendee.email}</span>
                                    </div>
                                    <div className="speakerv5-caption">
                                        <h5>{attendee.first_name} {attendee.last_name}</h5>
                                        <span className="sc-desciption">{attendee.email}</span>
                                        <p>{attendee.info.about ? attendee.info.about : '' }</p>
                                        <div className="sc-social">
                                            {attendee.info.twitter && <a target="_blank" href={`${attendee.info.twitter_protocol}${attendee.info.twitter}`}><i className="fa fa-twitter-square"></i></a>}
                                            {attendee.info.facebook && <a target="_blank" href={`${attendee.info.facebook_protocol}${attendee.info.facebook}`}><i className="fa fa-facebook-square"></i></a>}
                                            {attendee.info.linkedin && <a target="_blank" href={`${attendee.info.linkedin_protocol}${attendee.info.linkedin}`}><i className="fa fa-linkedin-square"></i></a>}
                                            {attendee.info.website && <a target="_blank" href={`${attendee.info.website_protocol}${attendee.info.website}`}><i className="fa fa-external-link"></i></a>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        )
    }
}
