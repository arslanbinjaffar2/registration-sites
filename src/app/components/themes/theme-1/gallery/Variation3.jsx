import * as React from 'react';
class Variation3 extends React.Component {
    render() {
			const photos = this.props.photos;
        return (
            <div style={{ padding: "80px 0" }} className="module-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <div className="edgtf-title-section-holder mb-5">
                                <h2 className="edgtf-title-with-dots edgtf-appeared">
                                    Conference Gallery
                                </h2>
                                <span className="edge-title-separator edge-enable-separator"></span>
                            </div>
                        </div>
                    </div>
                    <div className="edgtf-portfolio-list-holder-outer">
                        <div className="edgtf-portfolio-list-holder d-flex row">

												{photos && photos.map((photo, i) => 
													<div key={i} className="col-md-4 col-sm-6">
														<div className="edgtf-image-with-text edgtf-image-with-text-above mb-30px">
																<div className="edgtf-link-holder">
																		<div className="edgtf-iwt-image">
																		<img style={{width: '100%'}} src={photo.image && photo.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/photos/thumbs/' + photo.image : "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"} alt="g"  />
																		</div>
																</div>
																<div className="edgtf-iwt-text-holder">
																		<div className="edgtf-iwt-text-table">
																				<div className="edgtf-iwt-text-cell">
																					{photo.info && <h2 className="edgtf-iwt-title">{Object.keys(photo.info)}</h2>}
																				</div>
																		</div>
																</div>
															</div>
                            </div>
														)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Variation3;
