import React, {useEffect, useState} from 'react';
import moment from 'moment';
import ReactSelect from 'react-select';
import TimelinePopup from 'components/ui-components/TimelinePopup';

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

const data = {
	"data": {
    "program_array": [
      {
        "id": 6638,
        "name": "Hope",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "18:00",
        "end_time": "19:00",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 1,
        "tracks": null
      },
      {
        "id": 6719,
        "name": "Muhammad Waris",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "18:00",
        "end_time": "19:00",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 1,
        "tracks": null
      },
      {
        "id": 6640,
        "name": "p1",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "18:00",
        "end_time": "18:15",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 1,
        "tracks": null
      },
      {
        "id": 6729,
        "name": "Disable validate session check-in for voting",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "06:45",
        "end_time": "19:45",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": null
      },
      {
        "id": 6343,
        "name": "testing",
        "workshop": "Mascot AS",
        "date": "27-04-2022",
        "start_time": "13:45",
        "end_time": "14:45",
        "video": 3,
        "count_meetings": 0,
        "attachedAttendees": 1,
        "tracks": [
          "main gate",
          "right",
          "1",
          "2",
          "3",
          "MAIN GATE 2",
          "left gate"
        ]
      },
      {
        "id": 6980,
        "name": "new_program1",
        "workshop": "Mascot AS",
        "date": "27-04-2022",
        "start_time": "13:45",
        "end_time": "14:45",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": null
      },
      {
        "id": 6981,
        "name": "new_program2",
        "workshop": "Mascot AS",
        "date": "27-04-2022",
        "start_time": "13:45",
        "end_time": "14:45",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": null
      },
      {
        "id": 6344,
        "name": "football programe",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "17:00",
        "end_time": "21:00",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 1,
        "tracks": null
      },
      {
        "id": 6783,
        "name": "Program 13",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "20:30",
        "end_time": "23:30",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": null
      },
      {
        "id": 6345,
        "name": "Irfan sab",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "21:00",
        "end_time": "22:45",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 1,
        "tracks": null
      },
      {
        "id": 6346,
        "name": "Event program",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "15:30",
        "end_time": "21:30",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": ["main gate"]
      },
      {
        "id": 6347,
        "name": "Entertainment",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "15:30",
        "end_time": "22:30",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": null
      },
      {
        "id": 6348,
        "name": "meeting with client",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "16:00",
        "end_time": "20:00",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": null
      },
      {
        "id": 6349,
        "name": "hasssan",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "16:00",
        "end_time": "20:45",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": ["MAIN GATE 2", "left gate"]
      },
      {
        "id": 6364,
        "name": "Sky in not the limit",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "15:45",
        "end_time": "16:45",
        "video": 2,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": ["main gate", "right", "MAIN GATE 2", "left gate"]
      },
      {
        "id": 6342,
        "name": "meeting12",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "03:00",
        "end_time": "07:00",
        "video": 1,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": ["main gate", "right"]
      },
      {
        "id": 6362,
        "name": "leader",
        "workshop": null,
        "date": "27-04-2022",
        "start_time": "11:30",
        "end_time": "12:30",
        "video": 2,
        "count_meetings": 0,
        "attachedAttendees": 0,
        "tracks": ["MAIN GATE 2", "left gate"]
      },
      {
        "id": 6642,
        "name": "p2",
        "workshop": "sub registration testing program",
        "date": "27-04-2022",
        "start_time": "18:15",
        "end_time": "19:15",
        "video": 0,
        "count_meetings": 0,
        "attachedAttendees": 1,
        "tracks": null
      }
    ],
    "program_workshops": ["Mascot AS", "sub registration testing program"],
    "program_tracks": [
      { "id": 1079, "name": "main gate", "parent": true },
      { "id": 1080, "name": "right", "parent": false },
      { "id": 1092, "name": "1", "parent": false },
      { "id": 1093, "name": "2", "parent": false },
      { "id": 1094, "name": "3", "parent": false },
      { "id": 1081, "name": "MAIN GATE 2", "parent": true },
      { "id": 1082, "name": "left gate", "parent": false }
    ],
    "program_setting": {
      "id": 2588,
      "event_id": 2794,
      "agenda_list": 0,
      "session_ratings": 1,
      "agenda_tab": 0,
      "admin_fav_attendee": 1,
      "attach_attendee_mobile": 1,
      "qa": 1,
      "program_fav": 0,
      "show_tracks": 1,
      "show_attach_attendee": 1,
      "agenda_display_time": 1,
      "show_program_dashboard": 1,
      "show_my_program_dashboard": 1,
      "agenda_collapse_workshop": 0,
      "agendaTimer": 0,
      "agenda_search_filter": 0,
      "agenda_display_alerts": 0,
      "enable_notes": 1,
      "enable_program_attendee": 0,
      "program_groups": 1,
      "created_at": "2021-05-26T11:21:15.000000Z",
      "updated_at": "2022-04-12T00:28:08.000000Z",
      "deleted_at": null,
      "program_view": "default"
    },
    "schedules": [
      "2021-04-01",
      "2021-05-01",
      "2021-05-26",
      "2021-05-31",
      "2021-06-08",
      "2021-08-01",
      "2021-09-04",
      "2021-09-06",
      "2022-02-03"
    ],
    "current_date": "2022-02-03",
    "selected_date": "2022-02-03",
    "current_time": "18:00:00"
  }
};
let startX;
let scrollLeft;
let isDown;
let isActive = false;
const _multiplyer = window.innerWidth > 600 ? 300 : 150;
var clearTime;
var itemhack = false;

 function itemSorting(data) {
  if (itemhack) return data;
  var itemArray = [];
  var i = 0;
  var _lastTime = '00:00';
  data.program_array.forEach((items, k) => {
    const _end = moment(items.start_time, 'HH:mm');
    const _last = moment(_lastTime, 'HH:mm');
    const eventduration = moment.duration(_last.diff(_end));
    _lastTime = items.end_time;
    if (eventduration.asMinutes() <= 0) {
      if (k === 0) {
        const obj = [items];
        itemArray.push(obj);
      } else {
        itemArray[i].push(items);
      }
    } else {
      const obj = [items];
      itemArray.push(obj);
      i = i + 1;
    }
  });
  data.program_array = itemArray;
  return data;
}
const options = [
  { id: 1, name: 'Chocolate' },
  { id: 2, name: 'Strawberry' },
  { id: 3, name: 'Vanilla' }
];

const TimelineHeader = () => {
  var Numbers = Array.from({ length: 48 }, (v, k) => k + 1);
  var date = moment('00:00', 'HH:mm');
  const _width = (24 * _multiplyer) / 48;
  return (
    <div id="timelineheader">
      {Numbers.map(numbers => {
        if (numbers > 1) date = moment(date).add(30, 'm').toDate()
        return (
          <span style={{ width: _width }} key={numbers}>{moment(date).format('HH:mm')}</span>)
      }
      )}
    </div>
  )
};
const  currentTimerBar = (data) => {
  var _current = moment(data.current_time, 'HH:mm');
  var _time = moment('00:00:00', 'HH:mm');
  var _postion = 0;
  const eventduration = moment.duration(_current.diff(_time));
  const _difference = eventduration.asMinutes();
  const _timelinewrapp = document.getElementById('timelinewrapp');
  const _currentTimeline = document.getElementById('currentTimeline');
  const _timelindeschdle = document.getElementById('timelindeschdle');
  if (_difference >= 0) {
    _postion = (_multiplyer / 60) * _difference;
    if (_postion <= _timelinewrapp.offsetWidth) {
      _currentTimeline.style.left = _postion+15 + 'px';
      _currentTimeline.style.display = 'block';
      _timelindeschdle.scrollLeft = _postion+15 - 150;
      clearTime = setInterval(function () {
        _postion = (_postion + (_multiplyer / 3600))
        if (_postion <= _timelinewrapp.offsetWidth) {
          _currentTimeline.style.left = _postion+15 + 'px'
        } else {
          _currentTimeline.style.display = 'none'
        }
      }, 1000)
    }
  }
};
function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return  o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
}
const DataItem = ({  items, program_setting, onClick, showWorkshop }) => {
  const startTime = moment(items.start_time, 'HH:mm')
  const endTime = moment(items.end_time, 'HH:mm')
  const _time = moment.duration(startTime.diff(moment('00:00', 'HH:mm')));
  const hours = _time.asHours();
  // const randomColor = random_rgba();
  const randomColor = '84, 192, 159';
  const styleWorkshop = items.program_workshop ? {
    backgroundColor:`rgba(${randomColor},0.3)`,
    borderLeftColor : `rgba(${randomColor},1)`,

  } : {};
  const eventduration = moment.duration(endTime.diff(startTime));
  var _wrappWidth = (_multiplyer / 60) * eventduration.asMinutes()
  _wrappWidth = Math.round(_wrappWidth);
  console.log(showWorkshop);
  return (
    <React.Fragment>
    {items.program_workshop  && showWorkshop && <div className="workkshop-box ebs-workshop" style={{ left: (hours * _multiplyer)+15, width: _wrappWidth, position:'absolute', top:"-10px" }} >{items.program_workshop}</div>}
    <div title={items.topic} onClick={() => onClick(items)} style={{ ...styleWorkshop,left: (hours * _multiplyer)+15, width: _wrappWidth, top:`${(items.program_workshop  && showWorkshop) ? '12px' : null }` }} className={`${items.program_workshop ? 'ebs-workshop' : ''} datawrapp`}>
      <div className="title">{items.topic}</div>
      {items.program_tracks && <div className="tracks">
        {items.program_tracks.map((track, k) =>
          <span style={{backgroundColor: track.color ? track.color : '#000'}} key={k}>{track.name}</span>
        )}
      </div>}
      <div className="ebs-bottom-wrapp">
        <div className="location"><i className="material-icons">place</i> {items.location}</div>
        {Number(program_setting.agenda_display_time) === 1 && (
          <div className="time"><i className="material-icons">access_time</i> {items.start_time} - {items.end_time}</div>
        )}
        <div className="ebs-box">
          {items.video > 0 && <div className="video"><i className="material-icons">play_circle</i> {items.video}</div>}
          {items.program_speakers.length > 0 && <div className="speakers"><i className="material-icons">interpreter_mode</i> {items.program_speakers.length} </div>}
        </div>
      </div>
    </div>
    </React.Fragment>

  )
}

const TimelineContent = ({ data, program_setting }) => {
  const _width = 24 * _multiplyer;
  const [popup, setPopup] = useState(false);
  const [popupdata, setPopupData] = useState(null);
  // const [shownWorkshop, setShownWorkshop] = useState([]);
  // const [first, setfirst] = useState(false);
  var workshopShowns = [];
  useEffect(() => {
    const container = document.getElementById('timelindeschdle');

      container.addEventListener('mousedown',e => mouseIsDown(e));  
      container.addEventListener('mouseup',e => mouseUp(e))
      container.addEventListener('mouseleave',e=>mouseLeave(e));
      container.addEventListener('mousemove',e=>mouseMove(e));
    
    return () => {
      container.removeEventListener('mousedown',e => mouseIsDown(e));  
      container.removeEventListener('mouseup',e => mouseUp(e))
      container.removeEventListener('mouseleave',e=>mouseLeave(e));
      container.removeEventListener('mousemove',e=>mouseMove(e));
    }
  }, [])
  
  const handleClick = (data) => {
    if (!isActive) {
      setPopup(!popup);
      setPopupData(data);
      isActive = false;
    }
  };
  function mouseIsDown(e) {
    const container = document.getElementById('timelindeschdle');
    isDown = true;
    isActive = false;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  }
  function mouseUp(e) {
    isDown = false;
  }
  function mouseLeave(e) {
    isDown = false;
  }
  function mouseMove(e) {
    isActive = true;
    const container = document.getElementById('timelindeschdle');
    if (isDown) {
      //Move Horizontally
      const x = e.pageX - container.offsetLeft;
      const walkX = x - startX;
      container.scrollLeft = scrollLeft - walkX;
    }
  }

  return (
    <React.Fragment>
      {popup && <TimelinePopup onClick={() => handleClick('')} data={popupdata}   />}
      <div  style={{cursor: 'move'}} id="timelindeschdle" className="ebs-timeline-wrapper">
        <div style={{ width: _width }}  id="timelinewrapp">
          <div id="currentTimeline" />
          <TimelineHeader />
          <div id="timelinecontent">
            {data && data.program_array.map((items, k) =>(
            <React.Fragment key={k}>
                <div className="datarow">
                  {items.map((item, key) => {
                          var showWorkshop = false;
                          if(item.workshop_id > 0) {
                            if(!workshopShowns.includes(item.workshop_id)){
                              workshopShowns.push(item.workshop_id);
                              showWorkshop = true;
                            }
                          }
                     return <DataItem onClick={(data) => {handleClick(data)}} key={`${k}-${key}`} items={item} program_setting={program_setting} showWorkshop={showWorkshop} />
                  })}
                </div>
              </React.Fragment>)
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const Variation2 = ({programs, eventUrl, tracks, showWorkshop, siteLabels, agendaSettings}) => {

    const [schedule, setSchedule] = useState(Object.keys(programs));
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [currentTime, setcurrentTime] = useState(moment().format('HH:mm:ss'));
    const [selectedDate, setSelectedDate] = useState({value:schedule[0], label:schedule[0]});
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [programsLoc, setProgramsLoc] = useState(programs[schedule[0]].reduce((ack, program)=>{
        if(program.workshop_id > 0){
            return [...ack, ...program.workshop_programs.map((item)=>({...item, 'program_workshop':program.program_workshop, 'workshop_id':program.workshop_id}))];
        }
        ack.push(program);
        return ack;
    }  ,[]));

    const onDateChange = (date)=>{
        setSelectedDate(date);
    }
  
    const onTrackChange = (track) =>{
      setSelectedTrack(track);
    }

    useEffect(() => {
         let programsObj = programs[selectedDate.value].reduce((ack, program)=>{
            if(program.workshop_id > 0){
                return [...ack, ...program.workshop_programs.map((item)=>({...item, 'program_workshop':program.program_workshop, 'workshop_id':program.workshop_id}))];
            }
            ack.push(program);
            return ack;
        }  ,[]);


        if(selectedTrack !== null && selectedTrack.value !== 0){
          programsObj = getProgramsByTrack(programsObj, selectedTrack.value);
        }
        
        setProgramsLoc(programsObj);
      }, [selectedDate, selectedTrack]);

	useEffect(() => {
    // itemhack = true;
    currentTimerBar({
        "program_array": programsLoc,
        "program_tracks": tracks,
        "program_setting": agendaSettings,
        "schedules": schedule,
        "current_date": currentDate,
        "selected_date": selectedDate,
        "current_time": currentTime

    });
	}, [])
	const handleClick = (e,a) => {
    e.preventDefault();
    const _timelindeschdle = document.getElementById('timelindeschdle');
    if (a === 'left') {
      _timelindeschdle.scrollLeft = _timelindeschdle.scrollLeft -  (_multiplyer+15 - 150);
    } else {
      _timelindeschdle.scrollLeft = _timelindeschdle.scrollLeft +  (_multiplyer+15 - 150);
    }
    
  };
    return (
       <div style={{padding: '80px 0 0'}} className="module-section">
           <div className="container">
                <div className="ebs-timeline-area">
									<div className="ebs-top-area">
										<div className="row d-flex">
											<div className="col-md-6 d-flex align-items-center">
												<div className="ebs-select-box">
                          <ReactSelect
                            styles={customStyles}
                            placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                            components={{ IndicatorSeparator: null }}
                            onChange={(date)=>{onDateChange(date)}}
                            value={selectedDate}
                            options={Object.keys(programs).reduce((ack, key)=>([...ack, {value:key,label:key}]),[])}
                          />
												</div>
												<div className="ebs-select-box">
                          <ReactSelect
                            styles={customStyles}
                            placeholder={siteLabels.EVENTSITE_SELECT_TRACK}
                            components={{ IndicatorSeparator: null }}
                            onChange={(track)=>{onTrackChange(track)}}
                            value={selectedTrack}
                            options={tracks.reduce((ack, item)=>([...ack, {value:item.name,label:item.name}]),[{value:0, label:siteLabels.EVENTSITE_SELECT_TRACK}])}
                          />
												</div>
											</div>
											{/* <div className="col-md-6">
												<div className="right-panel-area">
													<div className="ebs-date-carousel">
														<div className="ebs-date-carousel-wrapp">
															<div className="ebs-date-carousel-box">
																Today, 30 Nov 2021
															</div>
														</div>
														<div className="ebs-date-carousel-button">
															<button className="btn"><i className="material-icons">arrow_left</i></button>
															<button className="btn right"><i className="material-icons">arrow_right</i></button>
														</div>
													</div>
												</div>
											</div> */}
										</div>
									</div>
                  <div id="timeline-arrows">
                    <button onClick={(e) => handleClick(e,'left')} className='btn'><i className="fa fa-caret-left" /></button>
                    <button onClick={(e) => handleClick(e,'right')} className='btn btn-right'><i className="fa fa-caret-right" /></button>
                  </div>
                 
					<TimelineContent  data={itemSorting({
                        "program_array": programsLoc,
                        "program_tracks": tracks,
                        "program_setting": agendaSettings,
                        "schedules": schedule,
                        "current_date": currentDate,
                        "selected_date": selectedDate,
                        "current_time": currentTime

                    })} program_setting={agendaSettings} />
				</div>
           </div>
       </div>
    )
}

export default Variation2


const getProgramsByTrack = (programs, track) =>{
      const items = programs.reduce((ack, program)=>{
                          if(program.program_tracks.length > 0){
                            const find = program.program_tracks.find((item)=>(item.name === track));
                            if(find !== null && find !== undefined){
                                ack.push(program);
                            }
                          }  
                          return ack;         
            }, []);
     return items;
  }