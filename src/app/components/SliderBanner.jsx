import React, { Component } from 'react';
import Slider from "react-slick";
import Countdown, { zeroPad } from "react-countdown";
const Completionist = () => <h2>This event is going on.</h2>;

// Renderer callback with condition
const renderer = ({ days,hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="countdown-wrapp d-flex">
        <span className="edgtf-countdown is-countdown">
          <span className="countdown-amount">{zeroPad(days)}</span>
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
    );
  }
};
export default class SliderBanner extends Component {
  componentDidMount() {
    window.addEventListener("scroll", function (e) {
      var scrolled = window.pageYOffset;
      const background = document.querySelectorAll(".parallax-backgroud");
      for (let i = 0; i < background.length; i++) {
        const element = background[i];
        element.style.backgroundPosition = `50%  ${-(scrolled * 0.2)}px`;
        
      }
    });
  }
  render() {
    var settings = {
      dots: true,
      fade: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      adaptiveHeight: true,
    };
    return (
      <div className={`banner-wrapper ${this.props.countdown && 'countdown'} ${this.props.fullscreen && 'slider-fullscreen'}`}>
        <Slider {...settings}>
          {this.props.children}
        </Slider>
        {this.props.countdown && (
          <div className="timer-wrapper">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-7">
                    <Countdown date={this.props.countdown} renderer={renderer} />
                </div>
                <div className="col-5"><h2>Countdown to Conference </h2></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
