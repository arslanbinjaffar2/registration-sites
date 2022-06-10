import React, {useState} from 'react';
import Slider from "react-slick";
import SponsorPopup from '@/ui-components/SponsorPopup';

const Variation7 = ({ sponsorsByCategories, labels, eventUrl, siteLabels}) => {
	const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
	var settings = {
		dots: false,
		infinite: false,
		arrows: false,
		speed: 500,
		margin: 30,
		slidesToShow: 6,
		slidesToScroll: 1,
	};
	const [sponsors,] = useState(sponsorsByCategories.reduce((ack, item)=>{
		return [...ack, ...item.sponsors];
	}, []));
	return (
		<div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section ebs-colored-logo-grid">
			{popup && <SponsorPopup data={data} eventUrl={eventUrl} onClick={handleClick} />}
			<div className="container">
				<div className="edgtf-title-section-holder text-center mb-4">
					<h2 className="edgtf-title-with-dots edgtf-appeared mt-0">
					{ siteLabels.EVENTSITE_SPONSORS }
					</h2>
					<span className="edge-title-separator edge-enable-separator"></span>
				</div>
				</div>
				<div className="container-fluid">
					<div className="edgtf-carousel-holder">
						<div
							className="edgtf-carousel edgtf-slick-slider-navigation-style"
						>
							<Slider {...settings}>
									{sponsors.map((sponsor, i) => {
										return (
											<div className="edgtf-carousel-item-holder" key={i}>
												<span
													className="edgtf-carousel-first-image-holder ebs-carousel-image-box"
												>
													<img
														onClick={() =>{setData(sponsor);setPopup(true)}}
														src={
															sponsor.logo !== ""
																? process.env.REACT_APP_EVENTCENTER_URL +
																"/assets/sponsors/" +
																sponsor.logo
																: require('img/exhibitors-default.png')
														}
														alt="Client 11"
													/>
												</span>
											</div>
										);
									})}
							</Slider>
						</div>
					</div>
			</div>
		</div>
	)
}

export default Variation7
