import React, { useState, useEffect,useRef } from 'react';
import ProgramItem2 from "components/themes/theme-1/program/components/ProgramItem2";
import { localeProgramMoment } from 'helpers/helper';
import ProgramDetail from '../components/ProgramDetail';
import CustomFilter from '../components/customFilters'
import WorkShopTitle from '../components/workshopTitle';
import { useDispatch } from 'react-redux';
import {setProgramDetail} from '../../../../../store/Slices/ProgramListingSlice'
import {BgStyles,customStyles, getProgramsByLocation, getProgramsByTrack, searchThroughProgram} from '../utils/programs'
import {useDimention,useDebounce} from '../utils/customHooks'
import StyleVariableForTimeline from '../components/StyleVariableForTimeline'
const Variation3 = ({ programs, eventUrl, tracks, showWorkshop, siteLabels, eventLanguageId, filters, eventsiteSettings, agendaSettings,moduleVariation }) => {
  const dispatch=useDispatch()
  const [programsState,setProgramsState]=useState({
    id:0,
    programArray:[]
  })
  const [value, setValue] = useState('');
  const {width}=useDimention()
  const {search}=useDebounce(value)
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedLocation,setSelectedLocation]=useState(null)
  const [showDetail,setShowDetail]=useState(false)
  const detailRef = useRef(null);
  const [showFilter,setShowFilter]=useState(false)

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
  
 

  useEffect(() => {
    let programsObj = programs;
    if (selectedDate !== null && selectedDate.value !== 0) {
      programsObj = { [selectedDate[value]]: programs[selectedDate.value] };
    }
    if (selectedTrack !== null && selectedTrack.value !== 0) {
      programsObj = getProgramsByTrack(programsObj, selectedTrack.value);
    }
    if(selectedLocation !==null && selectedLocation.value!==0){
      programsObj=getProgramsByLocation(programsObj, selectedLocation.value)
    }
    if (search !== '') {
      programsObj = searchThroughProgram(programsObj, search.toLowerCase());
    }
    setProgramsLoc(programsObj);
  }, [selectedDate, selectedTrack, search,selectedLocation]); 
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  return (
    <div data-fixed="false" className="module-section ebs-program-listing-wrapper ebs-transparent-box" style={BgStyles(moduleVariation)}>
     <StyleVariableForTimeline bgStyle={BgStyles(moduleVariation)}/>
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
      <div className="container mt-30"  >
        <div className="ebs-main-program-listing">
          {Object.values(programsLoc).length>0 && programsLoc && Object.keys(programsLoc).map((key, k) => (
            <div className="ebs-program-parent" key={k}>
              {programsLoc[key][0] && <div className="ebs-date-background  rounded-4px">{localeProgramMoment(eventLanguageId, programsLoc[key][0].date)}</div>}
              {programsLoc[key].map((item, i) => (
                <div className='mt-3'  key={`${item.id}3 + ${i}`}>
                  {item.workshop_id > 0 ? <WorkShopTitle bgstyle={BgStyles(moduleVariation)} handleItemClick={handleItemClick} programsState={programsState} setProgramsState={setProgramsState} 
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


