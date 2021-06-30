import * as React from 'react';
class Variation4 extends React.Component {
    render() {
        const speakers = this.props.speakers;
        return (
            <div style={{ backgroundImage: `url(${require('img/h1-parallax1.jpg')})`, padding: '50px 0' }} className="edgtf-parallax-section-holder">
                <div className="container-fluid">
                    <div className="row d-flex mb-5">
                        <div className="col-12">
                            <div className="edgtf-title-section-holder text-center">
                                <h2 style={{ color: "#ffffff" }} className="edgtf-title-with-dots edgtf-appeared">
                                    Build your base		</h2>
                                <span className="edge-title-separator edge-enable-separator"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex edgtf-team-list-holder edgtf-team-info-on-hover">
                        {/* Grid */}
                        {speakers && speakers.map((speaker, i) => <div key={i} className="col-12 col-sm-6 col-md-4 pl-0 pr-0">
                            <div className="edgtf-team-list-holder-inner info_box">
                                <div style={{ width: '100%' }} className="edgtf-team edgtf-team-light mb-0">
                                    <div className="edgtf-team-inner">
                                        <div className="edgtf-team-image">
                                        <img style={{width: '100%'}}  src={speaker.image && speaker.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/attendees/' + speaker.image : "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"} alt="g"  />
                                        </div>
                                        {/* Description */}
                                        <div className="edgtf-team-info">
                                            <div className="edgtf-team-title-holder">
                                                <h3 className="edgtf-team-name">
                                                    {speaker.first_name} {speaker.last_name}
                                                </h3>
                                                <span className="edgtf-team-position">{speaker.email}</span>
                                                <div className="edgtf-team-social-holder">
                                                    <div className="edgtf-team-social-holder-inner">
                                                        {speaker.info.facebook && <a target="_blank" href={`${speaker.info.facebook_protocol}${speaker.info.facebook}`}><span className="social_facebook_circle" aria-hidden="true"></span> </a>}
                                                        {speaker.info.twitter && <a target="_blank" href={`${speaker.info.twitter_protocol}${speaker.info.twitter}`}><span className="social_twitter_circle" aria-hidden="true"></span> </a>}
                                                        {speaker.info.linkedin && <a target="_blank" href={`${speaker.info.linkedin_protocol}${speaker.info.linkedin}`}><span className="social_linkedin_circle" aria-hidden="true"></span> </a>}
                                                        {speaker.info.website && <a target="_blank" href={`${speaker.info.website_protocol}${speaker.info.website}`}><span className="social_share_circle" aria-hidden="true"></span> </a>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="edgtf-team-social-holder-between">
                                                <div className="edgtf-team-social">
                                                    <div className="edgtf-team-social-inner">
                                                        <div className="edgtf-team-social-wrapp"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Description */}
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {/* Grid */}

                    </div>
                </div>
            </div>
        );
    }
}

export default Variation4;
