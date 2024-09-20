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
    <div title={items.topic} className={`${items.program_workshop ? 'ebs-workshop' : ''} w-100 mb-5`}>
      <div className="d-flex gap-3">
        {Number(program_setting.agenda_display_time) === 1 && (
          <div className="time">{items.start_time} - {items.end_time}</div>
        )}
     
          <div class="ebs-content">
            <div style={{cursor: 'pointer'}} onClick={() => onClick(items)} className="title  fw-semibold mb-2 d-flex gap-3 align-items-center">
            <span>{items.topic}</span>
            <span class="material-icons">info</span>
            </div>
            {items.program_tracks && <div className="tracks">
              {items.program_tracks.map((track, k) =>
                <span className='rounded-5 px-3 py-1 text-white fw-400 me-1' style={{backgroundColor: track.color ? track.color : '#000'}} key={k}>{track.name}
                </span>
              )}
            </div>}
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

  
  const handleClick = (data) => {
    if (!isActive) {
      setPopup(!popup);
      setPopupData(data);
      isActive = false;
    }
  };
  
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
      <div  className="ebs-timeline-wrapper">
        <div>
          <div id="ebs-timeline-variation">
            {data && data.program_array.map((items, k) =>(
            <React.Fragment key={k}>
                <div className={`object-row ${getWorkShop(items) ? 'ebs-workshop-wrapp' : ''} ${items[0].workshop_id > 0 ? 'ebs-wrapper-theme-'+themecounter : ''}`}>
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

const Variation4 = ({programs, eventUrl, tracks, showWorkshop, siteLabels, agendaSettings,moduleVariation}) => {

    const [schedule, setSchedule] = useState(Object.keys(programs));
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [currentTime, setcurrentTime] = useState(moment().format('HH:mm:ss'));
    const [selectedDate, setSelectedDate] = useState({value:schedule[0], label:schedule[0]});
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [location, setLocation] = useState([]);
    const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color,padding: '80px 0 0'} : {padding: '80px 0 0'}
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



    return (
       <div style={bgStyle} className="module-section">
           <div className="container">
                <div className="ebs-timeline-area">
									<div className="ebs-top-area">
										<div className="row d-flex gap-md-0 gap-2 align-items-center">
												<div className='col-md-3'>
                          <ReactSelect
                            styles={customStyles}
                            placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                            components={{ IndicatorSeparator: null }}
                            onChange={(date)=>{onDateChange(date)}}
                            value={selectedDate}
                            options={Object.keys(programs).reduce((ack, key)=>([...ack, {value:key,label:key}]),[])}
                          />
												</div>
                        {tracks.length > 0 && <div className='col-md-3'>
                          <ReactSelect
                            styles={customStyles}
                            placeholder={siteLabels.EVENTSITE_SELECT_TRACK}
                            components={{ IndicatorSeparator: null }}
                            onChange={(track)=>{onTrackChange(track)}}
                            value={selectedTrack}
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
                        <div className='col-md-3'>
                          <ReactSelect
                            styles={customStyles}
                            placeholder={'Select Location'}
                            components={{ IndicatorSeparator: null }}
                            onChange={(location)=>{setSelectedLocation(location)}}
                            value={selectedLocation}
                            options={location}
                          />
												</div>
											
										</div>
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

export default Variation4


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
