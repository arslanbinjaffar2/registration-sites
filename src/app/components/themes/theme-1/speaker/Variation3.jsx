import * as React from 'react';
class Variation3 extends React.Component {
    render() {
        const speakers = this.props.speakers;
        return (
            <div style={{ backgroundImage: `url(${require('img/h1-parallax1.jpg')})`, padding: '50px 0' }} className="edgtf-parallax-section-holder">
                <div className="container">
                    <div className="row d-flex mb-5">
                        <div className="col-12">
                            <div className="edgtf-title-section-holder text-center">
                                <h2 style={{ color: "#ffffff" }} className="edgtf-title-with-dots edgtf-appeared">
                                    Build your base		</h2>
                                <span className="edge-title-separator edge-enable-separator"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex edgtf-team-list-holder edgtf-team-info-below-image">
                        {/* Grid */}
                        {speakers && speakers.map((speaker, i) => <div key={i} className="col-12 col-sm-6 col-md-3 pl-0 pr-0">
                            <div className="edgtf-team-list-holder-inner info_box">
                                <div className="edgtf-team edgtf-team-light mb-5">
                                    <div className="edgtf-team-inner">
                                        <div className="edgtf-team-image">
                                            <img src="https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-3-team-img-1.jpg" className="vc_single_image-img attachment-full" alt="e" srcSet="https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-3-team-img-1.jpg 305w, https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-3-team-img-1-300x300.jpg 300w, https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-3-team-img-1-100x100.jpg 100w, https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-3-team-img-1-150x150.jpg 150w" sizes="(max-width: 305px) 100vw, 305px" width="305" height="305" />
                                        </div>
                                        {/* Description */}
                                        <div className="edgtf-team-info">
                                            <div className="edgtf-team-title-holder">
                                                <h3 className="edgtf-team-name">
                                                    {speaker.first_name} {speaker.last_name}
                                                </h3>
                                                <span className="edgtf-team-position">{speaker.email}</span>
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

export default Variation3;
