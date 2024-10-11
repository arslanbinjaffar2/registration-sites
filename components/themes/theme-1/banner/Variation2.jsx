import React, { useEffect } from "react";
import SliderBanner_2 from "./components/SliderBanner_2";

const TypeWriter = ({slides, innerRef}) => {
  const _typewrtiterdiv = React.useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        typeWriter();
      }, 2000);
    }
  }, []);
  const typeWriter = () => {
    function write(obj, sentence, i, cb) {
      if (sentence && i !== sentence.length) {
        setTimeout(function () {
          i++;
          obj.innerHTML =
            sentence.substr(0, i + 1) + ' <em aria-hidden="true"></em>';
          write(obj, sentence, i, cb);
        }, 200);
      } else {
        cb();
      }
    }

    function erase(obj, cb, i) {
      var sentence = obj.innerText;
      if (sentence.length !== 0) {
        setTimeout(function () {
          sentence = sentence.substr(0, sentence.length - 1);
          obj.innerText = sentence;
          erase(obj, cb);
        }, 160);
      } else {
        obj.innerText = " ";
        cb();
      }
    }

    function writeerase(obj, sentence, time, cb) {
      write(obj, sentence, 0, function () {
        setTimeout(function () {
          erase(obj, cb);
        }, time);
      });
    }

    // var sentences = ["Parties", "Lectures"];
    var sentences = "";
     sentences =  slides && slides.info.message
        ? slides.info.message.split(" ")
        : [];

    var counter = 0;

    function loop() {
      var sentence = sentences[counter % sentences.length];
      _typewrtiterdiv.current && writeerase(_typewrtiterdiv.current, sentence, 1500, loop);
     
        if (sentence && (counter % sentences.length) === 0) {
          innerRef.current.slickPause();
        }
        if (((counter % sentences.length)+1) === sentences.length) {
          innerRef.current.slickPlay();
          sentences = []
        }
      counter++;
    }

    loop();
  };

  const WrapperLayout = (props) => {
    const _bgLayer = (props.data?.info?.title.length > 0 && settings.title === 1) || (props.data?.info?.message.length > 0 && settings.caption === 1);

    if (props.data && Number(props.data.video_type) === 1) {
      return (
        <div
          data-fixed="true"
          ref={_parallax}
          style={{backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + props.data.image})`,
          backgroundBlendMode: _bgLayer ? 'overlay' : 'normal'
          }}
          className="edgtf-parallax-section-holder edgtf-parallax-section-banner full-height-banners parallax-backgroud ebs-transparent-box ebs-bg-holder"
        >
        {props.data.url ? <a href={props.data.url} target="_blank" rel="noreferrer">
              {props.children}
            </a >: props.children}
        </div>
      );
    } else if (props.data && Number(props.data.video_type) === 2) {
      return (
        <div
          data-fixed="true"
          ref={_parallax}
          style={{backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + props.data.image})`, position: 'relative',
          backgroundBlendMode: _bgLayer ? 'overlay' : 'normal'
          }}
          className="edgtf-parallax-section-holder edgtf-parallax-section-banner full-height-banners parallax-backgroud ebs-transparent-box ebs-bg-holder"
        >
        <div className="video-fullscreen">
          <video preload="auto" autoPlay playsInline muted loop src={`${process.env.NEXT_APP_EVENTCENTER_URL}/${props.data.image}`} type="video/mp4"></video>
        </div>  
        {props.data.url ? <a href={props.data.url} target="_blank" rel="noreferrer">
              {props.children}
            </a >: props.children}
        </div>
      );
    }
     else {
      return (
          <div
            data-fixed="true"
            ref={_parallax}
            className="edgtf-parallax-section-holder edgtf-parallax-section-banner full-height-banners parallax-backgroud ebs-transparent-box ebs-bg-holder"
          >
            
            {props.data.url ? <a href={props.data.url} target="_blank" rel="noreferrer">
              {props.children}
            </a >: props.children}
          </div>
      );
    }

  }
	useEffect(() => {
		if (window.innerWidth >= 991) {
			const elem = document.getElementById("ebs-header-master");
			if (elem && elem.nextSibling.dataset) {
				elem.classList.remove("ebs-light-header");
				var _nextSibling = elem.nextSibling.dataset.fixed;
				if (_nextSibling === 'true') {
					elem.classList.add('ebs-fixed-header');
				} else {
					elem.classList.add('ebs-light-header');
				}
			}
		}
	}, [])
  return (
    <div
      className="edgtf-custom-font-holder ebs-banner-title"
      style={{
        fontFamily: "Rubik",
        fontSize: "127px",
        lineHeight: "127px",
        fontWeight: "500",
        letterSpacing: "1.3px",
        textTransform: "uppercase",
        textAlign: "left",
        color: "#fff",
        minHeight: 151,
      }}
    >
      <div
        ref={_typewrtiterdiv}
        style={{
          color: slides?.sub_title_color
            ? slides?.sub_title_color
            : "#fff",
        }}
      ></div>
      <span
        style={{
          animation: "blink .7s infinite",
          color: slides?.sub_title_color
            ? slides?.sub_title_color
            : "#fff",
        }}
        className="typed-cursor"
      >
        _
      </span>
    </div>
  );
};


const Variation2 = ({
  event,
  banner,
  countdown,
  regisrationUrl,
  settings,
  registerDateEnd,
}) => {
  const [slideIndex, setslideIndex] = React.useState(0);
  const childRef = React.useRef();
  const WrapperLayout = (props) => {
    const _bgLayer =
      (props.slides.info?.title.length > 0 && settings.title === 1) ||
      (props.slides.info?.message.length > 0 && settings.caption === 1) ||
      settings?.register_button === 1;

    if (props.slides && Number(props.slides.video_type) === 1) {
      return (
        <div
          style={{
            backgroundImage: `url(${
              process.env.NEXT_APP_EVENTCENTER_URL + props.slides.image
            })`,
            backgroundPosition: "50% 0",
            backgroundBlendMode: _bgLayer ? "overlay" : "normal",
          }}
          className={`background  ${!_bgLayer && "ebs-no-opacity"}`}
        >
          {props.slides.url ? (
            <a href={props.slides.url} target="_blank" rel="noreferrer">
              {props.children}
            </a>
          ) : (
            props.children
          )}
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundPosition: "50% 0",
            backgroundBlendMode: _bgLayer ? "overlay" : "normal",
          }}
          className={`background  ${!_bgLayer && "ebs-no-opacity"}`}
        >
          {props.slides.url ? (
            <a href={props.slides.url} target="_blank" rel="noreferrer">
              {props.children}
            </a>
          ) : (
            props.children
          )}
        </div>
      );
    }
  };
  
  useEffect(() => {
    if (window.innerWidth >= 991) {
      const elem = document.getElementById("ebs-header-master");
      if (elem && elem.nextSibling.dataset) {
        elem.classList.remove("ebs-light-header");
        var _nextSibling = elem.nextSibling.dataset.fixed;
        if (_nextSibling === "true") {
          elem.classList.add("ebs-fixed-header");
        } else {
          elem.classList.add("ebs-light-header");
        }
      }
    }
  }, []);
  const handleIndex = (ind) => {
    setslideIndex(ind)
  } 

  return (
    <>
      <div
        data-fixed="true"
        className="main-slider-wrapper ebs-transparent-box"
      >
        {banner && (
          <SliderBanner_2
            countdown={null} //{dateTime}
            registerDateEnd={registerDateEnd} //{dateTime}
            slideIndex={handleIndex}
            innerRef={childRef}
            fullscreen
            eventsiteSettings={event.eventsiteSettings}
          >
            {banner.map((slides, i) => (
              <div key={i} className="slide-wrapper">
                <WrapperLayout slides={slides}>
                  {Number(slides.video_type) === 2 && (
                    <div className="video-fullscreen">
                      <video
                        muted
                        src={`${process.env.NEXT_APP_EVENTCENTER_URL}/${slides.image}`}
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
                        {slides.info.title && settings.title === 1 && (
                          <div
                            className="edgtf-custom-font-holder ebs-banner-title"
                            style={{
                              fontFamily: "Rubik",
                              fontSize: "127px",
                              lineHeight: "127px",
                              fontWeight: "500",
                              letterSpacing: "1.3px",
                              textTransform: "uppercase",
                              color: "#ec008c",
                            }}
                          >
                            <span
                              style={{
                                color: slides?.title_color
                                  ? slides?.title_color
                                  : "#fff",
                              }}
                            >
                              {" "}
                              {slides.info.title}{" "}
                            </span>
                          </div>
                        )}
                        {slides.info.message && settings.caption === 1 && (
                          <>
                            {slideIndex === i && (
                              <TypeWriter innerRef={childRef} slides={slides} />
                            )}
                          </>
                        )}
                        {settings?.register_button === 1 && registerDateEnd && (
                          <div
                            className="edgtf-custom-font-holder ebs-custom-button-holder"
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
                            <a
                              href={regisrationUrl}
                              style={{
                                fontFamily: "Rubik",
                                marginRight: "0",
                                fontSize: "15px",
                                fontWeight: "500",
                                background: "transparent",
                                border: "2px solid #fff",
                                color: "#fff",
                                padding: "17px 48px 15px",
                              }}
                              className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color"
                            >
                              {event.labels.EVENTSITE_REGISTER_NOW2
                                ? event.labels.EVENTSITE_REGISTER_NOW2
                                : "Register Now"}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </WrapperLayout>
              </div>
            ))}
          </SliderBanner_2>
        )}
      </div>
      {settings?.register_button === 1 && registerDateEnd && (
        <div className="ebs-mobile-register-button py-4 d-flex align-items-center justify-content-center">
          <div
            className="edgtf-custom-font-holder ebs-custom-button-holder"
            style={{
              marginTop: "0",
              fontSize: "26px",
              lineHeight: "37px",
              fontWeight: "400",
              letterSpacing: "0px",
              textAlign: "left",
              color: "#444",
            }}
          >
            <a
              href={regisrationUrl}
              style={{
                fontFamily: "Rubik",
                marginRight: "0",
                fontSize: "15px",
                fontWeight: "500",
                background: "transparent",
                border: "2px solid #444",
                color: "#444",
                padding: "17px 48px 15px",
              }}
              className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color"
            >
              {event.labels.EVENTSITE_REGISTER_NOW2
                ? event.labels.EVENTSITE_REGISTER_NOW2
                : "Register Now"}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Variation2;
