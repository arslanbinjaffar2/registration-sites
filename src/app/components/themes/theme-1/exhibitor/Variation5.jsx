import React, {useState} from 'react'
import ExhibitorPopup from '@/ui-components/ExhibitorPopup';

const Variation5 = ({exhibitorsByCategories, labels}) => {
    const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
    return (
        <div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section">
			{popup && <ExhibitorPopup data={data} onClick={handleClick} />}
                <div className="container">
                    <div className="edgtf-title-section-holder text-center pb-5">
                        <h2 className="edgtf-title-with-dots edgtf-appeared">
                        { labels.EXHIBITORS_HEADING }
                        </h2>
                        <span className="edge-title-separator edge-enable-separator"></span>
                      </div>
                    </div>
                    <div className="container-fluid">
                    {exhibitorsByCategories.map((exhibitorCategory, i) => (
                     <div className="row d-flex exhibitorsv5-wrapper" key={i}>
                        {exhibitorCategory.name ?  <h4> { exhibitorCategory.name}</h4> : <hr/>}
                        {exhibitorCategory.exhibitors.map((sponsor, j) => {
                            return (<div className="col-sm-4 col-6 col-md-2 col-lg-1" key={j}>
                                <figure onClick={() =>{setData(sponsor);setPopup(true)}} className="bghover">
                                    <img
                                        src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + sponsor.logo : `${process.env.REACT_APP_EVENTCENTER_URL}/_admin_assets/images/header_logo_size_image.jpg`}
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

export default Variation5
