import React from 'react'
import SliderBanner from './components/SliderBanner';

const Variation1 = ({ event, banner, countdown, regisrationUrl }) => {

	const WrapperLayout = (props) => {

		if (props.slides && Number(props.slides.video_type) === 1) {
			return (
				<div style={{ backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + props.slides.image})`, backgroundPosition: '50% 0' }} className="background parallax-backgroud">
					{props.slides.url ? <a href={props.slides.url} target="_blank" rel="noreferrer">
						{props.children}
					</a >: props.children}
				</div>
			);
		} else {
			return (
				<div style={{ backgroundPosition: '50% 0' }} className="background parallax-backgroud"
					>
					{props.slides.url ? <a href={props.slides.url} target="_blank" rel="noreferrer">
						{props.children}
					</a >: props.children}
				</div>
			);
		}

	}

	return (
		<div data-fixed="true" className="main-slider-wrapper ebs-transparent-box">
			{banner && <SliderBanner
				countdown={countdown} //{dateTime}
				fullscreen
			>
				{banner.map((slides, i) =>
					<div key={i} className="slide-wrapper">
						<WrapperLayout
							slides={slides}
						>
							{Number(slides.video_type) === 2 &&
								<div className="video-fullscreen">
									<video autoPlay playsInline muted loop src={`${process.env.NEXT_APP_EVENTCENTER_URL}/${slides.image}`} type="video/mp4"></video>
								</div>}
							<div className="caption-wrapp">
								<div className="col-12 align-items-center d-flex inner-caption-wrapp">
									<div style={{ position: 'relative' }} className="parallax-text">
										{slides.info.title &&
											<div className="edgtf-custom-font-holder ebs-banner-title" style={{ fontFamily: 'Rubik', fontSize: '100px', lineHeight: '110px', fontWeight: '500', textTransform: 'uppercase', textAlign: 'left', color: '#ec008c' }}>
												<span style={{ color: '#fff' }}> {slides.info.title} </span>
											</div>
										}
										{slides.info.message && <div className="edgtf-custom-font-holder ebs-banner-subtitle"
											style={{ marginTop: '15px', fontSize: '26px', lineHeight: '37px', fontWeight: '400', letterSpacing: '0px', textAlign: 'left', color: '#ffffff', maxWidth: 850 }}>
											{slides.info.message}
										</div>}
										<div className="edgtf-custom-font-holder"
											style={{ marginTop: '40px', fontSize: '26px', lineHeight: '37px', fontWeight: '400', letterSpacing: '0px', textAlign: 'left', color: '#ffffff' }}>
											<a href={regisrationUrl} style={{ fontFamily: 'Rubik', marginRight: '0', fontSize: '15px', fontWeight: '500', background: 'transparent', border: '2px solid #fff', color: '#fff', padding: '17px 48px 15px' }} className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">REGISTER</a>
										</div>
									</div>
								</div>
							</div>
						</WrapperLayout>
					</div>
				)}
			</SliderBanner>}
		</div>
	)
}

export default Variation1

