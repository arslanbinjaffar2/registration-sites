import React, { useState, useEffect, Fragment } from "react";
import ReactSelect from "react-select";
import moment from "moment";
import StyleVariableForTimeline from "../components/StyleVariableForTimeline";
import Timeline from "../components/timeline";
import {
  BgStyles,
  customStyles,
  getProgramsByLocation,
  getProgramsByTrack,
  searchThroughProgram,
} from "../utils/programs";
import { useDimention, useDebounce, useProgramId } from "../utils/customHooks";
import ProgramDetail from "../components/ProgramDetail";
const Variation7 = ({
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
  const {handleItemClick,showDetail,setShowDetail,detailRef,programsState}=useProgramId()
  const { width } = useDimention();
  const [value, setValue] = useState("");
  const { search } = useDebounce(value);
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAllOtherPrograms, setShowAllOtherPrograms] = useState(6);
  const [showWorkshopPrograms, setShowWorkshopPrograms] = useState(6);

  
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleResetFilters = () => {
    setValue("");
    setSelectedTrack({ value: 0, label: siteLabels.EVENTSITE_SELECT_TRACK });
    setSelectedDate({ value: 0, label: siteLabels.EVENTSITE_SELECT_DAY });
    setSelectedLocation({ value: 0, label: "Select Location" });
  };
  const bgStyle =
    moduleVariation && moduleVariation.background_color !== ""
      ? { backgroundColor: moduleVariation.background_color }
      : {};

  useEffect(() => {
    let programsObj = programs;
    if (selectedDate !== null && selectedDate.value !== 0) {
      programsObj = { [selectedDate[value]]: programs[selectedDate.value] };
    }
    if (selectedTrack !== null && selectedTrack.value !== 0) {
      programsObj = getProgramsByTrack(programsObj, selectedTrack.value);
    }
    if (selectedLocation !== null && selectedLocation.value !== 0) {
      programsObj = getProgramsByLocation(programsObj, selectedLocation.value);
    }
    if (search !== "") {
      programsObj = searchThroughProgram(programsObj, search.toLowerCase());
    }
    setProgramsLoc(programsObj);
  }, [selectedDate, selectedTrack, search, selectedLocation]);

  const flattenedItems = Object.keys(programsLoc).flatMap((key) =>
    programsLoc[key].map((item) => ({ ...item, key }))
  );
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  return (
    <div
      data-fixed="false"
      className="module-section ebs-program-listing-wrapper ebs-transparent-box"
      style={bgStyle}
    >
      <StyleVariableForTimeline bgStyle={bgStyle} />
      <div className="container">
        <div className="d-flex justify-content-start p-3 gap-4 flex-wrap shadow-light-4px-20px">
          {eventsiteSettings?.agenda_search_filter === 1 && (
            <div>
              <div
                style={{ minWidth: "280px", maxWidth: 440 }}
                className="ebs-form-control-search-new border-black-color"
              >
                <input
                  className="form-control border-black-color"
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
          {tracks.length > 0 && (
            <div className="">
              <ReactSelect
                styles={customStyles}
                placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                components={{ IndicatorSeparator: null }}
                onChange={(date) => {
                  onDateChange(date);
                }}
                className="custom-track-select"
                value={selectedDate}
                options={Object.keys(programs).reduce(
                  (ack, key) => [
                    ...ack,
                    { value: key, label: moment(key).format("D MMM") },
                  ],
                  [{ value: 0, label: siteLabels.EVENTSITE_SELECT_DAY }]
                )}
              />
            </div>
          )}

          {/* <div
            className="d-flex gap-1 align-items-center justify-content-end ms-auto ebs-reset-btn"
            onClick={handleResetFilters}
          >
            <span className="material-symbols-outlined">restart_alt</span>
            <span className="fs-xsmall fw-normal">Reset filters</span>
          </div> */}
        </div>
        {Object.keys(programsLoc).length > 0 ? (
          <>
            <div className="ebr_program_variation7-container ">
              <Fragment>
                {flattenedItems.map((item,index,workshop_programsArray) => {
                  return (
                    <Fragment key={item+index}>
                      {item.workshop_id > 0 && (
                        <Fragment>
                          <div className="ebr_session_title_container border d-flex justify-content-between align-items-center my-4">
                            <div className="ebr-time-title-container d-flex  align-items-center gap-27">
                              <p className="m-0 start_end fw-semibold ebr_time" >
                                {moment(
                                  `${item.date} ${item.program_workshop_start_time}`
                                ).format("HH:mm")}{" "}
                                -{" "}
                                {moment(`${item.date} ${item.program_workshop_end_time}`).format(
                                  "HH:mm"
                                )}
                              </p>
                              <h4 className="m-0 fw-semibold" onClick={()=>{
                                            handleItemClick(item,workshop_programsArray)
                                            setShowDetail(true)
                                        }}>
                                {item.program_workshop}
                              </h4>
                            </div>
                          
                          </div>
                          <div className="timeline-container">
                            {item.workshop_programs
                              .slice(0, showWorkshopPrograms)
                              .map((program, index, array) => {
                                return (
                                  <>
                                    <div className="ebs-list-workshop ebr_session_title_container  d-flex justify-content-between align-items-start flex-column">
                                      <div className="ebr-time-title-container d-flex  align-items-center w-100">
                                        <p
                                          className="m-0 start_end fw-medium ebr_time"
                                          style={{ minWidth: "140px" }}
                                        >
                                          {moment(
                                            `${program.date} ${program.start_time}`
                                          ).format("HH:mm")}{" "}
                                          -{" "}
                                          {moment(
                                            `${program.date} ${program.end_time}`
                                          ).format("HH:mm")}
                                        </p>
                                        <div className="d-flex align-items-center gap-5 w-100">
                                          <Timeline />
                                          <div className="d-flex justify-content-between w-100 align-items-center">
                                          <p className="m-0 ebr_topic" onClick={()=>{
                                            handleItemClick(program,array)
                                            setShowDetail(true)
                                        }}>
                                            {program.topic}
                                          </p>
                                          <div className="d-flex gap-1 align-items-center location_container">
                                          <span className="material-symbols-outlined icon">
                                            location_on
                                          </span>
                                          <p className="text m-0">
                                            {`${
                                              item.location.length > 25
                                                ? item.location.substring(0, 25) + "...."
                                                : item.location
                                            }`}
                                          </p>
                                        </div>
                                        </div>
                                        </div>
                                      </div>
                                    </div>
                                    {index === 5 &&
                                     index === array.length - 1 &&
                                     showAllOtherPrograms < item.workshop_programs.length && 
                                         (
                                        <div className="ebs-list-workshop ebr_session_title_container d-flex justify-content-between align-items-start flex-column">
                                          <div className="ebr-time-title-container d-flex align-items-center">
                                            <p
                                              className="m-0 start_end fw-medium ebr_time"
                                              style={{ minWidth: "140px" }}
                                            >
                                              {moment(
                                                `${item.date} ${item.start_time}`
                                              ).format("HH:mm")}{" "}
                                              -{" "}
                                              {moment(
                                                `${item.date} ${item.end_time}`
                                              ).format("HH:mm")}
                                            </p>
                                            <div className="d-flex align-items-center gap-5">
                                              <Timeline color={"#000"} />
                                              <button
                                                className="m-0 ebr_topic btn btn-outline-primary"
                                                onClick={() =>
                                                  setShowWorkshopPrograms(item.workshop_programs.length)
                                                }
                                              >
                                                hidden {array.length - 5} items
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                  </>
                                );
                              })}
                          </div>
                        </Fragment>
                      )}
                    </Fragment>
                  );
                })}
              </Fragment>
            </div>
            <div className="ebr_program_variation7-container ">
              <div className="ebr_session_title_container border d-flex justify-content-between align-items-center my-4">
                <div className="ebr-time-title-container d-flex  align-items-center">
                  <h4 className="m-0 fw-semibold text-capitalize">other</h4>
                </div>
              </div>
              <div className="timeline-container">
                <Fragment>
                  {flattenedItems
                    .slice(0, showAllOtherPrograms)
                    .map((item, index, array) => {
                      return (
                        <Fragment>
                          {/* {item.workshop_id<=0 && ( */}
                          <div className="ebs-list-workshop ebr_session_title_container  d-flex justify-content-between align-items-start flex-column">
                            <div className="ebr-time-title-container d-flex  align-items-center  w-100">
                              <p
                                className="m-0 start_end fw-medium ebr_time"
                                style={{ minWidth: "140px" }}
                              >
                                {moment(
                                  `${item.date} ${item.start_time}`
                                ).format("HH:mm")}{" "}
                                -{" "}
                                {moment(`${item.date} ${item.end_time}`).format(
                                  "HH:mm"
                                )}
                              </p>
                              <div className="d-flex align-items-center gap-5  w-100">
                                <Timeline />
                                <div className="d-flex justify-content-between w-100 align-items-center">

                                <p className="m-0 ebr_topic" onClick={()=>{
                                            handleItemClick(item,array)
                                            setShowDetail(true)
                                  }}>{item.topic}</p>
                             {item.location!=="" && <div className="d-flex gap-1 align-items-center location_container">
                              <span className="material-symbols-outlined icon">
                                location_on
                              </span>
                              <p className="text m-0">
                                {`${
                                  item.location.length > 25
                                    ? item.location.substring(0, 20) + "...."
                                    : item.location
                                }`}
                              </p>
                              </div>}
                              </div>
                              </div>
                            </div>
                          </div>
                          {index === 5 &&
                            index === array.length - 1 &&
                            showAllOtherPrograms < flattenedItems.length && (
                              <div className="ebs-list-workshop ebr_session_title_container d-flex justify-content-between align-items-start flex-column">
                                <div className="ebr-time-title-container d-flex align-items-center">
                                  <p
                                    className="m-0 start_end fw-medium ebr_time"
                                    style={{ minWidth: "140px" }}
                                  >
                                    {moment(
                                      `${item.date} ${item.start_time}`
                                    ).format("HH:mm")}{" "}
                                    -{" "}
                                    {moment(
                                      `${item.date} ${item.end_time}`
                                    ).format("HH:mm")}
                                  </p>
                                  <div className="d-flex align-items-center gap-5">
                                    <Timeline color={"#000"} />
                                    <button
                                      className="m-0 ebr_topic btn btn-outline-primary"
                                      onClick={() =>
                                        setShowAllOtherPrograms(
                                          flattenedItems.length
                                        )
                                      }
                                    >
                                      hidden {flattenedItems.length - 5} items
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          {/* )} */}
                        </Fragment>
                      );
                    })}
                </Fragment>
              </div>
            </div>
          </>
        ) : (
          <>
              {Object.values(programsLoc).length==0 && <div className='p-3 bg-body rounded-2 fw-medium text-capitalize text-center my-5'>{siteLabels.EVENT_NORECORD_FOUND}</div>}
          </>
        )}
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

export default Variation7;
