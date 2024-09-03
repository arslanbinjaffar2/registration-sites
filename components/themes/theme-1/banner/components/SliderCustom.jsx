import React, { useEffect } from 'react';
import Slider from "react-slick";
import Countdown, { zeroPad } from "react-countdown";
import { setRegistrationEndtime } from '../../../../../helpers/helper'

const Completionist = ({ labels }) =>
  <div className="col-12">
    <h2>{labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON ? labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON : "This event is going on."}</h2>
  </div>;



const SliderCustom = (props) => {
  const videoRef = React.useRef()
  const divRef = React.useRef()
  console.clear();
  console.log(props.sliderSettings,'props.sliderSettings.dots');
  var settings = {
    dots: props.sliderSettings.dots === 'true' ? true :  false,
    arrows: props.sliderSettings.arrows === 'true' ? true :  false,
    speed: 500,
    fade: true,
    autoplay: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
    afterChange: (index) => {
    // Check if the slide contains a video element
    const hasVideo = divRef.current.querySelectorAll(`.slick-slide[data-index="${index}"] video`);
      if (hasVideo[0] && hasVideo !== undefined) {
      // Slide contains a video, handle it accordingly
      hasVideo[0].play();
      videoRef.current.slickPause();
        hasVideo[0].addEventListener('ended', () => {
        // Video has finished playing, do something
       videoRef.current.slickPlay();
      })
      
      } 
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false
        }
      }
    ]
  };
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist labels={props.event.labels} />;
    } else {
      // Render a countdown
      return (
        <React.Fragment>
          <div className="col-md-7">
            <div style={{ margin: '0 -15px' }} className="countdown-wrapp d-flex">
              {Math.floor(days / 30) > 0 && <span className="edgtf-countdown is-countdown">
                <span className="countdown-amount">{zeroPad(Math.floor(days / 30))}</span>
                <span className="countdown-period">Months</span>
              </span>}
              <span className="edgtf-countdown is-countdown">
                <span className="countdown-amount">{zeroPad(Math.floor(days % 30))}</span>
                <span className="countdown-period">Days</span>
              </span>
              <span className="edgtf-countdown is-countdown">
                <span className="countdown-amount">{zeroPad(hours)}</span>
                <span className="countdown-period">Hours</span>
              </span>
              <span className="edgtf-countdown is-countdown">
                <span className="countdown-amount">{zeroPad(minutes)}</span>
                <span className="countdown-period">Minutes</span>
              </span>
              <span className="edgtf-countdown is-countdown">
                <span className="countdown-amount">{zeroPad(seconds)}</span>
                <span className="countdown-period">Seconds</span>
              </span>
            </div>
          </div>
          <div className="col-md-5"><h2>Countdown to Conference </h2></div>
        </React.Fragment>
      );
    }
  };
  return (
    <div ref={divRef} className={`banner-wrapper ${props.countdown !== null && 'countdown'} ${props.fullscreen && 'slider-fullscreen'}`}>
      <Slider ref={videoRef} {...settings}>
        {props.children}
      </Slider>
      {props.countdown !== null && props.countdown.has_multiple_form != true && props.countdown.form_registration_end_date != '' && (
        <div className="timer-wrapper">
          <div className="container">
            <div className="row d-flex align-items-center">
              <Countdown date={setRegistrationEndtime(props.event.timezone.timezone, props.countdown.form_registration_end_date)} renderer={renderer} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SliderCustom
