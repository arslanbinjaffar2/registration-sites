import React, { Component } from 'react'
import SliderBanner from '@/SliderBanner';
import moment from 'moment';

export default class Variation3 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: '',
			data: '',
			eventdate: ''
		}
	}
	async componentDidMount() {
		let momentObj = moment(this.props.event.start_date + this.props.event.start_time, 'YYYY-MM-DDLT');
		let dateTime = momentObj.toDate();
		this.setState({
			eventdate: dateTime,
			event: this.props.event,
			data: this.props.banners,
		}, () => {
			console.log(this.state.data);
		})
	}

	render() {
		return (
			<div className="main-slider-wrapper">
				{this.state.data && <SliderBanner
					fullscreen
				>
					{this.state.data.map((slides, i) =>
						<div key={i} className="slide-wrapper">
							<div style={{ backgroundImage: `url(${slides && Number(slides.video_type) === 1 ? process.env.REACT_APP_EVENTCENTER_URL + slides.image : require('img/h1-parallax1.jpg')})`, backgroundPosition: '50% 0' }} className="background parallax-backgroud">
								{Number(slides.video_type) === 2 &&
									<div className="video-fullscreen">
										<video autoPlay muted loop src={require('img/Sequence-01_5.mp4')} type="video/mp4"></video>
									</div>}
								<div className="caption-wrapp">
									<div className="col-12 align-items-center d-flex inner-caption-wrapp">
										<div style={{ position: 'relative' }} className="parallax-text">
											{slides.info.title &&
												<div className="edgtf-custom-font-holder" style={{ fontFamily: 'Rubik', fontSize: '100px', lineHeight: '115px', fontWeight: '500', textTransform: 'uppercase', textAlign: 'left', color: '#ec008c' }}>
													<span style={{ color: '#fff' }}> {slides.info.title} </span>
												</div>
											}
											{slides.info.message && <div className="edgtf-custom-font-holder"
												style={{ marginTop: '15px', fontFamily: 'Open Sans', fontSize: '26px', lineHeight: '37px', fontWeight: '400', letterSpacing: '0px', textAlign: 'left', color: '#ffffff', maxWidth: 850 }}>
												{slides.info.message}
											</div>}
											<div className="edgtf-custom-font-holder"
												style={{ marginTop: '40px', fontFamily: 'Open Sans', fontSize: '26px', lineHeight: '37px', fontWeight: '400', letterSpacing: '0px', textAlign: 'left', color: '#ffffff' }}>
												<a href="" style={{ fontFamily: 'Rubik', marginRight: '30px', fontSize: '15px', fontWeight: '500', background: '#fff', borderColor: '#fff', color: '#444', padding: '17px 48px 15px' }} className="edgtf-btn edgtf-btn-huge edgtf-btn-solid edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">REGISTER</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</SliderBanner>}
			</div>
		)
	}
}
