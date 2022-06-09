import React, { useState } from 'react';
import SponsorPopup from '@/ui-components/SponsorPopup';


const Variation1 = ({ sponsorsByCategories, labels, eventUrl, siteLabels }) => {
	const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
	return (
		<div style={{ padding: "80px 0" }} className="module-section">
			{popup && <SponsorPopup data={data} eventUrl={eventUrl} onClick={handleClick} />}
			<div className="container">
				<div className="edgtf-title-section-holder pb-3">
					<h2 style={{ marginBottom: '5px' }} className="edgtf-title-with-dots edgtf-appeared">
						{ siteLabels.EVENTSITE_SPONSORS }
					</h2>
					<h6 style={{ fontSize: "16px", lineHeight: "1.5", fontWeight: 300 }}
						className="edgtf-section-subtitle">
						{ siteLabels.EVENTSITE_SPONSORS_SUB}
					</h6>
				</div>
				{sponsorsByCategories.map((sponsorsCategory, i) => (
					<div className="sponsorsv3-wrapper row d-flex" key={i}>
						{sponsorsCategory.name ?  <h4> { sponsorsCategory.name}</h4> : <hr/>}
						{sponsorsCategory.sponsors.map((sponsor, j) => {
							return (<div className="col-sm-6 col-md-4" key={j}>
								<figure onClick={() =>{setData(sponsor);setPopup(true)}} className="bghover">
									<img
										src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
										className="vc_single_image-img attachment-full"
										alt="x"
									/>
								</figure>
							</div>)
						})}
					</div>
					))
				}
			</div>
		</div>
	)
}

export default Variation1
