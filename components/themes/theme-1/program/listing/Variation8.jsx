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
} from "../utils/programs";
import {useDebounce, useDimention, useProgramId } from "../utils/customHooks";
import ProgramDetail from "../components/ProgramDetail";
const Variation8 = ({
  programs,
  eventUrl,
  tracks,
  showWorkshop,
  siteLabels,
  agendaSettings,
  eventsiteSettings,
}) => {
  const {handleItemClick,showDetail,setShowDetail,detailRef,programsState}=useProgramId()
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

  return (
    <div className="ebr_program-variation8-container">
      <div style={{ padding: "60px 0 40px 0" }} className="module-section">
        <div className="container">
          <div className="ebs-variation8-filter-container d-flex justify-content-start gap-3">
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
          <div className="ebs-variation-table-container">
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
                                  <td className="text-start" style={{width:"550px", textWrap:"wrap" }} onClick={()=>{
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
                                                  backgroundColor: `${
                                                    track.color
                                                      ? track.color
                                                      : "#000"
                                                  }`,
                                                  width: "20px",
                                                  height: "20px",
                                                  borderRadius: "50%",
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
                              <td className="text-start" style={{width:"550px", textWrap:"wrap" }} onClick={()=>{
                                            handleItemClick(item,programArray)
                                            setShowDetail(true)
                                        }}>
                                {/* {`${item.topic.length>25?item.topic.substring(0,25)+"....":item.topic}`} */}
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
                                              backgroundColor: `${
                                                track.color
                                                  ? track.color
                                                  : "#000"
                                              }`,
                                              width: "20px",
                                              height: "20px",
                                              borderRadius: "50%",
                                            }}
                                          ></span>
                                        );
                                      })}
                                  <TracksPopup item={item} />
                                </div>
                              </td>
                            </tr>)      
                            }
                             </>
                          );
                        })}
                      </>
                    );
                  })}
              </tbody>
            </Table>
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
