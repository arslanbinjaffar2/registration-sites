import React, { Component } from 'react';
import { Scrollbars } from "react-custom-scrollbars";

const SpeakerDetail = ({ onClose }) => {
    return (
        <div className="wrapper-popup">
            <div className="container-popup speaker-popup">
                <div className="row d-flex m-0">
                    <div className="col-5 p-0">
                        <img
                            style={{ width: '100%' }}
                            src={require('img/square.jpg')}
                            alt="j"
                        />
                    </div>
                    <div className="col-7 p-0">
                        <div className="speaker-popup-detail">
                            <span onClick={onClose} className="btn_close_popup">
                                <i aria-hidden="true" data-icon="M"></i>
                            </span>
                            <h3>Stanley Willis</h3>
                            <h4>Executive Creative Director @ <strong>Fermentum Co</strong>.</h4>
                            <div className="social-icons">
                                <a href=""><i className="fa fa-2x fa-facebook-square"></i></a>
                                <a href=""><i className="fa fa-2x fa-twitter-square"></i></a>
                                <a href=""><i className="fa fa-2x fa-google-plus-square"></i></a>
                                <a href=""><i className="fa fa-2x fa-linkedin-square"></i></a>
                            </div>
                            <div className="description-area">
                                <Scrollbars style={{ width: '100%', height: 220 }}>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam, aut a harum soluta aliquam officiis quod, eius ipsum facilis recusandae? Cumque officiis nulla et?</p>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam, aut a harum soluta aliquam officiis quod, eius ipsum facilis recusandae? Cumque officiis nulla et?</p>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam, aut a harum soluta aliquam officiis quod, eius ipsum facilis recusandae? Cumque officiis nulla et?</p>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam, aut a harum soluta aliquam officiis quod, eius ipsum facilis recusandae? Cumque officiis nulla et?</p>
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
    };
    handleClose = e => {
        e.preventDefault();
        this.setState({
            popupDetail: false,
        });
    }
    handleOpenpopup = e => {
        e.preventDefault();
        this.setState({
            popupDetail: true,
        });
    }
    render() {
			const speakers = this.props.speakers;
        return (
            <div style={{ padding: "80px 0" }} className="module-section">
                {this.state.popupDetail && (
                    <SpeakerDetail onClose={this.handleClose.bind(this)} />
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
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/team-3-imge-1.jpg"
                                        alt="j"
                                        srcSet="https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/team-3-imge-1.jpg 800w, https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/team-3-imge-1-600x431.jpg 600w, https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/team-3-imge-1-300x216.jpg 300w, https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/team-3-imge-1-768x552.jpg 768w"
                                        sizes="(max-width: 800px) 100vw, 800px"
                                        width="800"
                                        height="575"
                                    />
                                    <div onClick={this.handleOpenpopup.bind(this)} className="caption">
                                        <span className="plus"></span>
                                    </div>
                                </div>
                                <div className="speakerv6-caption text-center">
                                    <h3>{ speaker.first_name} { speaker.last_name}</h3>
                                    <span
                                        style={{ display: "inline-block" }}
                                        className="edge-title-separator"
                                    ></span>
                                    <p>{ speaker.email}</p>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}
