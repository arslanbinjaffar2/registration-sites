import React, { useState, useEffect } from 'react';
import HeadingElement from "components/ui-components/HeadingElement";
import ProgramItem from "components/themes/theme-1/program/components/ProgramItem";
import WorkShop from "components/themes/theme-1/program/components/WorkShop";
import ReactSelect from 'react-select';
import { localeProgramMoment } from 'helpers/helper';
import moment from 'moment';
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
const Variation1 = ({ programs, eventUrl, tracks, showWorkshop, siteLabels, eventLanguageId, filters, eventsiteSettings, agendaSettings,moduleVariation }) => {
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('')
  const handleResetFilters = () => {
    setValue('');
    setSelectedTrack({ value: 0, label: siteLabels.EVENTSITE_SELECT_TRACK }); 
    setSelectedDate({ value: 0, label: siteLabels.EVENTSITE_SELECT_DAY })
    // setSelectedLocation({ value: 0, label: "Select Location" })
  };
  const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color} : {}
  const onDateChange = (date) => {
    setSelectedDate(date);
  }

  const onTrackChange = (track) => {
    setSelectedTrack(track);
  }

  useEffect(() => {
    let programsObj = programs;
    if (selectedDate !== null && selectedDate.value !== 0) {
      programsObj = { [selectedDate[value]]: programs[selectedDate.value] };
    }
    if (selectedTrack !== null && selectedTrack.value !== 0) {
      programsObj = getProgramsByTrack(programsObj, selectedTrack.value);
    }
    if (search !== '') {
      programsObj = searchThroughProgram(programsObj, search.toLowerCase());
    }
    setProgramsLoc(programsObj);
  }, [selectedDate, selectedTrack, search]);


  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);



  return (
    <div data-fixed="false" className="module-section ebs-program-listing-wrapper ebs-transparent-box ebs-default-padding" style={bgStyle}>
      {/* <div className="container">
        <HeadingElement dark={false} label={'Schedule Programs'} desc={''} align={'center'} />
      </div> */}
      {filters && <div className="ebs-program-top">
        <div className="container">
        <div className="row d-flex align-items-center">
                      {eventsiteSettings?.agenda_search_filter === 1 && <div className="col-md-4 col-12 mb-md-0 mb-3">
                        <div style={{minWidth:"280px", maxWidth: 440 }} className="ebs-form-control-search-new border-black-color">
                          <input className="form-control border-black-color" placeholder={siteLabels.EVENTSITE_PROGRAM_SEARCH} defaultValue={value} type="text"  
                          value={value} onChange={(e) => setValue(e.target.value)} />
                        <span className="material-symbols-outlined fa">search</span>
                        </div>
                      </div>}
											<div className="col-md-7 col-12 d-flex align-items-center flex-lg-nowrap flex-wrap  gap-3">
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
                        {/* <ReactSelect
                          styles={customStyles}
                          placeholder="Select Location"
                          components={{ IndicatorSeparator: null }}
                          onChange={(location) => { onLocationChange(location)}}
                          className='custom-track-select'
                          value={trimmerselectedLocation}
                          options={locationOptions}
                          
                        /> */}
                           <div className='d-flex gap-1 align-items-center justify-content-end ms-auto ebs-reset-btn' onClick={handleResetFilters}>
                          <span className="material-symbols-outlined">restart_alt</span>
                          <span className='fs-xsmall fw-normal'>Reset filters</span>
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
      </div>}
      <div className="container">
        <div className="ebs-main-program-listing">
          {programsLoc && Object.keys(programsLoc).map((key, k) => (
            <div className="ebs-program-parent" key={k}>
              {programsLoc[key][0] && <div className="ebs-date-border" >{localeProgramMoment(eventLanguageId, programsLoc[key][0].date)}</div>}
              {programsLoc[key].map((item, i) => (
                item.workshop_id > 0 ?
                  <WorkShop item={item} key={i} eventUrl={eventUrl} showWorkshop={showWorkshop} labels={siteLabels} agendaSettings={agendaSettings}/> :
                  <ProgramItem program={item} key={i} eventUrl={eventUrl} labels={siteLabels} agendaSettings={agendaSettings}/>
              ))}
            </div>
          ))}
        </div>
        {Object.values(programsLoc).length==0 && <div className='p-3 bg-body rounded-2 fw-medium text-capitalize text-center'>{siteLabels.EVENT_NORECORD_FOUND}</div>}
      </div>
    </div>
  )
}

export default Variation1


const getProgramsByTrack = (programs, track) => {
  const newObject = {};
  Object.keys(programs).forEach((date) => {
    const items = programs[date].reduce((ack, program) => {
      if (program.workshop_id > 0) {
        const find = worshopProgramsByTracks(program.workshop_programs, track);
        if (find.length > 0) {
          ack.push({ ...program, 'workshop_programs': find });
        }
      }
      else if (program.program_tracks.length > 0) {
        const find = program.program_tracks.find((item) => (item.name === track));
        if (find !== null && find !== undefined) {
          ack.push(program);
        }
      }
      return ack;
    }, []);
    if (items.length > 0) {
      newObject[date] = items;
    }
  });
  return newObject;

}

const worshopProgramsByTracks = (programs, track) => {
  const items = programs.reduce((ack, program) => {
    if (program.program_tracks.length > 0) {
      const find = program.program_tracks.find((item) => (item.name === track));
      if (find !== null && find !== undefined) {
        ack.push(program);
      }
    }
    return ack;
  }, []);
  return items
}



const searchThroughProgram = (programs, searchText) => {
  const newObject = {};
  Object.keys(programs).forEach((date) => {
    const items = programs[date].reduce((ack, program) => {
      if (program.workshop_id > 0) {
        const search = searchThroughworshopPrograms(program.workshop_programs, searchText);
        if (search.length > 0) {
          ack.push({ ...program, 'workshop_programs': search });
        }
      }
      else {
        let add = false;

        if (program.topic && program.topic.toLowerCase().indexOf(searchText) !== -1 ||
          program.description && program.description.toLowerCase().indexOf(searchText) !== -1 ||
          program.location && program.location.toLowerCase().indexOf(searchText) !== -1
        ) {
          add = true;
        }

        if (program.program_tracks && program.program_tracks.length > 0) {
          const trackSearch = program.program_tracks.filter((track) => (track.name && track.name.toLowerCase().indexOf(searchText) !== -1));
          if (trackSearch.length > 0) {
            add = true;
          }
        }

        if (program && program.program_speakers && program.program_speakers.length > 0) {
          const trackSearch = program.program_speakers.filter((speaker) => ((speaker.first_name && speaker.first_name.toLowerCase().indexOf(searchText) !== -1 ||
          speaker.last_name && speaker.last_name.toLowerCase().indexOf(searchText) !== -1 ||
            (speaker && speaker.info && speaker.info.company_name && speaker.info.company_name.toLowerCase().indexOf(searchText) !== -1) ||
            (speaker && speaker.info && speaker.info.title && speaker.info.title.toLowerCase().indexOf(searchText) !== -1))));
          if (trackSearch.length > 0) {
            add = true;
          }
        }

        if (add) {
          ack.push(program);
        }

      }
      return ack;

    }, []);
    if (items.length > 0) {
      newObject[date] = items;
    }
  });
  return newObject;
}

const searchThroughworshopPrograms = (programs, searchText) => {
  const items = programs.reduce((ack, program) => {
    let add = false;
    if (program.topic.toLowerCase().indexOf(searchText) !== -1 ||
      program.description.toLowerCase().indexOf(searchText) !== -1 ||
      program.location.toLowerCase().indexOf(searchText) !== -1
    ) {
      add = true;
    }

    if (program.program_tracks.length > 0) {
      const trackSearch = program.program_tracks.filter((track) => (track.name.toLowerCase().indexOf(searchText) !== -1));
      if (trackSearch.length > 0) {
        add = true;
      }
    }

    if (program.program_speakers.length > 0) {
      const trackSearch = program.program_speakers.filter((speaker) => ((speaker.first_name.toLowerCase().indexOf(searchText) !== -1 ||
        speaker.last_name.toLowerCase().indexOf(searchText) !== -1 ||
        (speaker.info && speaker.info.company_name && speaker.info.company_name.toLowerCase().indexOf(searchText) !== -1) ||
        (speaker.info && speaker.info.title && speaker.info.title.toLowerCase().indexOf(searchText) !== -1))));
      if (trackSearch.length > 0) {
        add = true;
      }
    }

    if (add) {
      ack.push(program);
    }
    return ack;
  }, []);
  return items
}