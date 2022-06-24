import React, { useState } from 'react';
import ExhibitorPopup from 'components/ui-components/ExhibitorPopup';
import HeadingElement from 'components/ui-components/HeadingElement';
import Image from 'next/image'

const Variation1 = ({ exhibitorsByCategories, labels, eventUrl, siteLabels, settings }) => {
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
						{exhibitorsCategory.name ? <h4 style={{ textAlign: settings.text_align }}> {exhibitorsCategory.name}</h4> : ""}
						{exhibitorsCategory.exhibitors.map((exhibitor, j) => {
							return (<div className="col-sm-6 col-6 col-md-4" key={j}>
								<figure onClick={() => { setData(exhibitor); setPopup(true) }} className="bghover">
									{
										exhibitor.logo && exhibitor.logo !== '' ? (
											<img
												src={process.env.REACT_APP_EVENTCENTER_URL + "/assets/exhibitors/" + exhibitor.logo}
												className="vc_single_image-img attachment-full"
												alt="x"
											/>
										) : (
											<Image
												src={require('public/img/exhibitors-default.png')}
												className="vc_single_image-img attachment-full"
												alt="x"
											/>
										)
									}
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
