import * as React from 'react';
import { Link } from 'react-router-dom';

const SponsorPopup =  ({width, onClick, data, eventUrl}) => {
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
                                {data.description && <p dangerouslySetInnerHTML={{__html:data.description}}></p>}
                                <div className="ebs-social-icons">
                                    {data.facebook && <a href={data.facebook}><i className="fa fa-facebook" /></a>}
                                    {data.twitter && <a href={data.twitter}><i className="fa fa-twitter" /></a>}
                                    {data.linkedin && <a href={data.linkedin}><i className="fa fa-linkedin" /></a>}
                                </div>
                                <p><Link to={`/${eventUrl}/sponsors/${data.id}`}>Read More</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SponsorPopup;

