import React, { Component } from 'react';

export default class Variation7 extends Component {
    render() {
        const speakers = this.props.speakers;
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
                                    Our Speakers </h2>
                                <h6
                                    style={{ fontSize: "16px", lineHeight: "1.5" }}
                                    className="edgtf-section-subtitle"
                                >
                                    A schedule at a glance is listed below. Check the program for
                                    this year's conference and learn about the speakers and
                                    sessions in store for tech enthusiasts. </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row d-flex algin-items-center">
                        {speakers && speakers.map((speaker, i) => <div key={i} className="col-md-4">
                            <div className="speakerv7-wrapper">
                                <div className="speakerv7-image">
                                    <span>
                                        <img
                                            src={require('img/square.jpg')}
                                            alt="j"
                                        />
                                    </span>
                                </div>
                                <div className="speakerv7-caption">
                                    <h3>{speaker.first_name} {speaker.last_name}</h3>
                                    <p>{speaker.email}</p>
                                    <div className="speakerv7-phone">
                                        <a href="tel:+923317145536">+92 03317145536</a>
                                    </div>
                                    <div className="d-flex">
                                        <div className="social-icons">
                                            <a href=""><span data-icon="&#xe0aa;"></span></a>
                                            <a href=""><span data-icon="&#xe0ab;"></span></a>
                                            <a href=""><span data-icon="&#xe0b1;"></span></a>
                                            <a href=""><span data-icon="&#xe0b4;"></span></a>
                                            <a href=""><span data-icon="&#xe0b9;"></span></a>
                                        </div>
                                        <span className="email"><a href="" data-icon="&#xe010;"></a></span>
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
