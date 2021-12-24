import * as React from 'react';
class Variation2 extends React.Component {
    render() {
        const attendees = this.props.attendees;
        return (
            <div style={{ padding: '50px 0' }} className="edgtf-parallax-section-holder">
                <div className="container">
                    <div className="row d-flex mb-5">
                        <div className="col-8 offset-md-2 text-center">
                            <div className="edgtf-title-section-holder">
                                <h2 className="edgtf-title-with-dots edgtf-appeared">
                                    attendees		</h2>
                                <span className="edge-title-separator edge-enable-separator"></span>
                            </div>
                            <div className="edgtf-title-section-holder">
                                <h6 className="edgtf-section-subtitle">Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad his suavitate complectitur ruis dicant facilisi </h6>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex edgtf-team-list-holder edgtf-team-info-below-image ">
                        {/* Grid */}
                        {attendees &&  attendees.map((attendee, i) => {
                                return (
                                    <div className="col-12 col-md-4 pl-0 pr-0" key={i} >
                                        <div className="edgtf-team-list-holder-inner info_box">
                                            <div className="edgtf-team mb-5 w-100">
                                                <div className="edgtf-team-inner">
                                                    <div className="edgtf-team-image">
                                                    <img style={{width: '100%'}}  src={attendee.image && attendee.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/attendees/' + attendee.image : "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"} alt="g"  />
                                                        <div className="edgtf-team-social-holder">
                                                            <div className="edgtf-team-social-holder-inner">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="edgtf-team-info">
                                                        <div className="edgtf-team-title-holder">
                                                            <h3 className="edgtf-team-name">
                                                                {attendee.first_name} {attendee.last_name}
                                                            </h3>
                                                            <span className="edgtf-team-position">{attendee.email}</span>
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
