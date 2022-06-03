import React, { useState } from 'react';
import SponsorPopup from '@/ui-components/SponsorPopup';


const Variation1 = ({ sponsors }) => {
	const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
	console.log(sponsors)
	return (
		<div style={{ padding: "80px 0" }} className="module-section">
			{popup && <SponsorPopup data={data} onClick={handleClick} />}
			<div className="container">
				<div className="edgtf-title-section-holder pb-3">
					<h2 style={{ marginBottom: '5px' }} className="edgtf-title-with-dots edgtf-appeared">
						Sponsors and partners
					</h2>
					<h6 style={{ fontSize: "16px", lineHeight: "1.5", fontWeight: 300 }}
						className="edgtf-section-subtitle">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum recusandae ea inventore.
					</h6>
				</div>
				<div className="sponsorsv3-wrapper row d-flex">
					<h4>Platinum Sponsor</h4>
					{sponsors.map((sponsor, i) => {
						return (<div className="col-sm-6 col-md-4" key={i}>
							<figure onClick={() =>{setData(sponsor);setPopup(true)}} className="bghover">
								<img
									src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
									className="vc_single_image-img attachment-full"
									alt="x"
								/>
							</figure>
						</div>)
					})
					}
				</div>
				<div className="sponsorsv3-wrapper row d-flex">
					<h4>Gold Sponsor</h4>
					{sponsors.map((sponsor, i) => {
						return (<div className="col-sm-6 col-md-3" key={i}>
							<figure onClick={() =>{setData(sponsor);setPopup(true)}} className="bghover">
								<img
									src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
									className="vc_single_image-img attachment-full"
									alt="x"
								/>
							</figure>
						</div>)
					})
					}
				</div>
				<div className="sponsorsv3-wrapper row d-flex">
					<h4>Gold Sponsor</h4>
					{sponsors.map((sponsor, i) => {
						return (<div className="col-sm-4 col-md-2" key={i}>
							<figure onClick={() =>{setData(sponsor);setPopup(true)}} className="bghover">
								<img
									src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
									className="vc_single_image-img attachment-full"
									alt="x"
								/>
							</figure>
						</div>)
					})
					}
				</div>
			</div>
		</div>
	)
}

export default Variation1
