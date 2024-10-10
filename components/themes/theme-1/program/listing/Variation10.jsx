import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import ReactSelect from 'react-select';
import Slider from "react-slick";
import HeadingElement from "components/ui-components/HeadingElement";
import ProgramItemv2 from "components/themes/theme-1/program/components/ProgramItemv2";
import WorkShopv2 from "components/themes/theme-1/program/components/WorkShopv2";
import { localeProgramMomentHome } from 'helpers/helper';

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
    height: 38,
    minHeight: 38,
    backgroundColor: '#FBFDFF',
    borderColor: '#E9EDF0',
    width: '100%',
    maxWidth: '100%',
  })
};

const Variation10 = ({ programs, tracks, siteLabels, showWorkshop, eventUrl, language_id, agendaSettings }) => {
  const [schedule, setSchedule] = useState(Object.keys(programs));
  const [programsLoc, setProgramsLoc] = useState(programs[schedule[0]]);
  const [selectedDate, setSelectedDate] = useState(schedule[0]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const onDateChange = (date)=>{
    setSelectedDate(date);
  }
  const onTrackChange = (track) =>{
    setSelectedTrack(track);
  }
  useEffect(() => {
    let programsObj = programs[selectedDate];
    if(selectedTrack !== null && selectedTrack.value !== 0){
      programsObj = getProgramsByTrack(programsObj, selectedTrack.value);
    }
 
 setProgramsLoc(programsObj);
}, [selectedDate, selectedTrack]);

const settings = {
  dots: false,
  speed: 500,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  centerMode: false,
  infinite: false,
  slidesToShow: schedule.length >= 7 ? 7 : schedule.length,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: schedule.length >= 5 ? 5 : schedule.length,
        slidesToScroll: 3,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: schedule.length >= 3 ? 3 : schedule.length,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: schedule.length >= 2 ? 2 : schedule.length,
        slidesToScroll: 2,
        arrows: false,
      }
    }
  ]
};
  return (
    <React.Fragment>
      {programsLoc && (
        <div data-fixed="false" className="module-section ebs-program-listing-wrapper ebs-program-listing-wrapper-v2 ebs-transparent-box ebs-default-padding min-vh-100">
      <div className="container">
        <HeadingElement dark={false} label={siteLabels.EVENTSITE_PROGRAM} desc={siteLabels.EVENTSITE_PROGRAM_DETAIL} align={'center'} />
      </div>
      <div className="ebs-program-top">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-5">
            </div>
            <div className="col-md-7">
              <div className="row flex-row-reverse">
               
                <div className="col-md-5 col-6">
                  {tracks.length > 0 && <ReactSelect
                    styles={customStyles}
                    placeholder={siteLabels.EVENTSITE_SELECT_TRACK ? siteLabels.EVENTSITE_SELECT_TRACK : "Select track"}
                    components={{ IndicatorSeparator: null }}
                    onChange={(track)=>{onTrackChange(track)}}
                    value={selectedTrack}
                    options={tracks.reduce((ack, item)=>([...ack, {value:item.name,label:item.name}]),[{value:0, label:siteLabels.EVENTSITE_SELECT_TRACK}])}
                  />}
                </div>
                <div className="col-md-5 col-6">
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="container">
          <div className="ebs-programs-date px-0 rounded-pill">
            <Slider {...settings}>
              {schedule && schedule.map((date,j)=>
              <div key={j} className={`ebs-date-box ${date === selectedDate ? 'ebs-active' : ''}`} onClick={()=>{ onDateChange(date) }}>
                <a href="javascript:void(0)" >{localeProgramMomentHome(language_id,date)}</a>
              </div>
              )}
            </Slider>
          </div>
          <div className="ebs-main-program-listing ebs-main-program-listingv2">
              <div  className="ebs-program-parent">
                {programsLoc && programsLoc.map((item,i) =>
                      item.workshop_id > 0  ? 
                      <WorkShopv2 item={item} key={i} eventUrl={eventUrl} showWorkshop={showWorkshop} labels={siteLabels} agendaSettings={agendaSettings} />:
                      <ProgramItemv2 program={item} key={i} eventUrl={eventUrl} labels={siteLabels} agendaSettings={agendaSettings} />
                )}
              </div>
          </div>
        </div>
    </div>
    )} 
    </React.Fragment>
  );
};

export default Variation10;

const getProgramsByTrack = (programs, track) =>{
    const items = programs.reduce((ack, program)=>{
      if(program.workshop_id > 0){
        const find = worshopProgramsByTracks(program.workshop_programs, track);
        if(find.length > 0){
          ack.push({...program, 'workshop_programs': find });
        }
      }
      else if(program.program_tracks.length > 0){
        const find = program.program_tracks.find((item)=>(item.name === track));
        if(find !== null && find !== undefined){
            ack.push(program);
        }
      }  
      return ack;         
  }, []);
  return items;
}

const worshopProgramsByTracks = (programs, track) => {
    const items = programs.reduce((ack, program)=>{
      if(program.program_tracks.length > 0){
        const find = program.program_tracks.find((item)=>(item.name === track));
        if(find !== null && find !== undefined){
            ack.push(program);
        }
      }  
      return ack;         
  }, []);
  return items
}
