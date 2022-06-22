import React,{useState} from 'react';
import Slider from "react-slick";
import SponsorPopup from 'components/ui-components/SponsorPopup';
import HeadingElement from 'components/ui-components/HeadingElement';
import Image from 'next/image'

const Variation8 = ({ sponsorsByCategories, labels, eventUrl, siteLabels, settings }) => {
	const [popup, setPopup] = useState(false);
	const [data, setData] = useState('');
	const [clientXonMouseDown, setClientXonMouseDown] = useState(null);
	const [clientYonMouseDown, setClientYonMouseDown] = useState(null);
	const handleClick = () => {
		setPopup(!popup);
		setData('');
	}
	var settingsslider = {
		dots: false,
		infinite: true,
		arrows: false,
		speed: 500,
		margin: 30,
		slidesToShow: 4,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2
				}
			},

		]
	};
	
	const [sponsors,] = useState(sponsorsByCategories.reduce((ack, item)=>{
			return [...ack, ...item.sponsors];
	}, []));
	const handleOnMouseDown = (e) => {
		setClientXonMouseDown(e.clientX)
		setClientYonMouseDown(e.clientY)
		e.preventDefault() // stops weird link dragging effect
	  }
	
	 const  handleOnClick = (e,sponsor) => {
		e.stopPropagation()
		if (clientXonMouseDown !== e.clientX || 
			clientYonMouseDown !== e.clientY) {
		  // prevent link click if the element was dragged
		  e.preventDefault()
		} else {
			setData(sponsor);
			setPopup(true)
		}
	  }
	return (
		<div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section ebs-colored-logo-grid">
			{popup && <SponsorPopup data={data} eventUrl={eventUrl} onClick={handleClick} />}
			<div className="container">
				<HeadingElement dark={false} label={siteLabels.EVENTSITE_SPONSORS} desc={siteLabels.EVENTSITE_SPONSORS_SUB} align={settings.text_align} />
			</div>
				<div className="container">
					<div className="edgtf-carousel-holder">
						<div
							className="edgtf-carousel edgtf-slick-slider-navigation-style"
						>
							<Slider {...settingsslider}>
									{sponsors.map((sponsor, i) => {
										return (
											<div className="edgtf-carousel-item-holder ebs-carousel-image-holder" key={i}>
												<span
													className="edgtf-carousel-first-image-holder ebs-carousel-image-box"
												>
													<img
														onMouseDown={e => handleOnMouseDown(e)}
														onClick={e => handleOnClick(e,sponsor)}
														src={
															sponsor.logo !== ""
																? process.env.REACT_APP_EVENTCENTER_URL +
																"/assets/sponsors/" +
																sponsor.logo
																: require('public/img/exhibitors-default.png')
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

export default Variation8
