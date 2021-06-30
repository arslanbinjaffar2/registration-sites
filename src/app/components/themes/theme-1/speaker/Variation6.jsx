import React, { Component } from 'react';
import { Scrollbars } from "react-custom-scrollbars";

const SpeakerDetail = ({ data, onClose }) => {
    return (
        <div className="wrapper-popup">
            <div className="container-popup speaker-popup">
                <div className="row d-flex m-0">
                    <div className="col-5 p-0">
										<img style={{width: '100%'}}  src={data.image && data.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/attendees/' + data.image : require('img/square.jpg')} alt="g"  />
                    </div>
                    <div className="col-7 p-0">
                        <div className="speaker-popup-detail">
                            <span onClick={onClose} className="btn_close_popup">
                                <i aria-hidden="true" data-icon="M"></i>
                            </span>
                            <h3>{data.first_name} {data.last_name}</h3>
                            {data.info.company_name && <h4><strong>{data.info.company_name}</strong></h4>}
                            <div className="social-icons">
																{data.info.twitter && 
																<a target="_blank" href={`${data.info.twitter_protocol}${data.info.twitter}`}><i className="fa fa-2x fa-twitter-square"></i></a>}
																{data.info.facebook && 
																<a target="_blank" href={`${data.info.facebook_protocol}${data.info.facebook}`}><i className="fa fa-2x fa-facebook-square"></i></a>}
																{data.info.linkedin && 
																<a target="_blank" href={`${data.info.linkedin_protocol}${data.info.linkedin}`}><i className="fa fa-2x fa-linkedin-square"></i></a>}
																{data.info.website && 
																<a target="_blank" href={`${data.info.website_protocol}${data.info.website}`}><i className="fa fa-2x fa-external-link"></i></a>}
                            </div>
                            <div className="description-area">
                                <Scrollbars style={{ width: '100%', height: 220 }}>
                                    <div dangerouslySetInnerHTML={{__html: data.info.about}} />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default class Variation6 extends Component {
    state = {
        popupDetail: false,
				popupData: null
    };
    handleClose = e => {
        e.preventDefault();
        this.setState({
            popupDetail: false,
        });
    }
    handleOpenpopup = (e,data) => {
        e.preventDefault();
        this.setState({
            popupDetail: true,
						popupData: data
        });
    }
    render() {
        const speakers = this.props.speakers;
        return (
            <div style={{ padding: "80px 0" }} className="module-section">
                {this.state.popupDetail && (
                    <SpeakerDetail data={this.state.popupData} onClose={this.handleClose.bind(this)} />
                )}
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
                                <h6 style={{ fontSize: "16px", lineHeight: "1.5" }}
                                    className="edgtf-section-subtitle">
                                    A schedule at a glance is listed below. Check the program for
                                    this year's conference and learn about the speakers and
                                    sessions in store for tech enthusiasts.
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row d-flex algin-items-center">
                        {speakers && speakers.map((speaker, i) => <div key={i} className="col-md-3">
                            <div className="speakerv6-wrapper">
                                <div className="speakerv6-image">
																<img style={{width: '100%'}}  src={speaker.image && speaker.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/attendees/' + speaker.image : require('img/square.jpg')} alt="g"  />
                                    <div onClick={(e) => this.handleOpenpopup(e,speaker)} className="caption">
                                        <span className="plus"></span>
                                    </div>
                                </div>
                                <div className="speakerv6-caption text-center">
                                    <h3>{speaker.first_name} {speaker.last_name}</h3>
                                    <span
                                        style={{ display: "inline-block" }}
                                        className="edge-title-separator"
                                    ></span>
                                    <p>{speaker.email}</p>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}
