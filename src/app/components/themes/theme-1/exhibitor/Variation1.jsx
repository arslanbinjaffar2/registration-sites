import React, { useState } from 'react';
import ExhibitorPopup from '@/ui-components/ExhibitorPopup';


const Variation1 = ({ exhibitorsByCategories, labels, eventUrl, siteLabels }) => {
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
					<div className="sponsorsv3-wrapper row d-flex" key={i}>
						{exhibitorCategory.name ?  <h4> { exhibitorCategory.name}</h4> : <hr/>}
						{exhibitorCategory.exhibitors.map((exhibitor, j) => {
							return (<div className="col-sm-6 col-md-4" key={j}>
								<figure onClick={() =>{setData(exhibitor);setPopup(true)}} className="bghover">
									<img
										src={exhibitor.logo && exhibitor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + exhibitor.logo : require('img/exhibitors-default.png')}
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
