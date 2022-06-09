import moment from "moment";
import React from "react";
import { useState } from "react";
import ReactSelect from 'react-select';
import Slider from "react-slick";
import HeadingElement from "@/ui-components/HeadingElement";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className}
    style={{ ...style }}
    onClick={onClick}
  >
   <i className="material-icons">chevron_right</i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className}
      style={{ ...style }}
      onClick={onClick}
    >
     <i className="material-icons">chevron_left</i>
      </div>
  );
}
const customStyles = {
  control: base => ({
    ...base,
    height: 60,
    minHeight: 60,
    backgroundColor: '#F4F4F4',
    borderColor: '#ced4da',
    width: '100%',
    maxWidth: '100%'
  })
};
const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  centerMode: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};
const Variation1 = ({ programs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <React.Fragment>
      {programs && (
        <div data-fixed="false" style={{ padding: "80px 0" }} className="module-section ebs-program-listing-wrapper">
      <div className="container">
        <HeadingElement dark={false} label={'Schedule Programs'} desc={''} align={'center'} />
      </div>
      <div className="ebs-program-top">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-5">
            </div>
            <div className="col-md-7">
              <div className="row flex-row-reverse">
               
                <div className="col-md-5 col-6">
                  <ReactSelect
                    styles={customStyles}
                    placeholder="Select track"
                    components={{ IndicatorSeparator: null }}
                    options={[
                      { value: '24-12-2022', label: '24-12-2022' },
                      { value: '25-12-2022', label: '25-12-2022' },
                      { value: '26-12-2022', label: '26-12-2022' },
                    ]}
                  />
                </div>
                <div className="col-md-5 col-6">
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="container">
          <div className="ebs-programs-date">
            <Slider {...settings}>
              <div className="ebs-date-box ebs-active">
                <a href="#!">1 Oct</a>
              </div>
              <div className="ebs-date-box">
                <a href="#!">2 Oct</a>
              </div>
              <div className="ebs-date-box">
                <a href="#!">3 Oct</a>
              </div>
              <div className="ebs-date-box">
                <a href="#!">4 Oct</a>
              </div>
              <div className="ebs-date-box">
                <a href="#!">5 Oct</a>
              </div>
              <div className="ebs-date-box">
                <a href="#!">6 Oct</a>
              </div>
              <div className="ebs-date-box">
                <a href="#!">7 Oct</a>
              </div>
              <div className="ebs-date-box">
                <a href="#!">8 Oct</a>
              </div>
            </Slider>
          </div>
          <div className="ebs-main-program-listing">
            {programs && programs.map((item,k) =>
              <div key={k} className="ebs-program-parent">
                {item.map((list,i) =>
                <div key={i} className="ebs-program-child">
                  <div className="row d-flex">
                    <div className="col-lg-2">
                      {!list.hide_time && <div className='ebs-program-date'>{moment(new Date(`${list.date} ${list.start_time}`)).format('HH:mm')} - {moment(new Date(`${list.date} ${list.end_time}`)).format('HH:mm')}</div>}
                    </div>
                    <div className="col-lg-10">
                      <div className="ebs-program-content">
                        {list.topic && <h3>{list.topic}</h3>}
                        {list.location && <div className="ebs-program-location">
                          <i className="fa fa-map-marker"/> {list.location}
                        </div>}
                        <div className="ebs-tracks-program">
                          <span style={{backgroundColor: '#D69417'}}>TOMORROW’S SECURITY THREATS</span>
                          <span style={{backgroundColor: '#278D1F'}}>TOMORROW’S SECURITY THREATS IN COUNTRY 87</span>
                        </div>
                        {list.description && <div className='ebs-description' dangerouslySetInnerHTML={{__html: list.description}} />}

                        <div className="row d-flex ebs-program-speakers">
                          {list.program_speakers.map((speakers,o) =>
                            <div key={o} className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
                              <img  src={
                                speakers.image && speakers.image !== ""
                                  ? process.env.REACT_APP_EVENTCENTER_URL +
                                    "/assets/attendees/" +
                                    speakers.image
                                  : require("img/user-placeholder.jpg")
                              } alt="" />
                              <h4>{speakers.first_name} {speakers.last_name}</h4>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                <div className="ebs-program-parent ebs-program-workshop">
                  <div className="ebs-workshop-header">Morning Sessions  ( 10:30 - 12:00 ) <i className="material-icons">expand_more</i></div>
                  {item.map((list,i) =>
                  <div key={i} className="ebs-program-child">
                    <div className="row d-flex">
                      <div className="col-lg-2">
                        {!list.hide_time && <div className='ebs-program-date'>{moment(new Date(`${list.date} ${list.start_time}`)).format('HH:mm')} - {moment(new Date(`${list.date} ${list.end_time}`)).format('HH:mm')}</div>}
                      </div>
                      <div className="col-lg-10">
                        <div className="ebs-program-content">
                          {list.topic && <h3>{list.topic}</h3>}
                          {list.location && <div className="ebs-program-location">
                            <i className="fa fa-map-marker"/> {list.location}
                          </div>}
                          <div className="ebs-tracks-program">
                            <span style={{backgroundColor: '#D69417'}}>TOMORROW’S SECURITY THREATS</span>
                            <span style={{backgroundColor: '#278D1F'}}>TOMORROW’S SECURITY THREATS IN COUNTRY 87</span>
                          </div>
                          {list.description && <div className='ebs-description' dangerouslySetInnerHTML={{__html: list.description}} />}

                          <div className="row d-flex ebs-program-speakers">
                            {list.program_speakers.map((speakers,o) =>
                              <div key={o} className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
                                <img  src={
                                  speakers.image && speakers.image !== ""
                                    ? process.env.REACT_APP_EVENTCENTER_URL +
                                      "/assets/attendees/" +
                                      speakers.image
                                    : require("img/user-placeholder.jpg")
                                } alt="" />
                                <h4>{speakers.first_name} {speakers.last_name}</h4>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
      )}
    </React.Fragment>
  );
};

export default Variation1;
