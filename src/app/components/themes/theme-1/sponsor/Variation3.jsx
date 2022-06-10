import React, {useState} from 'react'
import SponsorPopup from '@/ui-components/SponsorPopup';
import HeadingElement from '@/ui-components/HeadingElement';

const Variation3 = ({sponsorsByCategories, labels, eventUrl, siteLabels, settings}) => {
    const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
    return (
        <div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section">
			{popup && <SponsorPopup data={data} eventUrl={eventUrl} onClick={handleClick} />}
                <div className="container">
                    <div className="edgtf-title-section-holder text-center pb-5">
                        <h2 className="edgtf-title-with-dots edgtf-appeared">
                        { siteLabels.EVENTSITE_SPONSORS }
                        </h2>
                        <span className="edge-title-separator edge-enable-separator"></span>
                      </div>
                      <HeadingElement dark={false} label={siteLabels.EVENTSITE_SPONSORS} desc={siteLabels.EVENTSITE_PHOTOS_SUB} align={settings.text_align} />
                    </div>
                    <div className="container">
                    {sponsorsByCategories.map((sponsorsCategory, i) => (
                        <React.Fragment key={i}>
                        {sponsorsCategory.name ?  <h4> { sponsorsCategory.name}</h4> : ""}
                        <div className="row d-flex sponsorsv5-wrapper" >
                            {sponsorsCategory.sponsors.map((sponsor, j) => {
                                return (<div className="col-sm-4 col-6 col-md-3 col-lg-3" key={j}>
                                    <figure onClick={() =>{setData(sponsor);setPopup(true)}} className="bghover">
                                        <img
                                            src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : require('img/exhibitors-default.png')}
                                            className="vc_single_image-img attachment-full"
                                            alt="x"
                                        />
                                    </figure>
                                </div>)
                            })
                            }
                        </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
    )
}

export default Variation3
