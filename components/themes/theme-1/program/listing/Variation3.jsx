import React, { useState, useEffect, Fragment, useRef, useCallback } from 'react';
import HeadingElement from "components/ui-components/HeadingElement";
import ProgramItem2 from "components/themes/theme-1/program/components/ProgramItem2";
import WorkShop from "components/themes/theme-1/program/components/WorkShop";
import ReactSelect from 'react-select';
import { localeProgramMoment } from 'helpers/helper';
import moment from 'moment';
import ProgramDetail from '../components/ProgramDetail';
import CustomFilter from '../components/customFilters'
import WorkShopTitle from '../components/workshopTitle';
import { useDispatch } from 'react-redux';
import {setProgramDetail} from '../../../../../store/Slices/ProgramListingSlice'
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
const Variation3 = ({ programs, eventUrl, tracks, showWorkshop, siteLabels, eventLanguageId, filters, eventsiteSettings, agendaSettings,moduleVariation }) => {
  const dispatch=useDispatch()
  const [width,setWidth]=useState(window.innerWidth)
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedLocation,setSelectedLocation]=useState(null)
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
  const onLocationChange=(location)=>{
    setSelectedLocation(location)
  }
  const onTrackChange = (track) => {
    setSelectedTrack(track);
  }
  const handleItemClick = (item, programArray) => {
    setProgramsState({...programsState, id: item.id, programArray });
    dispatch(setProgramDetail({id:item.id}))
  };
   const handleResetFilters = () => {
    setValue('');
    setSelectedTrack({ value: 0, label: siteLabels.EVENTSITE_SELECT_TRACK }); 
    setSelectedDate({ value: 0, label: siteLabels.EVENTSITE_SELECT_DAY })
    setSelectedLocation({ value: 0, label: "Select Location" })
  };
  const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color} : {}
  
  const getProgramsByTrack = useCallback((programs, track) => {
    const items = programs.reduce((ack, program) => {
      if (program.program_tracks.length > 0) {
        const find = program.program_tracks.find((item) => (item.name === track));
        if (find !== null && find !== undefined) {
          ack.push(program);
        }
      }
      return ack;
    }, []);
    return items;
  }, [programs]);

  const getProgramsByLocation = useCallback((programs, location) => {
    const newObject = {};
    Object.keys(programs).forEach((date) => {
      const items = programs[date].reduce((ack, program) => {
        if (program.location === location) {
          ack.push({ ...program });
        }
        // else if (program.workshop_id > 0) {
        //   const find = worshopProgramsByLocation(program, location);
        //   if (find.length > 0) {
        //     ack.push({ ...program, 'workshop_programs': find });
        //   }
        // }
        return ack;
      }, []);
      if (items.length > 0) {
        newObject[date] = items;
      }
    });
    return newObject;
  }, [programs]);

  const worshopProgramsByTracks = useCallback((programs, track) => {
    const items = programs.reduce((ack, program) => {
      if (program.program_tracks.length > 0) {
        const find = program.program_tracks.find((item) => (item.name === track));
        if (find !== null && find !== undefined) {
          ack.push(program);
        }
      }
      return ack;
    }, []);
    return items;
  }, [programs]);

  const worshopProgramsByLocation = useCallback((programs, location) => {
    const items = programs.reduce((ack, program) => {
      const find = program.workshop_programs.find((item) => (item.name === location));
      if (find !== null && find !== undefined) {
        ack.push(program);
      }
      return ack;
    }, []);
    return items;
  }, [programs]);

  const searchThroughProgram = useCallback((programs, searchText) => {
    const regex = new RegExp(searchText, 'i'); // create a case-insensitive regex
    const newObject = {};
    Object.keys(programs).forEach((date) => {
      const items = programs[date].reduce((ack, program) => {
        let add = false;

        // Search in program_workshop
        if (program.program_workshop && regex.test(program.program_workshop)) {
          add = true;
        }

        // Search in topic
        if (program.topic && regex.test(program.topic)) {
          add = true;
        }

        // Search in description
        if (program.description && regex.test(program.description)) {
          add = true;
        }

        // Search in location
        if (program.workshop_id > 0 && program.location && regex.test(program.location)) {
          add = true;
        }
        if (program.program_workshop && regex.test(program.program_workshop)) {
          add = true;
        }

        // Search in program_tracks
        if (program.program_tracks && program.program_tracks.length > 0) {
          const trackSearch = program.program_tracks.filter((track) => regex.test(track.name));
          if (trackSearch.length > 0) {
            add = true;
          }
        }

        // Search in program_speakers
        if (program.program_speakers && program.program_speakers.length > 0) {
          const speakerSearch = program.program_speakers.filter((speaker) => {
            return regex.test(speaker.first_name) || regex.test(speaker.last_name) ||
              (speaker.info && (regex.test(speaker.info.company_name) || regex.test(speaker.info.title)));
          });
          if (speakerSearch.length > 0) {
            add = true;
          }
        }

        // Search in workshop programs
        if (program.workshop_id > 0) {
          const search = searchThroughworshopPrograms(program.workshop_programs, searchText);
          if (search.length > 0) {
            ack.push({ ...program, 'workshop_programs': search });
          }
        }

        if (add) {
          ack.push(program);
        }
        return ack;
      }, []);
      if (items.length > 0) {
        newObject[date] = items;
      }
    });
    return newObject;
  }, [programs]);

  const searchThroughworshopPrograms = useCallback((programs, searchText) => {
    const regex = new RegExp(searchText, 'i'); // create a case-insensitive regex
    const items = programs.filter((program) => {
      return regex.test(program.topic);
    });
    return items;
  }, [programs]);

  useEffect(() => {
    const filteredPrograms = programs;
    if (selectedDate !== null && selectedDate.value !== 0) {
      filteredPrograms = { [selectedDate.value]: programs[selectedDate.value] };
    }
    if (selectedTrack !== null && selectedTrack.value !== 0) {
      filteredPrograms = getProgramsByTrack(filteredPrograms, selectedTrack.value);
    }
    if (selectedLocation !== null && selectedLocation.value !== 0) {
      filteredPrograms = getProgramsByLocation(filteredPrograms, selectedLocation.value);
    }
    if (search !== '') {
      filteredPrograms = searchThroughProgram(filteredPrograms, search.toLowerCase());
    }
    setProgramsLoc(filteredPrograms);
  }, [programs, selectedDate, selectedTrack, selectedLocation, search]);

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
    <div data-fixed="false" className="module-section ebs-program-listing-wrapper ebs-transparent-box" style={bgStyle}>
      {/* <div className="container">
        <HeadingElement dark={false} label={'Schedule Programs'} desc={''} align={'center'} />
      </div> */}
    <CustomFilter
    filters={filters}
    customStyles={customStyles}
    siteLabels={siteLabels}
    programs={programs}
    showFilter={showFilter}
    eventsiteSettings={eventsiteSettings}
    setShowFilter={setShowFilter}
    handleResetFilters={handleResetFilters}
    setValue={setValue}
    value={value}
    selectedTrack={selectedTrack}   
    tracks={tracks} 
    selectedLocation={selectedLocation}
    setSelectedLocation={setSelectedLocation}
    onTrackChange={onTrackChange}
    onDateChange={onDateChange}
    selectedDate={selectedDate}
    onLocationChange={onLocationChange}
    />
      {Object.values(programsLoc).length==0 && <div className='p-3 bg-body rounded-2 fw-medium text-capitalize text-center'>{siteLabels.EVENT_NORECORD_FOUND}</div>}
      <div className="container mt-30" >
        <div className="ebs-main-program-listing">
          {Object.values(programsLoc).length >0 && programsLoc && Object.keys(programsLoc).map((key, k) => (
            <div className="ebs-program-parent" key={k}>
              {programsLoc[key][0] && <div className="ebs-date-background  rounded-4px">{localeProgramMoment(eventLanguageId, programsLoc[key][0].date)}</div>}
              {programsLoc[key].map((item, i) => (
                <div className='mt-3'  key={`${item.id}3 + ${i}`}>
                  {item.workshop_id > 0 ? <WorkShopTitle handleItemClick={handleItemClick} programsState={programsState} setProgramsState={setProgramsState} 
                  eventUrl={eventUrl} labels={siteLabels} program={item} agendaSettings={agendaSettings} setShowProgramDetail={setShowDetail}  showDetail={showDetail}/>:
                  <ProgramItem2 programList={programsLoc[key]} handleItemClick={handleItemClick} setShowDetail={setShowDetail} showDetail={showDetail} 
                  program={item} key={i} eventUrl={eventUrl} labels={siteLabels} agendaSettings={agendaSettings} showWorkshop={showWorkshop}
                  />}
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


// const getProgramsByTrack = useCallback( (programs, track) => {
//   const newObject = {};
//   Object.keys(programs).forEach((date) => {
//     const items = programs[date].reduce((ack, program) => {
//       if (program.workshop_id > 0) {
//         const find = worshopProgramsByTracks(program.workshop_programs, track);
//         if (find.length > 0) {
//           ack.push({ ...program, 'workshop_programs': find });
//         }
//       }
//       else if (program.program_tracks.length > 0) {
//         const find = program.program_tracks.find((item) => (item.name === track));
//         if (find !== null && find !== undefined) {
//           ack.push(program);
//         }
//       }
//       return ack;
//     }, []);
//     if (items.length > 0) {
//       newObject[date] = items;
//     }
//   });
//   return newObject;

// },[])

