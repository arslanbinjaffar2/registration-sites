import SliderBanner from "./components/SliderBanner";
import moment from "moment";
import React from "react";

const Variation5 = ({ banner, event }) => {
  let momentObj = moment(event.start_date + event.start_time, "YYYY-MM-DDLT");
  let eventDate = momentObj.toDate();
  return (
    <div className="main-slider-wrapper">
      {banner && (
        <SliderBanner>
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
                    <video
                      autoPlay
                      muted
                      loop
                      src={require("img/Sequence-01_5.mp4")}
                      type="video/mp4"
                    ></video>
                  </div>
                )}
                <div className="caption-wrapp">
                  <div className="col-12 align-items-center d-flex inner-caption-wrapp">
                    <div
                      style={{ position: "relative" }}
                      className="parallax-text"
                    >
                      {slides.info.title && (
                        <div
                          className="edgtf-custom-font-holder ebs-banner-title"
                          style={{
                            fontFamily: "Rubik",
                            fontSize: "100px",
                            lineHeight: "115px",
                            fontWeight: "500",
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
                          className="edgtf-custom-font-holder ebs-banner-subtitle"
                          style={{
                            marginTop: "15px",
                            fontSize: "26px",
                            lineHeight: "37px",
                            fontWeight: "400",
                            letterSpacing: "0px",
                            textAlign: "left",
                            color: "#ffffff",
                            maxWidth: 850,
                          }}
                        >
                          {slides.info.message}
                        </div>
                      )}
                      <div
                        className="edgtf-custom-font-holder"
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
  );
};

export default Variation5;
