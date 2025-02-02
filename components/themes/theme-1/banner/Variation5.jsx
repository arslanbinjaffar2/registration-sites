import SliderBanner from "./components/SliderBanner";
import React from "react";

const Variation5 = ({ banner, event, countdown, regisrationUrl, settings, registerDateEnd }) => {

  const WrapperLayout = (props) => {
  const _bgLayer = (props.slides.info?.title.length > 0 && settings.title === 1) || (props.slides.info?.message.length > 0 && settings.caption === 1) || (settings.register_button === 1);
    if (props.slides && Number(props.slides.video_type) === 1) {
      return (
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + props.slides.image
              })`,
            backgroundPosition: '50% 0', backgroundBlendMode: _bgLayer ? 'overlay' : 'normal' 
          }}
          className={`background ${!_bgLayer && 'ebs-no-opacity'}`}
        >
          {props.slides.url ? <a href={props.slides.url} target="_blank" rel="noreferrer">
              {props.children}
            </a >: props.children}
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundPosition: "50% 0",
            backgroundBlendMode: _bgLayer ? 'overlay' : 'normal' 
          }}
          className={`background ${!_bgLayer && 'ebs-no-opacity'}`}
        >
          {props.slides.url ? <a href={props.slides.url} target="_blank" rel="noreferrer">
              {props.children}
            </a >: props.children}
        </div>
      );
    }

  }

  return (
    <>
      <div className="main-slider-wrapper">
        {banner && (
          <SliderBanner 
          countdown={null}
          registerDateEnd={registerDateEnd}
          eventsiteSettings={event?.eventsiteSettings}
           >
            {banner?.map((slides, i) => (
              <div key={i} className="slide-wrapper">
                <WrapperLayout
                  slides={slides}
                >
                  {Number(slides.video_type) === 2 && (
                    <div className="video-fullscreen">
                      <video preload="auto" autoPlay playsInline muted src={`${process?.env?.NEXT_APP_EVENTCENTER_URL}/${slides?.image}`} type="video/mp4"></video>
                    </div>
                  )}
                  <div className="caption-wrapp">
                    <div className="col-12 align-items-center d-flex inner-caption-wrapp ebs-fluid-banner">
                      <div className="ebs-parallax-text-container w-100 h-100 position-absolute left-0 top-0 ">
                        <div
                          className="parallax-text"
                        >
                          {slides?.info?.title && settings?.title === 1 && (
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
                              <span style={{ color:  slides?.title_color ? slides?.title_color : "#fff" }}>
                                {" "}
                                {slides?.info?.title}{" "}
                              </span>
                            </div>
                          )}
                          {slides?.info?.message && settings?.caption === 1 && (
                            <div
                              className="edgtf-custom-font-holder ebs-banner-subtitle"
                              style={{
                                marginTop: "15px",
                                fontSize: "26px",
                                lineHeight: "37px",
                                fontWeight: "400",
                                letterSpacing: "0px",
                                textAlign: "left",
                                color:  slides?.sub_title_color ? slides?.sub_title_color : "#fff",
                                maxWidth: 850,
                              }}
                            >
                              {slides?.info?.message}
                            </div>
                          )}
                          {settings?.register_button === 1 && registerDateEnd  && <div
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
                            <a href={regisrationUrl} style={{ fontFamily: 'Rubik', marginRight: '0', fontSize: '15px', fontWeight: '500', background: 'transparent', border: '2px solid #fff', color: '#fff', padding: '17px 48px 15px' }} className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{event.labels.EVENTSITE_REGISTER_NOW2 ? event.labels.EVENTSITE_REGISTER_NOW2 : 'Register Now'}</a>
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </WrapperLayout>
              </div>
            ))}
          </SliderBanner>
        )}
      </div>
      {settings.register_button === 1 && registerDateEnd  && <div  className='ebs-mobile-register-button py-4 d-flex align-items-center justify-content-center'>
			<div className="edgtf-custom-font-holder ebs-custom-button-holder"
				style={{ marginTop: '0', fontSize: '26px', lineHeight: '37px', fontWeight: '400', letterSpacing: '0px', textAlign: 'left', color: '#444' }}>
				<a href={regisrationUrl} style={{ fontFamily: 'Rubik', marginRight: '0', fontSize: '15px', fontWeight: '500', background: 'transparent', border: '2px solid #444', color: '#444', padding: '17px 48px 15px' }} className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{event.labels.EVENTSITE_REGISTER_NOW2 ? event.labels.EVENTSITE_REGISTER_NOW2 : 'Register Now'}</a>
			</div>
		</div>}
    </>
  );
};

export default Variation5;
