import React, {useState} from 'react'
import SponsorPopup from '@/ui-components/SponsorPopup';

const Variation6 = ({sponsorsByCategories, labels, eventUrl, siteLabels}) => {
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
                    <div className="edgtf-title-section-holder pb-3 text-center">
                        <h2 style={{ marginBottom: '5px' }} className="edgtf-title-with-dots edgtf-appeared">
                        { siteLabels.EVENTSITE_SPONSORS }
                        </h2>
                        <h6 style={{ fontSize: "16px", lineHeight: "1.5", fontWeight: 300 }}
                            className="edgtf-section-subtitle">
                              { siteLabels.EVENTSITE_SPONSORS_SUB}
                        </h6>
                    </div>
                    {sponsorsByCategories.map((sponsorsCategory, i) => (
                        <div className="sponsorsv4-wrapper sponsorsv4-wrapper-alt row d-flex" key={i}>
                        {sponsorsCategory.name ?  <h4><span> { sponsorsCategory.name} </span></h4> : <hr/>}
                            {sponsorsCategory.sponsors.map((sponsor, j) => {
                                return (<div className="col-sm-4 col-md-2" key={j}>
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
                    ))}
                </div> 
            </div>
    )
}

export default Variation6
