import React,{useState} from 'react';
import Slider from "react-slick";
import ExhibitorPopup from '@/ui-components/ExhibitorPopup';
import HeadingElement from '@/ui-components/HeadingElement';

const Variation8 = ({ exhibitorsByCategories, labels, eventUrl, siteLabels, settings }) => {
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
		infinite: false,
		arrows: false,
		speed: 500,
		margin: 30,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 4,
		slidesToScroll: 2,
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
	
	const [exhibitors,] = useState(exhibitorsByCategories.reduce((ack, item)=>{
			return [...ack, ...item.exhibitors];
	}, []));
	const handleOnMouseDown = (e) => {
		setClientXonMouseDown(e.clientX)
		setClientYonMouseDown(e.clientY)
		e.preventDefault() // stops weird link dragging effect
	  }
	
	 const  handleOnClick = (e,exhibitor) => {
		e.stopPropagation()
		if (clientXonMouseDown !== e.clientX || 
			clientYonMouseDown !== e.clientY) {
		  // prevent link click if the element was dragged
		  e.preventDefault()
		} else {
			setData(exhibitor);
			setPopup(true)
		}
	  }
	return (
		<div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section ebs-colored-logo-grid">
			{popup && <ExhibitorPopup data={data} eventUrl={eventUrl} onClick={handleClick} />}
			<div className="container">
				<HeadingElement dark={false} label={siteLabels.EVENTSITE_EXHIBITORS} desc={siteLabels.EVENTSITE_EXHIBITORS_SUB} align={settings.text_align} />
			</div>
				<div className="container">
					<div className="edgtf-carousel-holder">
						<div
							className="edgtf-carousel edgtf-slick-slider-navigation-style"
						>
							<Slider {...settingsslider}>
									{exhibitors.map((exhibitor, i) => {
										return (
											<div className="edgtf-carousel-item-holder ebs-carousel-image-holder" key={i}>
												<span
													className="edgtf-carousel-first-image-holder ebs-carousel-image-box"
												>
													<img
														onMouseDown={e => handleOnMouseDown(e)}
														onClick={e => handleOnClick(e,exhibitor)}
														src={
															exhibitor.logo !== ""
																? process.env.REACT_APP_EVENTCENTER_URL +
																"/assets/exhibitors/" +
																exhibitor.logo
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

export default Variation8
