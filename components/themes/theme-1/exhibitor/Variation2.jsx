import React, {useState} from 'react'
import ExhibitorPopup from '@/ui-components/ExhibitorPopup';
import HeadingElement from '@/ui-components/HeadingElement';

const Variation2 = ({exhibitorsByCategories, labels, eventUrl, siteLabels, settings}) => {
    const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
    return (
        <div style={{ padding: "80px 0" }} className="module-section">
			{popup && <ExhibitorPopup data={data} eventUrl={eventUrl} onClick={handleClick} />}
                <div className="container"> 
                    <HeadingElement dark={false} label={siteLabels.EVENTSITE_EXHIBITORS} desc={siteLabels.EVENTSITE_EXHIBITORS_SUB} align={settings.text_align} />
                        {exhibitorsByCategories.map((exhibitorsCategory, i) => (
                            <div className={`sponsorsv3-wrapper row d-flex ${settings.text_align === 'left' ? 'justify-content-start' : 'justify-content-center'}`} key={i}>
                            {exhibitorsCategory.name ?  <h4 style={{textAlign: settings.text_align}}> { exhibitorsCategory.name}</h4> : ""}
                                {exhibitorsCategory.exhibitors.map((exhibitor, j) => {
                                    return (<div className="col-sm-4 col-6 col-md-2" key={j}>
                                        
                                        <figure onClick={() =>{setData(exhibitor);setPopup(true)}} className="bghover">
                                            <img
                                                src={exhibitor.logo && exhibitor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + exhibitor.logo : require('img/exhibitors-default.png')}
                                                className="vc_single_image-img attachment-full"
                                                alt="x"
                                            />
                                        </figure>
                                    </div>)
                                })
                                }
                            </div>
                            ))
                        }
                </div> 
            </div>
    )
}

export default Variation2
