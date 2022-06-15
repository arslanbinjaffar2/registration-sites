import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import ReactSelect from 'react-select';
import Slider from "react-slick";
import HeadingElement from "@/ui-components/HeadingElement";
import ProgramItem from "./components/ProgramItem";
import WorkShop from "./components/WorkShop";
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
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  centerMode: true,
  infinite: false,
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
const Variation1 = ({ programs, tracks, siteLabels, showWorkshop, eventUrl }) => {
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

  return (
    <React.Fragment>
      {programsLoc && (
        <div data-fixed="false" style={{ padding: "80px 0" }} className="module-section ebs-program-listing-wrapper ebs-transparent-box">
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
                    onChange={(track)=>{onTrackChange(track)}}
                    value={selectedTrack}
                    options={tracks.reduce((ack, item)=>([...ack, {value:item.name,label:item.name}]),[{value:0, label:siteLabels.EVENTSITE_SELECT_TRACK}])}
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
            <Slider {...{'slidesToShow': schedule.length > 7 ? 7 : schedule.length ,...settings}}>
              {schedule && schedule.map((date,j)=>
              <div key={j} className={`ebs-date-box ${date === selectedDate ? 'ebs-active' : ''}`} onClick={()=>{ onDateChange(date) }}>
                <a href="#!">{moment(date).format('Do MMMM')}</a>
              </div>
              )}
              {/* <div  className={`ebs-date-box`}>
                <a href="#!">2 Oct</a>
              </div>
              <div  className={`ebs-date-box`}>
                <a href="#!">3 Oct</a>
              </div>
              <div  className={`ebs-date-box`}>
                <a href="#!">4 Oct</a>
              </div>
              <div  className={`ebs-date-box`}>
                <a href="#!">5 Oct</a>
              </div>
              <div  className={`ebs-date-box`}>
                <a href="#!">6 Oct</a>
              </div>
              <div  className={`ebs-date-box`}>
                <a href="#!">7 Oct</a>
              </div>
              <div  className={`ebs-date-box`}>
                <a href="#!">8 Oct</a>
              </div> */}
            </Slider>
          </div>
          <div className="ebs-main-program-listing">
              <div  className="ebs-program-parent">
                {programsLoc && programsLoc.map((item,i) =>
                      item.workshop_id > 0  ? 
                      <WorkShop item={item} key={i} eventUrl={eventUrl} showWorkshop={showWorkshop} />:
                      <ProgramItem program={item} key={i} eventUrl={eventUrl} />
                )}
              </div>
          </div>
        </div>
    </div>
    )} 
    </React.Fragment>
  );
};

export default Variation1;

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
        console.log(program.program_tracks.find((item)=>(item.name === track)));
        if(find !== null && find !== undefined){
            ack.push(program);
        }
      }  
      return ack;         
  }, []);
  return items
}
