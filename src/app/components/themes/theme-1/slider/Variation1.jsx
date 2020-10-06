import * as React from 'react';
import Slider from "react-slick";

class Variation1 extends React.Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            arrows: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
        };
        return (
            <div
                style={{ padding: "80px 5%", backgroundColor: "#f2f2f2 " }}
                className="module-section"
            >
                <div className="edgtf-title-section-holder text-center mb-4">
                    <h2 className="edgtf-title-with-dots edgtf-appeared mt-0">
                        Sponsors &amp; Partners{" "}
                    </h2>
                    <span className="edge-title-separator edge-enable-separator"></span>
                </div>
                <div className="edgtf-carousel-holder">
                    <div className="edgtf-carousel edgtf-slick-slider-navigation-style">
                        <Slider {...settings}>
                            <div className="edgtf-carousel-item-holder">
                                <span className="edgtf-carousel-first-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client100.jpg"
                                        alt="Client 11"
                                    />
                                </span>
                                <span className="edgtf-carousel-second-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client100-hover.jpg"
                                        alt="Client 11"
                                    />
                                </span>
                            </div>
                            <div className="edgtf-carousel-item-holder">
                                <span className="edgtf-carousel-first-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client-6.png"
                                        alt="Client 11"
                                    />
                                </span>
                                <span className="edgtf-carousel-second-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client6-hover.png"
                                        alt="Client 11"
                                    />
                                </span>
                            </div>
                            <div className="edgtf-carousel-item-holder">
                                <span className="edgtf-carousel-first-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client-2-1.png"
                                        alt="Client 11"
                                    />
                                </span>
                                <span className="edgtf-carousel-second-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client-2-hover.png"
                                        alt="Client 11"
                                    />
                                </span>
                            </div>
                            <div className="edgtf-carousel-item-holder">
                                <span className="edgtf-carousel-first-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client-4.png"
                                        alt="Client 11"
                                    />
                                </span>
                                <span className="edgtf-carousel-second-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client4-hover.png"
                                        alt="Client 11"
                                    />
                                </span>
                            </div>
                            <div className="edgtf-carousel-item-holder">
                                <span className="edgtf-carousel-first-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client100.jpg"
                                        alt="Client 11"
                                    />
                                </span>
                                <span className="edgtf-carousel-second-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client100-hover.jpg"
                                        alt="Client 11"
                                    />
                                </span>
                            </div>
                            <div className="edgtf-carousel-item-holder">
                                <span className="edgtf-carousel-first-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client-3.png"
                                        alt="Client 11"
                                    />
                                </span>
                                <span className="edgtf-carousel-second-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client3-hover.png"
                                        alt="Client 11"
                                    />
                                </span>
                            </div>
                            <div className="edgtf-carousel-item-holder">
                                <span className="edgtf-carousel-first-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client-1-1.png"
                                        alt="Client 11"
                                    />
                                </span>
                                <span className="edgtf-carousel-second-image-holder edgtf-has-hover-image edgtf-image-change">
                                    <img
                                        src="https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client-1-hover.png"
                                        alt="Client 11"
                                    />
                                </span>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default Variation1;
