import SliderBanner from "./components/SliderBanner";
import moment from "moment";
import React from "react";

const Variation4 = ({ banner, event }) => {
  let momentObj = moment(
    event.start_date + event.start_time,
    "YYYY-MM-DDLT"
  );
  let eventDate = momentObj.toDate();
  return (
    <div className="container">
      <div className="main-slider-wrapper">
        {banner && (
          <SliderBanner
            countdown="Apr 19 2022, 17:00" //{this.state.eventdate}
          >
            {banner.map((slides, i) => (
              <div key={i} className="slide-wrapper">
                <div
                  style={{
                    backgroundImage: `url(${
                      slides && Number(slides.video_type) === 1
                        ? process.env.REACT_APP_EVENTCENTER_URL + slides.image
                        : require("img/h1-parallax1.jpg")
                    })`,
                    backgroundPosition: "50% 0",
                  }}
                  className="background parallax-backgroud"
                >
                  {Number(slides.video_type) === 2 && (
                    <div className="video-fullscreen">
                      <video autoPlay muted loop src={`${process.env.REACT_APP_EVENTCENTER_URL}/${slides.image}`} type="video/mp4"></video>
                    </div>
                  )}
                  <div className="caption-wrapp">
                    <div className="col-12 align-items-center justify-content-center d-flex inner-caption-wrapp">
                      <div
                        style={{ position: "relative" }}
                        className="parallax-text"
                      >
                        {slides.info.title && (
                          <div
                            className="edgtf-custom-font-holder text-center ebs-banner-title"
                            style={{
                              fontFamily: "Rubik",
                              fontSize: "80px",
                              lineHeight: "100px",
                              fontWeight: "400",
                              textTransform: "uppercase",
                              textAlign: "left",
                              color: "#ec008c",
                            }}
                          >
                            <span style={{ color: "#fff" }}>
                              {" "}
                              {slides.info.title}{" "}
                            </span>
                          </div>
                        )}
                        {slides.info.message && (
                          <div
                            className="edgtf-custom-font-holder text-center ebs-banner-subtitle"
                            style={{
                              margin: "10px auto 0",
                              fontSize: "26px",
                              lineHeight: "37px",
                              fontWeight: "400",
                              letterSpacing: "0px",
                              maxWidth: 900,
                              textAlign: "left",
                              color: "#ffffff",
                            }}
                          >
                            {slides.info.message}
                          </div>
                        )}
                        <div
                          className="edgtf-custom-font-holder text-center"
                          style={{
                            marginTop: "40px",
                            fontSize: "26px",
                            lineHeight: "37px",
                            fontWeight: "400",
                            letterSpacing: "0px",
                            textAlign: "left",
                            color: "#ffffff",
                          }}
                        >
                          <a href="" style={{ fontFamily: 'Rubik', marginRight: '0', fontSize: '15px', fontWeight: '500', background: 'transparent', border: '2px solid #fff', color: '#fff', padding: '17px 48px 15px' }} className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">REGISTER</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SliderBanner>
        )}
      </div>
    </div>
  );
};

export default Variation4;
