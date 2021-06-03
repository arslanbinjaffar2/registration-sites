import React, { Component } from 'react'

export default class Variation5 extends Component {
    render() {
			const speakers = this.props.speakers;
        return (
            <div style={{ padding: '80px 0' }} className="module-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <div style={{ marginBottom: '30px' }} className="edgtf-title-section-holder">
                                <h2 className="edgtf-title-with-dots edgtf-appeared">
                                    Our Speakers </h2>
                                <h6 style={{ fontSize: '16px', lineHeight: '1.5' }} className="edgtf-section-subtitle">A schedule at a glance is listed below. Check the program for this year's conference and learn about the speakers and sessions in store for tech enthusiasts.</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {speakers && speakers.map((speaker, i) => <div key={i} className="col-4">
                            <div className="speakerv5-wrapper">
                                <div className="speakerv5-area text-center">
                                    <div className="speakerv5-image">
                                        <img src={require('img/square.jpg')} alt="" />
                                        <h5>{ speaker.first_name} { speaker.last_name}</h5>
                                        <span className="sc-desciption">{ speaker.email}</span>
                                    </div>
                                    <div className="speakerv5-caption">
                                        <h5>{ speaker.first_name} { speaker.last_name}</h5>
                                        <span className="sc-desciption">{ speaker.email}</span>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus fugiat cum ad odit qui voluptate doloribus aliquam beatae, molestiae eligendi!</p>
                                        <div className="sc-social">
                                            <a href=""><i className="fa fa-twitter-square"></i></a>
                                            <a href=""><i className="fa fa-facebook-square"></i></a>
                                            <a href=""><i className="fa fa-linkedin-square"></i></a>
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
