import React from 'react';
import Slider from "react-slick";

const Variation7 = ({ sponsors }) => {
	var settings = {
		dots: false,
		infinite: false,
		arrows: false,
		speed: 500,
		margin: 30,
		slidesToShow: 6,
		slidesToScroll: 1,
	};
	return (
		<div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section ebs-colored-logo-grid">
			<div className="container">
				<div className="edgtf-title-section-holder text-center mb-4">
					<h2 className="edgtf-title-with-dots edgtf-appeared mt-0">
						Sponsors &amp; Partners
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
													src={
														sponsor.logo !== ""
															? process.env.REACT_APP_EVENTCENTER_URL +
															"/assets/sponsors/" +
															sponsor.logo
															: `${process.env.REACT_APP_EVENTCENTER_URL}/_admin_assets/images/header_logo_size_image.jpg`
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
