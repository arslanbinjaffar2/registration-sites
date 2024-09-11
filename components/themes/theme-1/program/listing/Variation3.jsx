import React, { useState, useEffect, Fragment, useRef } from 'react';
import HeadingElement from "components/ui-components/HeadingElement";
import ProgramItem2 from "components/themes/theme-1/program/components/ProgramItem2";
import WorkShop from "components/themes/theme-1/program/components/WorkShop";
import ReactSelect from 'react-select';
import { localeProgramMoment } from 'helpers/helper';
import moment from 'moment';
import ProgramDetail from '../components/ProgramDetail';

import WorkShopTitle from '../components/workshopTitle';
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
const Variation3 = ({ programs, eventUrl, tracks, showWorkshop, siteLabels, eventLanguageId, filters, eventsiteSettings, agendaSettings }) => {
  const [width,setWidth]=useState(window.innerWidth)
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('')
  const [showDetail,setShowDetail]=useState(false)
  const detailRef = useRef(null);
  const [showFilter,setShowFilter]=useState(false)
  const [programsState,setProgramsState]=useState({
    id:0,
    programArray:[]
  })
  console.log(programsState,"programState")
  const onDateChange = (date) => {
    setSelectedDate(date);
  }

  const onTrackChange = (track) => {
    setSelectedTrack(track);
  }
  const handleItemClick = (item, programArray) => {
    setProgramsState({...programsState, id: item.id, programArray });
  };
   const handleResetFilters = () => {
    setValue('');
    setSelectedTrack({ value: 0, label: siteLabels.EVENTSITE_SELECT_TRACK }); 
  };
  
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

  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div data-fixed="false" className="module-section ebs-program-listing-wrapper ebs-transparent-box">
      {/* <div className="container">
        <HeadingElement dark={false} label={'Schedule Programs'} desc={''} align={'center'} />
      </div> */}
      {filters && <div className="ebs-program-top-new bg-white shadow-black">
        <div className="container">
          <div className="d-flex justify-content-between align-items ">
       
              {Object.keys(programs).length > 0 && <div className="">
                <ReactSelect
                  styles={customStyles}
                  placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                  components={{ IndicatorSeparator: null }}
                  onChange={(date) => { onDateChange(date) }}
                  className='custom-date-select'
                  value={selectedTrack}
                  options={Object.keys(programs).reduce((ack, key) => ([...ack, { value: key, label: moment(key).format('DD-MM-YYYY')}]), [{ value: 0, label: siteLabels.EVENTSITE_SELECT_DAY }])}
                />
              </div>}
              <div onClick={()=>setShowFilter(!showFilter)} style={{ background:`${showFilter?"#313131":""}`,color:`${showFilter?"white":""}`,width: "48px",height: "42px"}} className='border py-2 px-12 rounded-1 cursor-pointer border-black-color'>
              <span className="material-symbols-outlined">tune</span>
          </div>
            
        
          </div>
          {/* filters */}
         {showFilter && <div className="d-flex justify-content-start mt-3 gap-4 flex-wrap">
               {eventsiteSettings.agenda_search_filter === 1 && <div>
              <div style={{minWidth:"280px", maxWidth: 440 }} className="ebs-form-control-search-new border-black-color"><input className="form-control border-black-color" placeholder={siteLabels.EVENTSITE_PROGRAM_SEARCH} defaultValue={value} type="text"  value={value} onChange={(e) => setValue(e.target.value)} />
              <span className="material-symbols-outlined fa">search</span>
              </div>
              </div>}
                  {tracks.length > 0 &&
                      <div className="">
                        <ReactSelect
                          styles={customStyles}
                          placeholder={siteLabels.EVENTSITE_SELECT_TRACK}
                          components={{ IndicatorSeparator: null }}
                          onChange={(track) => { onTrackChange(track)}}
                          className='custom-track-select'
                          value={selectedTrack}
                          options={tracks.reduce((ack, item,index, array) =>{
                            // Add the current track to the accumulator
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

                                return subAck;
                              }, []));
                            }
                            return ack;
                            
                          },[{ value: 0, label: siteLabels.EVENTSITE_SELECT_TRACK }]) }
                          
                        />
                  </div>}
             <div className='d-flex gap-1 align-items-center justify-content-end ms-auto ebs-reset-btn' onClick={handleResetFilters}>
              <span className="material-symbols-outlined">restart_alt</span>
              <span className='fs-xsmall fw-normal'>Reset filters</span>
            </div>
          </div>}
        </div>
      </div>}
      {Object.values(programsLoc).length==0 && <div className='p-3 bg-body rounded-2 fw-medium text-capitalize text-center'>no program Found</div>}
      <div className="container mt-30">
        <div className="ebs-main-program-listing">
          {Object.values(programsLoc).length >0 && programsLoc && Object.keys(programsLoc).map((key, k) => (
            <div className="ebs-program-parent" key={k}>
              {programsLoc[key][0] && <div className="ebs-date-background  rounded-4px">{localeProgramMoment(eventLanguageId, programsLoc[key][0].date)}</div>}
              {programsLoc[key].map((item, i) => (
                <div className='mt-3'  key={item.id}>
                  {item.workshop_id > 0 ? <WorkShopTitle handleItemClick={handleItemClick} programsState={programsState} setProgramsState={setProgramsState} eventUrl={eventUrl} labels={siteLabels} program={item} agendaSettings={agendaSettings} setShowProgramDetail={setShowDetail}  />:
                  <ProgramItem2 programList={programsLoc[key]} handleItemClick={handleItemClick} setShowDetail={setShowDetail} showDetail={showDetail} program={item} key={i} eventUrl={eventUrl} labels={siteLabels} agendaSettings={agendaSettings} showWorkshop={showWorkshop}/>}
                </div>
              ))}
            </div>
          ))}
                   </div>
      </div>
           {width>570 &&<ProgramDetail setShowDetail={setShowDetail} ref={detailRef} programs={programsState}  showDetail={showDetail} agendaSettings={agendaSettings} eventUrl={eventUrl} labels={siteLabels}/> }
           
    </div>
  )
}

export default Variation3


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
      if( program.program_workshop && program.program_workshop.toLowerCase().indexOf(searchText) !== -1){
        ack.push({ ...program});
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
      program.location.toLowerCase().indexOf(searchText) !== -1    ) {
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