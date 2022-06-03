import * as React from 'react';

const SponsorPopup =  ({width, onClick, data}) => {
    console.log(data);
    return (
        <div className="fixed ebs-popup-container">
            <div className="ebs-popup-wrapper" style={{ maxWidth: width ? width : '980px' }}>
                <span onClick={onClick} className="ebs-close-link"><i className="material-icons">close</i></span>
                <div className="ebs-popup-inner">
                    <div className="row d-flex">
                        <div className="col-sm-4">
                            <figure>
                            <img
                                src={data.logo && data.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + data.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
									className="vc_single_image-img attachment-full"
									alt="x"
								/>
                            </figure>
                        </div>
                        <div className="col-sm-8">
                            <div className="ebs-container-content">
                                {data.name && <h2>{data.name}</h2>}
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore version …</p>
                                <div className="ebs-social-icons">
                                    <a href="#!"><i className="fa fa-facebook" /></a>
                                    <a href="#!"><i className="fa fa-twitter" /></a>
                                    <a href="#!"><i className="fa fa-linkedin" /></a>
                                </div>
                                <p><a href="#!">Read More</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SponsorPopup;

