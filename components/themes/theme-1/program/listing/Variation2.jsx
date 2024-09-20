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
    if (_postion <= _timelinewrapp?.offsetWidth) {
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
    cursor: 'pointer'

  } : {};
  const eventduration = moment.duration(endTime.diff(startTime));
  var _wrappWidth = (_multiplyer / 60) * eventduration.asMinutes()
  _wrappWidth = Math.round(_wrappWidth);
  return (
    <React.Fragment>
    {items.program_workshop  && showWorkshop && <div className="workkshop-box ebs-workshop" style={{ left: (hours * _multiplyer)+15, width: _wrappWidth, position:'absolute'}} >{items.program_workshop}</div>}
    <div title={items.topic} onClick={() => onClick(items)} style={{ ...styleWorkshop,left: (hours * _multiplyer)+15, width: _wrappWidth}} className={`${items.program_workshop ? 'ebs-workshop' : ''} datawrapp`}>
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
  var workshopShowns2 = [];
  let themecounter = 0;
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
function getWorkShop (items) {
  let showWorkshop = false;
  items.forEach(item => {
    if(item.workshop_id > 0) {
      if(!workshopShowns2.includes(item.workshop_id)){
        workshopShowns2.push(item.workshop_id);
        showWorkshop = true;
      }
    }
  });
if (showWorkshop) {
  if (themecounter === 5) {
    themecounter = 0
  }
    themecounter++;
}
return showWorkshop;
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
                <div className={`datarow ${getWorkShop(items) ? 'ebs-workshop-wrapp' : ''} ${items[0].workshop_id > 0 ? 'ebs-wrapper-theme-'+themecounter : ''}`}>
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

const Variation2 = ({programs, eventUrl, tracks, showWorkshop, siteLabels, agendaSettings,eventsiteSettings,moduleVariation}) => {

    const [schedule, setSchedule] = useState(Object.keys(programs));
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [currentTime, setcurrentTime] = useState(moment().format('HH:mm:ss'));
    const [selectedDate, setSelectedDate] = useState({value:schedule[0], label:schedule[0]});
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [location, setLocation] = useState([]);
    const [selectedLocation,setSelectedLocation]=useState(null)
    const [value, setValue] = useState('');
    const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color,padding: '80px 0 0'} : {padding: '80px 0 0'}
    const [programsLoc, setProgramsLoc] = useState(programs[schedule[0]].reduce((ack, program)=>{
        if(program.workshop_id > 0){
            return [...ack, ...program.workshop_programs.map((item)=>({...item, 'program_workshop':program.program_workshop, 'workshop_id':program.workshop_id}))];
        }
        ack.push(program);
        return ack;
    }  ,[]));
  
  const onLocationChange=(location)=>{
    setSelectedLocation(location)
  }
    const onDateChange = (date)=>{
        setSelectedDate(date);
    }
  
    const onTrackChange = (track) =>{
      setSelectedTrack(track);
    }

    useEffect(() => {
      // Generate the initial programs array based on the selected date
      let programsObj = programs[selectedDate.value].reduce((ack, program) => {
        // If the program has workshop programs, merge them into the list
        if (program.workshop_id > 0) {
          return [
            ...ack,
            ...program.workshop_programs.map((item) => ({
              ...item,
              'program_workshop': program.program_workshop,
              'workshop_id': program.workshop_id
            }))
          ];
        }
    // Otherwise, just add the program
    ack.push(program);
    return ack;
  }, []);
  const uniqueLocations = programsObj.reduce((acc, program) => {
    if (program.location && !acc.includes(program.location)) {
      acc.push(program.location);
    }
    return acc;
  }, []);

  // Create an array of locations formatted like the 'location' array
  const formattedLocations = [
    { value: "", label: "Select Location" }, // Default "Select Location"
    ...uniqueLocations.map((loc) => ({ value: loc.toLowerCase(), label: loc.substring(0,20) })),
  ];

  // Log the formatted location array

  setLocation(formattedLocations);

  // If either a track or location is selected, apply the filtering
  if ((selectedTrack !== null && selectedTrack.value !== 0) || (selectedLocation !== null && selectedLocation.value !== 0)) {
    programsObj = getProgramsByTrack(
      programsObj,
      selectedTrack ? selectedTrack.value : undefined,  // Use track if selected
      selectedLocation ? selectedLocation.value : undefined  // Use location if selected
    );
  }

  // Update the programsLoc state with the filtered programs
  setProgramsLoc(programsObj);


}, [selectedDate, selectedTrack, selectedLocation]);

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
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  const locationOptions = [...new Set(
    Object.values(programs).flat().filter((item) => item?.location).map((item) => item.location)
  )].map((location) => ({ value: location, label: location }));
  const trimmerselectedLocation= selectedLocation ? {...selectedLocation,label:selectedLocation?.label?.length>20?`${selectedLocation?.label?.substring(0,20)}....`:selectedLocation?.label}:{value:0,label:"select location"}

    return (
       <div style={bgStyle} className="module-section pb-5">
           <div className="container ">
              <div className="ebs-timeline-area ">
									<div className="ebs-top-area">
										<div className="row d-flex align-items-center">
                      {eventsiteSettings?.agenda_search_filter === 1 && <div className="col-md-4 col-12 mb-md-0 mb-3">
                        <div style={{minWidth:"280px", maxWidth: 440 }} className="ebs-form-control-search-new border-black-color">
                          <input className="form-control border-black-color" placeholder={siteLabels.EVENTSITE_PROGRAM_SEARCH} defaultValue={value} type="text"  
                          value={value} onChange={(e) => setValue(e.target.value)} />
                        <span className="material-symbols-outlined fa">search</span>
                        </div>
                      </div>}
											<div className="col-md-7 col-12 d-flex align-items-center flex-lg-nowrap flex-wrap gap-md-0 gap-3">
												<div className="ebs-select-box">
                          <ReactSelect
                            styles={customStyles}
                            placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                            components={{ IndicatorSeparator: null }}
                            onChange={(date)=>{onDateChange(date)}}
                            value={selectedDate}
                               className='custom-track-select'
                            options={Object.keys(programs).reduce((ack, key)=>([...ack, {value:key,label:key}]),[])}
                          />
												</div>
												{tracks.length > 0 && <div className="ebs-select-box">
                          <ReactSelect
                            styles={customStyles}
                            placeholder={siteLabels.EVENTSITE_SELECT_TRACK}
                            components={{ IndicatorSeparator: null }}
                            onChange={(track)=>{onTrackChange(track)}}
                            value={selectedTrack}
                            className='custom-track-select'
                              // options={tracks.reduce((ack, item)=>([...ack, {value:item.name,label:item.name}]),
                            // [{value:0, label:siteLabels.EVENTSITE_SELECT_TRACK}])}
                            options={tracks.reduce((ack, item,index, array) =>{
                              // Add the current track to the accumulator
                              console.log({ value: item.name, label: item.name }," value: item.name, label: item.name }")
                              ack = [...ack, { value: item.name, label: item.name }];                          
                               // If the track has sub-tracks, recursively process them
                              if (item.sub_tracks && item.sub_tracks.length > 0) {
                                ack = ack.concat(item.sub_tracks.reduce((subAck, subItem) => {
                                  // Extract the name and color from the sub-track object
                                  const { info } = subItem;
                                  const nameInfo = info.find((infoItem) => infoItem.name === 'name');
                                  // const colorInfo = info.find((infoItem) => infoItem.name === 'color');
                                  
                                  // Add the sub-track to the accumulator
                                  subAck = [...subAck, {
                                    value: nameInfo.value,
                                    label: `${nameInfo.value}`
                                  }];
                                  console.log({ subAck }," subAck label: item.name }")
                                  return subAck;
                                }, []));
                              }
                              return ack;
                              
                            },[{ value: 0, label: siteLabels.EVENTSITE_SELECT_TRACK }]) }
                          />
												</div>}
                        <ReactSelect
                          styles={customStyles}
                          placeholder="Select Location"
                          components={{ IndicatorSeparator: null }}
                          onChange={(location) => { onLocationChange(location)}}
                          className='custom-track-select'
                          value={trimmerselectedLocation}
                          options={locationOptions}
                          
                        />
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
			      {programsLoc.length>0&&
            <TimelineContent data={itemSorting({
                        "program_array": programsLoc,
                        "program_tracks": tracks,
                        "program_setting": agendaSettings,
                        "schedules": schedule,
                        "current_date": currentDate,
                        "selected_date": selectedDate,
                        "current_time": currentTime

                    })} program_setting={agendaSettings} />}
				</div>
        {programsLoc.length==0 && <div className='bg-white p-3 bg-body rounded-2 fw-medium text-capitalize text-center '>{siteLabels.EVENT_NORECORD_FOUND}</div>}
           </div>
       </div>
    )
}

export default Variation2

const getProgramsByTrack = (programs, track, location) => {

  const items = programs.reduce((ack, program) => {
    // Initialize matching variables
    let trackMatch = true;  // Default to true if no track filter
    let locationMatch = true;  // Default to true if no location filter

    // Check if track filter is applied
    if (track && track !== 0) {
      // Track filter is applied, check if program tracks match
      trackMatch = program.program_tracks.some((item) => item.name === track);

    }

    // Check if location filter is applied
    if (location && location !== 0) {
      // Location filter is applied, check if program location matches
      locationMatch = program.location && program.location.toLowerCase() === location.toLowerCase();
    }

    // Include program only if both track and location match (if they are applied)
    if (trackMatch && locationMatch) {
      ack.push(program);
    }

    return ack;
  }, []);
  return items;
};

