import React, { useState, useEffect } from "react";
import moment from "moment";
import TracksPopup from "../components/TrackPopup";
import ReactSelect from "react-select";
import { Table } from "react-bootstrap";
import {
  searchThroughProgram,
  getProgramthroughWorkshopSessions,
  workshopTitlesOptions,
  DateOptions,
  BgStyles,
} from "../utils/programs";
import {useDebounce, useDimention, useProgramId } from "../utils/customHooks";
import ProgramDetail from "../components/ProgramDetail";
import NoRecordFound from '../../../../../components/NoRecordFound'
import ProgramDetailModal from "../components/ProgramDetailModal";
const Variation8 = ({
  programs,
  eventUrl,
  tracks,
  showWorkshop,
  siteLabels,
  agendaSettings,
  eventsiteSettings,
  moduleVariation
}) => {
  const {handleItemClick,showDetail,setShowDetail,detailRef,programsState,selectedProgram}=useProgramId()
  const {width}=useDimention()
  const [value, setValue] = useState("");
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const { search } = useDebounce(value);
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSessionChange = (session) => {
    setSelectedSession(session);
  };
  useEffect(() => {
    let programsObj = programs;
    if (selectedDate !== null && selectedDate.value !== 0) {
      programsObj = { [selectedDate[value]]: programs[selectedDate.value] };
    }
    if (selectedSession !== null && selectedSession.value !== 0) {
      programsObj = getProgramthroughWorkshopSessions(
        programsObj,
        selectedSession.value
      );
    }

    if (search !== "") {
      programsObj = searchThroughProgram(programsObj, search.toLowerCase());
    }
    setProgramsLoc(programsObj);
  }, [selectedDate, selectedSession, search]);
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  return (
    <div className="ebr_program-variation8-container" style={BgStyles(moduleVariation)}>
      <div style={{ padding: "60px 0 40px 0" }} className="module-section">
        <div className="container">
          <div className="ebs-variation8-filter-container d-flex justify-content-lg-start justify-content-center gap-3 flex-wrap">
            {eventsiteSettings?.agenda_search_filter === 1 && (
              <div>
                <div
                  style={{ minWidth: "280px", maxWidth: 440 }}
                  className="ebs-form-control-search-new border-black-color"
                >
                  <input
                    className="form-control  custom-filter-select text-white ebs-form-control-search-new"
                    placeholder={siteLabels.EVENTSITE_PROGRAM_SEARCH}
                    defaultValue={value}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <span className="material-symbols-outlined fa">search</span>
                </div>
              </div>
            )}
            <ReactSelect
              placeholder={siteLabels.EVENTSITE_SELECT_DAY}
              components={{ IndicatorSeparator: null }}
              className="custom-filter-select"
              onChange={(date) => {
                onDateChange(date);
              }}
              value={selectedDate}
              options={DateOptions(programs, siteLabels.EVENTSITE_SELECT_DAY)}
            />
            <ReactSelect
              placeholder={"Session"}
              components={{ IndicatorSeparator: null }}
              className="custom-filter-select"
              onChange={(session) => {
                onSessionChange(session);
              }}
              value={selectedSession}
              options={workshopTitlesOptions(programs)}
            />
          </div>
         {Object.keys(programsLoc).length>0&& <div className="ebs-variation-table-container">
            <Table responsive="sm" className="bg-transparent">
              <thead>
                <tr>
                  <th className="text-start">DATE</th>
                  <th className="text-start">TIME</th>
                  <th className="text-start">TITLE</th>
                  <th className="text-start">LOCATION</th>
                  <th className="text-start">TRACKS</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(programsLoc).length > 0 &&
                  programsLoc &&
                  Object.keys(programsLoc).map((key, k) => {
                    return (
                      <>
                        {programsLoc[key].map((item,index,programArray) => {
                          return (
                             <>
                             {item.workshop_id>0?(
                              <>
                              {item.workshop_programs.map((program,index,workshop_programsArray)=>{
                                return(
                                  <tr key={item.date + key + k} >
                                  <td>{moment(program.date).format("D MMM")}</td>
                                  <td>
                                    {moment(
                                      `${program.date} ${program.start_time}`
                                    ).format("HH:mm")}{" "}
                                    -{" "}
                                    {moment(`${program.date} ${program.end_time}`).format(
                                      "HH:mm"
                                    )}
                                  </td>
                                  <td className="text-start fix-text" style={{width:"550px", textWrap:"wrap" }} onClick={()=>{
                                            handleItemClick(program,workshop_programsArray)
                                            setShowDetail(true)
                                        }}>
                                  {/* {`${program.topic.length>25?program.topic.substring(0,25)+"....":program.topic}`} */}
                                   {program.topic}
                                  </td>
                                  <td>{`${
                                    program.location.length > 25
                                      ? program.location.substring(0, 25) + "...."
                                      : program.location
                                  }`}</td>
                                  <td>
                                    {" "}
                                    <div className="tracks_container d-flex algin-items-center gap-2">
                                      {program?.program_tracks &&
                                        program?.program_tracks.length > 0 &&
                                        program.program_tracks
                                          .slice(0, 3)
                                          .map((track) => {
                                            return (
                                              <span
                                                className="d-inline-block"
                                                key={track.id + track.name}
                                                data-title={track.name}
                                                style={{
                                                  "--bg-track":`${track.color?track.color:"#000"}`
                                                 }}
                                              ></span>
                                            );
                                          })}
                                      <TracksPopup item={program} />
                                    </div>
                                  </td>
                                </tr>
                                )
                              })}
                              {width <= 570 && (
                                    <ProgramDetailModal
                                      program={selectedProgram}
                                      labels={siteLabels}
                                      eventUrl={eventUrl}
                                      agendaSettings={agendaSettings}
                                      showDetail={showDetail}
                                      setShowDetail={setShowDetail}
                                    />
                                  )}
                            </>
                            
                            ):(   <tr key={item.date + key + k}>
                              <td>{moment(item.date).format("D MMM")}</td>
                              <td>
                                {moment(
                                  `${item.date} ${item.start_time}`
                                ).format("HH:mm")}{" "}
                                -{" "}
                                {moment(`${item.date} ${item.end_time}`).format(
                                  "HH:mm"
                                )}
                              </td>
                              <td className="text-start fix-text" style={{width:"550px", textWrap:"wrap" }} onClick={()=>{
                                            handleItemClick(item,programArray)
                                            setShowDetail(true)
                                        }}>
                                {item.topic}
                                </td>
                              <td>{`${
                                item.location.length > 25
                                  ? item.location.substring(0, 25) + "...."
                                  : item.location
                              }`}</td>
                              <td>
                                {" "}
                                <div className="tracks_container d-flex algin-items-center gap-2">
                                  {item?.program_tracks &&
                                    item?.program_tracks.length > 0 &&
                                    item.program_tracks
                                      .slice(0, 3)
                                      .map((track) => {
                                        return (
                                          <span
                                            className="d-inline-block"
                                            key={track.id + track.name}
                                            data-title={track.name}
                                            style={{
                                              "--bg-track":`${track.color?track.color:"#000"}`
                                             }}
                                          ></span>
                                        );
                                      })}
                                  <TracksPopup item={item} />
                                </div>
                              </td>
                            </tr>)      
                            }
                                {width <= 570 && (
                                    <ProgramDetailModal
                                      program={selectedProgram}
                                      labels={siteLabels}
                                      eventUrl={eventUrl}
                                      agendaSettings={agendaSettings}
                                      showDetail={showDetail}
                                      setShowDetail={setShowDetail}
                                    />
                                  )}
                             </>
                          );
                        })}
                      </>
                    );
                  })}
              </tbody>
            </Table>
          </div>}
          <div className="mt-4">
          {Object.keys(programsLoc).length<=0 && 
          <NoRecordFound siteLabels={siteLabels}/>
        }
        </div>
        </div>
      </div>
      {width>570 &&
      <ProgramDetail 
      setShowDetail={setShowDetail} 
      ref={detailRef} 
      programs={programsState}  
      showDetail={showDetail} 
      agendaSettings={agendaSettings} 
      eventUrl={eventUrl} 
      labels={siteLabels}/> } 
    </div>
  );
};

export default Variation8;
