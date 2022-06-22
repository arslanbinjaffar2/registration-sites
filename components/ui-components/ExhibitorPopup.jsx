import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'

const ExhibitorPopup = ({ width, onClick, data, eventUrl }) => {
    
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            document.getElementsByTagName('body')[0].classList.add('un-scroll');
            return () => {
                document.getElementsByTagName('body')[0].classList.remove('un-scroll');
            }
        }
    }, [])

    return (
        <div className="fixed ebs-popup-container">
            <div className="ebs-popup-wrapper" style={{ maxWidth: width ? width : '980px' }}>
                <span onClick={onClick} className="ebs-close-link"><i className="material-icons">close</i></span>
                <div className="ebs-popup-inner">
                    <div className="row d-flex">
                        <div className="col-sm-4">
                            <figure>
                                <img style={{ width: '90%' }}
                                    src={data.logo && data.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + data.logo : require('public/img/exhibitors-default.png')}
                                    className="vc_single_image-img attachment-full"
                                    alt="x"
                                />
                            </figure>
                        </div>
                        <div className="col-sm-8">
                            <div className="ebs-container-content">
                                {data.name && <h2>{data.name}</h2>}
                                {data.description && <p dangerouslySetInnerHTML={{ __html: data.description }}></p>}
                                <div className="ebs-social-icons">
                                    {data.facebook && <a href={data.facebook}><i className="fa fa-facebook" /></a>}
                                    {data.twitter && <a href={data.twitter}><i className="fa fa-twitter" /></a>}
                                    {data.linkedin && <a href={data.linkedin}><i className="fa fa-linkedin" /></a>}
                                </div>
                                <p><Link href={`/${eventUrl}/exhibitors/${data.id}`}>Read More</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExhibitorPopup;

