import * as React from 'react';
import Slider from "react-slick";

class Variation1 extends React.Component {
    render() {
        var settings = {
            dots: false,
            infinite: false,
            arrows: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
        };

        const exhibitors = this.props.exhibitors;

        return (
            
            <div
                style={{ padding: "80px 5%", backgroundColor: "#f2f2f2 " }}
                className="module-section"
            >
                <div className="edgtf-title-section-holder text-center mb-4">
                    <h2 className="edgtf-title-with-dots edgtf-appeared mt-0">
                        Exhibitors &amp; Partners{" "}
                    </h2>
                    <span className="edge-title-separator edge-enable-separator"></span>
                </div>
                <div className="edgtf-carousel-holder">
                    <div className="edgtf-carousel edgtf-slick-slider-navigation-style">
                        <Slider {...settings}>
                            {
                                exhibitors.map((exhibitor, i) => { 

                                   return ( 
                                    <div className="edgtf-carousel-item-holder" key={i}>
                                        <span className="edgtf-carousel-first-image-holder edgtf-has-hover-image edgtf-image-change">
                                            <img
                                                src={exhibitor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/exhibitors/' + exhibitor.logo: "https://xpo.qodeinteractive.com/wp-content/uploads/2017/01/client100-hover.jpg"}
                                                alt="Client 11"
                                            />
                                        </span>
                                    
                                    </div>);
                                })
                            }
                            
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default Variation1;
