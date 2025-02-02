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

  // Initialize the result object with locations from data.location (case-insensitive)
  const locationResult = {};
  data.location.forEach(location => {
      if (location.value === "") return;
    // Convert location to lower case for case-insensitive matching
    const lowerCaseLocation = location.value.toLowerCase();
    locationResult[lowerCaseLocation] = [];
  });

  // Group items by location (case-insensitive)
  data.program_array.forEach(item => {
    // Convert item location to lower case for case-insensitive matching
    const itemLocation = item.location.toLowerCase();
    
    // Ensure the location exists in the result object
    if (locationResult[itemLocation]) {
      locationResult[itemLocation].push(item);
    }
  });

  // Convert result object to the desired format
  const resultArray = Object.keys(locationResult).map(location => ({
    location: location,
    items: locationResult[location]
  }));

  resultArray.forEach((location, a) => {
   var itemArray = [];
   var i = 0;
   var _lastTime = '00:00';
   location.items.forEach((items, k) => {
     const _end = moment(items.start_time, "HH:mm");
     const _last = moment(_lastTime, "HH:mm");
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
    location.items = itemArray;
  });
  data.program_array = resultArray;
  return data;
}





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
      <div  className="w-100 h-100 position-relative">
        <div style={{marginTop: 43}} className="position-absolute overflow-hidden ebs-time-line-location border-end border-start h-100">
          {data && data.program_array.map((location, i) =>
              <React.Fragment key={i}>
                {location && location.items.length > 0 && <div   className='border-top d-flex align-items-center justify-content-center' style={{height: location.items.length*160 }}>
                  <div>
                     <i className="material-icons fs-2">place</i>
                     <br />
                  {location.location}
                  </div>
                 </div>}
                </React.Fragment>
          )}
        </div>
        <div  style={{cursor: 'move'}} id="timelindeschdle" className="ebs-timeline-wrapper">
        <div style={{ width: _width }}  id="timelinewrapp">
          <div id="currentTimeline" />
          <TimelineHeader />
          <div id="timelinecontent">
            {data && data.program_array.map((location, i) =>(
            <div className='border-top' style={{marginTop: -1}} key={i}>
                {location && location.items.length > 0 && location.items.map((items, k) =><React.Fragment>
                  <div style={{borderTop: '1px solid transparent'}} className={`datarow   ${getWorkShop(items) ? 'ebs-workshop-wrapp' : ''} ${items[0].workshop_id > 0 ? 'ebs-wrapper-theme-'+themecounter : ''}`}>
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
                </React.Fragment>)}
              </div>)
            )}
          </div>
        </div>
      </div>
      </div>
    </React.Fragment>
  )
}

const Variation5 = ({programs, eventUrl, tracks, showWorkshop, siteLabels, agendaSettings,moduleVariation}) => {
    const [schedule, setSchedule] = useState(Object.keys(programs));
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [currentTime, setcurrentTime] = useState(moment().format('HH:mm:ss'));
    const [selectedDate, setSelectedDate] = useState({value:schedule[0], label:schedule[0]});
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [location, setLocation] = useState([]);
    const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color,padding: '80px 120px 0 120px'} : {padding: '80px 120px 0 120px'}
    const [programsLoc, setProgramsLoc] = useState(programs[schedule[0]].reduce((ack, program)=>{
        if(program.workshop_id > 0){
            return [...ack, ...program.workshop_programs.map((item)=>({...item, 'program_workshop':program.program_workshop, 'workshop_id':program.workshop_id}))];
        }
        ack.push(program);
        return ack;
    }  ,[]));

    const onDateChange = (date)=>{
        setSelectedDate(date);
        setSelectedTrack(null);
        setSelectedLocation(null);
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


}, [selectedDate, selectedTrack, selectedLocation]);  // Add selectedLocation to dependencies

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
       <div style={bgStyle} className="module-section border-bottom overflow-hidden responive-padding-style">
           <div className="container-fluid">
                <div className="ebs-timeline-area">
									<div className="ebs-top-area">
										<div className="row d-flex">
											<div className="col-md-12 d-md-flex align-items-center d-sm-block">
												<div className="ebs-select-box mobile-width-100">
                          <ReactSelect
                            styles={customStyles}
                            className='custom-track-select'
                            placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                            components={{ IndicatorSeparator: null }}
                            onChange={(date)=>{onDateChange(date)}}
                            value={selectedDate}
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
												<div className="ebs-select-box mobile-width-100">
                          <ReactSelect
                           className='custom-track-select'
                            styles={customStyles}
                            placeholder={'Select Location'}
                            components={{ IndicatorSeparator: null }}
                            onChange={(location)=>{setSelectedLocation(location)}}
                            value={selectedLocation}
                            options={location}
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
                        "location": location,
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

export default Variation5

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




