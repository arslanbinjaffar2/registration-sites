import * as React from 'react';
class Variation2 extends React.Component {
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

                                <h6 className="edgtf-section-subtitle">
                                    Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad
                                    his suavitate complectitur ruis dicant facilisi atvimsed eu
                                    justo evertitur
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="edgtf-portfolio-list-holder-outer edgtf-ptf-gallery-with-space edgtf-dark">
                        <div className="edgtf-portfolio-list-holder d-flex row">
												{photos && photos.map((photo, i) => 
													<div key={i} className="col-md-4 col-sm-6">
															<article className="edgtf-portfolio-item mix" style={{ display: 'block', visibility: 'visible' }}>
																	<div className="edgtf-item-image-holder">
																	<img style={{width: '100%'}} src={photo.image && photo.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/photos/thumbs/' + photo.image : "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"} alt="g"  />
																	</div>
																	<div className="edgtf-item-text-overlay">
																			<div className="edgtf-item-text-overlay-inner">
																					<div className="edgtf-item-text-holder">
																						{photo.info && <h4 className="edgtf-item-title">{Object.keys(photo.info)}</h4>}
																					</div>
																			</div>
																	</div>
																</article>
															</div>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Variation2;
