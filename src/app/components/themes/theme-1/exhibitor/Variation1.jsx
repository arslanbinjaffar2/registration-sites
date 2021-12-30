import Slider from "react-slick";
import React from "react";

const Variation1 = ({ exhibitors }) => {
  var settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    margin: 30,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div
      style={{ padding: "80px 5%", backgroundColor: "#f2f2f2 " }}
      className="module-section"
    >
      <div className="container">
        <div className="edgtf-title-section-holder text-center mb-4">
          <h2 className="edgtf-title-with-dots edgtf-appeared mt-0">
            Exhibitors &amp; Partners
          </h2>
          <span className="edge-title-separator edge-enable-separator"></span>
        </div>
        <div className="edgtf-carousel-holder">
          <div
            style={{ marginLeft: -15, marginRight: -15 }}
            className="edgtf-carousel edgtf-slick-slider-navigation-style"
          >
            <Slider {...settings}>
              {exhibitors.map((exhibitor, i) => {
                return (
                  <div className="edgtf-carousel-item-holder" key={i}>
                    <span
                      style={{
                        paddingLeft: 15,
                        paddingRight: 15,
                        display: "block",
                      }}
                      className="edgtf-carousel-first-image-holder"
                    >
                      <img
                        src={
                          exhibitor.logo !== ""
                            ? process.env.REACT_APP_EVENTCENTER_URL +
                              "/assets/exhibitors/" +
                              exhibitor.logo
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
  );
};

export default Variation1;
