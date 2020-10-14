import * as React from 'react';
class Variation2 extends React.Component {
    render() {
        const speakers = this.props.speakers;
        return (
            <div style={{ padding: '50px 0' }} className="edgtf-parallax-section-holder">
                <div className="container">
                    <div className="row d-flex mb-5">
                        <div className="col-8 offset-md-2 text-center">
                            <div className="edgtf-title-section-holder">
                                <h2 className="edgtf-title-with-dots edgtf-appeared">
                                    Build your base		</h2>
                                <span className="edge-title-separator edge-enable-separator"></span>
                            </div>
                            <div className="edgtf-title-section-holder">
                                <h6 className="edgtf-section-subtitle">Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad his suavitate complectitur ruis dicant facilisi </h6>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex edgtf-team-list-holder edgtf-team-info-below-image ">
                        {/* Grid */}
                        {
                            speakers.map((speaker, i) => {
                                return(
                                    <div className="col-12 col-md-4 pl-0 pr-0">
                                        <div className="edgtf-team-list-holder-inner info_box">
                                            <div className="edgtf-team mb-5">
                                                <div className="edgtf-team-inner">
                                                    <div className="edgtf-team-image">
                                                        <img src="https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/team-1-img-1.jpg" className="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="d" srcSet="https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/team-1-img-1.jpg 600w, https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/team-1-img-1-300x240.jpg 300w" sizes="(max-width: 600px) 100vw, 600px" width="600" height="481" />
                                                        <div className="edgtf-team-social-holder">
                                                            <div className="edgtf-team-social-holder-inner">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="edgtf-team-info">
                                                        <div className="edgtf-team-title-holder">
                                                            <h3 className="edgtf-team-name">
                                                               {speaker.first_name} {speaker.last_name}
                                                            </h3>
                                                            <span className="edgtf-team-position">{ speaker.email }</span>
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
                                    </div>
                                );
                            })
                        
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Variation2;
