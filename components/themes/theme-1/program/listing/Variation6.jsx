import moment from "moment";
import React, { Fragment, useEffect, useRef, useState } from "react";
import TracksPopup from "../components/TrackPopup";
import ProgramDetail from "../components/ProgramDetail";
import {BgStyles} from '../utils/programs'
import {useDimention,useProgramId} from '../utils/customHooks'
const Variation3 = ({
  programs,
  eventUrl,
  tracks,
  showWorkshop,
  siteLabels,
  eventLanguageId,
  filters,
  eventsiteSettings,
  agendaSettings,
  moduleVariation,
}) => {
  const {width}=useDimention()
  const {handleItemClick,programsState}=useProgramId()
  const [programLoc, setProgramLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState("All");
  const [showDetail,setShowDetail]=useState(false)
  const detailRef = useRef(null);
  function calculateDuration({ date, start_time, end_time }) {
    const startTime = moment(`${date} ${start_time}`);
    const endTime = moment(`${date} ${end_time}`);
    const durationMinutes = endTime.diff(startTime, "minutes");
    return durationMinutes;
  }
  
  function containsHTMLTags(str) {
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(str);
    if (isHtml) {
      return (
        <div
          className="m-0 pt-3 description truncate ebs-edgtf-post-line-clamp"
          dangerouslySetInnerHTML={{ __html: str }}
        />
      );
    } else {
      <p className="m-0 pt-3 description truncate ebs-edgtf-post-line-clamp">
        {str}
      </p>;
    }
    return;
  }
  useEffect(() => {
    let programsObj = programs;
    if (selectedDate !== "All" && selectedDate !== "") {
      programsObj = { [selectedDate]: programs[selectedDate] };
      setProgramLoc(programsObj);
    } else if (selectedDate == "All") {
      setProgramLoc(programs);
    }
  }, [selectedDate]);
  console.log(programsState,"programState variation6")
  return (
    <Fragment>
    <div
      data-fixed="false"
      className="module-section ebs-program-listing-wrapper ebs-transparent-box"
      style={BgStyles(moduleVariation)}
     
    >
      <div className="container">
        <div className="ebr_program_variation6_container mb-5">
          <div className="tabs-container d-flex gap-2 overflow-auto">
            {Object.keys({ ...{ All: "All" }, ...programs }).map((key) => {
              return (
                <div
                  className="tab-item text-center"
                  style={{
                    background: `${key == selectedDate ? "#313131" : ""}`,
                    color: `${key == selectedDate ? "#fff" : ""}`,
                  }}
                  onClick={() => setSelectedDate(key)}
                >
                  <p className="m-0">
                    {key == "All"
                      ? "All"
                      : `${moment(key).format("ddd  D , MMM")}`}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="time_workshop_program_container d-flex gap-5 align-items-start ">
            <div className="flex-column gap-5  mt-5 d-flex justify-content-between align-items-center">
              {Object.keys(programLoc).map((key) => {
                return (
                  <Fragment>
                    {programLoc[key].map(
                      ({ workshop_id, start_time, end_time }) => {
                        return (
                          <Fragment>
                          {workshop_id > 0 && (
                            <div className="time_container d-flex justify-content-between align-items-center flex-column gap-5 ">
                                <p className="fw-medium">{start_time}</p>
                                <p className="fw-medium">{end_time}</p>
                                </div>
                            )}
                            </Fragment>
                        );
                      }
                    )}
                  </Fragment>
                );
              })}
            </div>

            <div className="worksop_program_container d-flex overflow-auto">
              {Object.keys(programLoc).map((key) => {
                return (
                  <>
                    {programLoc[key].map(
                      ({
                        workshop_id,
                        program_workshop,
                        workshop_programs,
                      }) => {
                        return (
                          <>
                            {workshop_id > 0 && (
                              <div className="border-start border-top worksop_program_item border-bottom" >
                                <div className="session border-bottom p-3 fw-semibold text-center">
                                  {program_workshop}
                                </div>
                                <div className="d-flex flex-column">
                                  {workshop_programs &&
                                    workshop_programs.map((item,index,workshop_programsArray) => {
                                      const {
                                        topic,
                                        date,
                                        start_time,
                                        end_time,
                                        program_speakers,
                                        description,
                                        location,
                                        program_tracks,
                                      } = item;
                                      return (
                                        <div className="p-3 border-top" >
                                          <h4 onClick={()=>{
                                            handleItemClick(item,workshop_programsArray)
                                            setShowDetail(true)
                                          }}>{topic}</h4>
                                          <p>
                                            {" "}
                                            {moment(
                                              `${date} ${start_time}`
                                            ).format("HH:mm")}{" "}
                                            -{" "}
                                            {moment(
                                              `${date} ${end_time}`
                                            ).format("HH:mm")}{" "}
                                            (
                                            {calculateDuration({
                                              date: date,
                                              start_time: start_time,
                                              end_time: end_time,
                                            })}{" "}
                                            mins)
                                          </p>
                                          {program_speakers?.length > 0 && (
                                            <div className="d-flex gap-3 align-items-center justify-content-start ">
                                              {program_speakers
                                                ?.slice(0, 1)
                                                .map(
                                                  (
                                                    { first_name, last_name },
                                                    o
                                                  ) => (
                                                    <h6 className="fs-small fw-bold m-0">
                                                      {first_name} {last_name}
                                                    </h6>
                                                  )
                                                )}
                                            </div>
                                          )}
                                          {/* {containsHTMLTags(description)} */}
                                          {location !== "" && (
                                            <div className="d-flex gap-1 align-items-center location_container">
                                              <span className="material-symbols-outlined icon">
                                                location_on
                                              </span>
                                              <p className="text m-0">{`${
                                                location.length > 25
                                                  ? location.substring(0, 25) +
                                                    "...."
                                                  : location
                                              }`}</p>
                                            </div>
                                          )}
                                          <div className="tracks_container d-flex algin-items-center gap-2 mt-2">
                                            {program_tracks &&
                                              program_tracks.length > 0 &&
                                              program_tracks
                                                .slice(0, 3)
                                                .map(({ name, color, id }) => {
                                                  return (
                                                    <span
                                                      className="d-inline-block"
                                                      key={id + name}
                                                      data-title={name}
                                                      style={{
                                                        backgroundColor: `${
                                                          color ? color : "#000"
                                                        }`,
                                                        width: "16px",
                                                        height: "16px",
                                                        borderRadius: "50%",
                                                      }}
                                                    ></span>
                                                  );
                                                })}
                                            <TracksPopup item={item} showBorder={false}/>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      }
                    )}
                  </>
                );
              })}
                   <div className="border-start border-end border-top worksop_program_item border-bottom" >
                  <div className="session border-bottom p-3 fw-semibold text-center">
                     {siteLabels.GENERAL_OTHER}
                  </div>
               {Object.keys(programLoc).map((key) => {
                return (
                  <>
                    {programLoc[key].map(
                      (item,index,programArray) => {
                        const {
                          topic,
                          date,
                          start_time,
                          end_time,
                          program_speakers,
                          description,
                          location,
                          program_tracks,
                          workshop_id,
                        } = item;
                      
                        return (
                          <>
                            { workshop_id<=0 &&
                               <div className="d-flex flex-column">
                               <div className="p-3 border-top" >
                                 <h4 onClick={()=>{
                                            handleItemClick(item,programArray)
                                            setShowDetail(true)
                                        }}>{topic}</h4>
                                 
                                 <p>
                                   {" "}
                                   {moment(
                                     `${date} ${start_time}`
                                   ).format("HH:mm")}{" "}
                                   -{" "}
                                   {moment(
                                     `${date} ${end_time}`
                                   ).format("HH:mm")}{" "}
                                   (
                                   {calculateDuration({
                                     date: date,
                                     start_time: start_time,
                                     end_time: end_time,
                                   })}{" "}
                                   mins)
                                 </p>
                                 {program_speakers?.length > 0 && (
                                   <div className="d-flex gap-3 align-items-center justify-content-start ">
                                     {program_speakers
                                       ?.slice(0, 1)
                                       .map(
                                         (
                                           { first_name, last_name },
                                           o
                                         ) => (
                                           <h6 className="fs-small fw-bold m-0">
                                             {first_name} {last_name}
                                           </h6>
                                         )
                                       )}
                                   </div>
                                 )}
                                 {/* {containsHTMLTags(description)} */}
                                 {location !== "" && (
                                   <div className="d-flex gap-1 align-items-center location_container">
                                     <span className="material-symbols-outlined icon">
                                       location_on
                                     </span>
                                     <p className="text m-0">{`${
                                       location.length > 25
                                         ? location.substring(0, 25) +
                                           "...."
                                         : location
                                     }`}</p>
                                   </div>
                                 )}
                                 <div className="tracks_container d-flex algin-items-center gap-2">
                                   {program_tracks &&
                                     program_tracks.length > 0 &&
                                     program_tracks
                                       .slice(0, 3)
                                       .map(({ name, color, id }) => {
                                         return (
                                           <span
                                             className="d-inline-block"
                                             key={id + name}
                                             data-title={name}
                                             style={{
                                               backgroundColor: `${
                                                 color ? color : "#000"
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
                               </div>
                       </div>
                            }
                               
                          </>
                        );
                      }
                    )}
                  </>
                );
              })}
              </div>
            </div>
          </div>
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
    </Fragment>

  );
};

export default Variation3;
