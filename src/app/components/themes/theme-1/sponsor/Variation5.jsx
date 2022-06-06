import React, {useState} from 'react'
import SponsorPopup from '@/ui-components/SponsorPopup';

const Variation5 = ({sponsorsByCategories, labels}) => {
    const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
    return (
        <div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section">
			{popup && <SponsorPopup data={data} onClick={handleClick} />}
                <div className="container">
                    <div className="edgtf-title-section-holder text-center pb-5">
                        <h2 className="edgtf-title-with-dots edgtf-appeared">
						{ labels.SPONSOR_HEADING }
                        </h2>
                        <span className="edge-title-separator edge-enable-separator"></span>
                      </div>
                    </div>
                    <div className="container-fluid">
                    {sponsorsByCategories.map((sponsorsCategory, i) => (
                     <div className="row d-flex sponsorsv5-wrapper" key={i}>
                        {sponsorsCategory.name ?  <h4> { sponsorsCategory.name}</h4> : <hr/>}
                        {sponsorsCategory.sponsors.map((sponsor, j) => {
                            return (<div className="col-sm-4 col-6 col-md-2 col-lg-1" key={j}>
                                <figure onClick={() =>{setData(sponsor);setPopup(true)}} className="bghover">
                                    <img
                                        src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : `${process.env.REACT_APP_EVENTCENTER_URL}/_admin_assets/images/header_logo_size_image.jpg`}
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
