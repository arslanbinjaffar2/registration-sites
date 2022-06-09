import React, {useState} from 'react'
import ExhibitorPopup from '@/ui-components/ExhibitorPopup';

const Variation6 = ({exhibitorsByCategories, labels, eventUrl, siteLabels}) => {
    const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
    return (
        <div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section">
			{popup && <ExhibitorPopup data={data} eventUrl={eventUrl} onClick={handleClick} />}
                <div className="container">
                    <div className="edgtf-title-section-holder pb-3">
                        <h2 style={{ marginBottom: '5px' }} className="edgtf-title-with-dots edgtf-appeared">
                        { siteLabels.EVENTSITE_EXHIBITORS }
                        </h2>
                        <h6 style={{ fontSize: "16px", lineHeight: "1.5", fontWeight: 300 }}
                            className="edgtf-section-subtitle">
                             { siteLabels.EVENTSITE_EXHIBITORS_SUB }
                        </h6>
                    </div>
                    {exhibitorsByCategories.map((exhibitorCategory, i) => (
                        <div className="exhibitorsv4-wrapper exhibitorsv4-wrapper-alt row d-flex" key={i}>
                        {exhibitorCategory.name ?  <h4><span> { exhibitorCategory.name} </span></h4> : <hr/>}
                            {exhibitorCategory.exhibitors.map((exhibitor, j) => {
                                return (<div className="col-sm-4 col-md-2" key={j}>
                                    <figure onClick={() =>{setData(exhibitor);setPopup(true)}} className="bghover">
                                        <img
                                            src={exhibitor.logo && exhibitor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + exhibitor.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
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
