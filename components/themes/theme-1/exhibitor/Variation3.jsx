import React, {useState} from 'react'
import ExhibitorPopup from 'components/ui-components/ExhibitorPopup';
import HeadingElement from 'components/ui-components/HeadingElement';
import Image from 'next/image'

const Variation3 = ({exhibitorsByCategories, labels, eventUrl, siteLabels, settings}) => {
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
                      <HeadingElement dark={false} label={siteLabels.EVENTSITE_EXHIBITORS} desc={siteLabels.EVENTSITE_EXHIBITORS_SUB} align={settings.text_align} />
                    </div>
                    <div className="container">
                    {exhibitorsByCategories.map((exhibitorsCategory, i) => (
                        <React.Fragment key={i}>
                        {exhibitorsCategory.name ?  <h4 style={{textAlign: settings.text_align}}> { exhibitorsCategory.name}</h4> : ""}
                        <div className={`row d-flex sponsorsv5-wrapper ${settings.text_align === 'left' ? 'justify-content-start' : 'justify-content-center'}`} >
                            {exhibitorsCategory.exhibitors.map((exhibitor, j) => {
                                return (<div className="col-sm-4 col-6 col-md-3 col-lg-3" key={j}>
                                    <figure onClick={() =>{setData(exhibitor);setPopup(true)}} className="bghover">
                                        <img
                                            src={exhibitor.logo && exhibitor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + exhibitor.logo : require('public/img/exhibitors-default.png')}
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
