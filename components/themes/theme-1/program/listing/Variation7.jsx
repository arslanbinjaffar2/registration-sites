import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  useCallback,
} from "react";
import HeadingElement from "components/ui-components/HeadingElement";
import ProgramItem2 from "components/themes/theme-1/program/components/ProgramItem2";
import WorkShop from "components/themes/theme-1/program/components/WorkShop";
import ReactSelect from "react-select";
import { localeProgramMoment } from "helpers/helper";
import moment from "moment";
import ProgramDetail from "../components/ProgramDetail";
import CustomFilter from "../components/customFilters";
import WorkShopTitle from "../components/workshopTitle";
import { useDispatch } from "react-redux";
import { setProgramDetail } from "../../../../../store/Slices/ProgramListingSlice";
import Timeline from "../components/timeline";
export const customStyles = {
  control: (base) => ({
    ...base,
    height: 38,
    minHeight: 38,
    backgroundColor: "#FBFDFF",
    borderColor: "#E9EDF0",
    width: "100%",
    maxWidth: "100%",
  }),
};
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
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const detailRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [programsState, setProgramsState] = useState({
    id: 0,
    programArray: [],
  });
  console.log(programsState, "programState");
  const onDateChange = (date) => {
    setSelectedDate(date);
  };
  const onLocationChange = (location) => {
    setSelectedLocation(location);
  };
  const onTrackChange = (track) => {
    setSelectedTrack(track);
  };
  const handleItemClick = (item, programArray) => {
    setProgramsState({ ...programsState, id: item.id, programArray });
    dispatch(setProgramDetail({ id: item.id }));
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      data-fixed="false"
      className="module-section ebs-program-listing-wrapper ebs-transparent-box"
      style={bgStyle}
    >
      <style dangerouslySetInnerHTML={{ __html: `
      .timeline-container .ebs-list-workshop:first-of-type::before {background:${bgStyle.backgroundColor}}
        .timeline-container .ebs-list-workshop:last-of-type::after {background:${bgStyle.backgroundColor}}
        ` }} />

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
                    { value: key, label: moment(key).format("DD-MM-YYYY") },
                  ],
                  [{ value: 0, label: siteLabels.EVENTSITE_SELECT_DAY }]
                )}
              />
            </div>
          )}

          <div
            className="d-flex gap-1 align-items-center justify-content-end ms-auto ebs-reset-btn"
            onClick={handleResetFilters}
          >
            <span className="material-symbols-outlined">restart_alt</span>
            <span className="fs-xsmall fw-normal">Reset filters</span>
          </div>
        </div>
        <div className="ebr_program_variation7-container ">
         {
           Object.values(programsLoc).length >0 && programsLoc && Object.keys(programsLoc).map((key,k)=>{
            return(
                <>
                {programsLoc[key].map((item)=>{
                    return(
                        <>
                         {item.workshop_id>0 && 
                        <>
                        <div className="ebr_session_title_container border d-flex justify-content-between align-items-center my-4">
                            <div className="ebr-time-title-container d-flex  align-items-center">
                            <p className='m-0 start_end fw-semibold'> 
                                {/* {moment(`${item.date} ${item.start_time}`).format(
                                    "HH:mm"
                                )} -  {moment(`${item.date} ${item.end_time}`).format(
                                    "HH:mm"
                                )} */}
                                09:00 - 12:30
                            </p>
                            <h4 className="m-0 fw-semibold">{item.program_workshop}</h4>
                            </div>
                            <div className="d-flex gap-1 align-items-center location_container">
                            <span className="material-symbols-outlined icon">
                                location_on
                            </span>
                            <p className="text m-0">
                                {`${item.location.length>25?item.location.substring(0,25)+"....":item.location}`}
                            </p>
                            </div>
                        </div>
                        <div className="timeline-container">
                          <div className="ebs-list-workshop ebr_session_title_container  d-flex justify-content-between align-items-start flex-column">
                           {item.workshop_programs.map((program)=>{
                            return(
                            <>
                            <div className="ebr-time-title-container d-flex  align-items-center">      
                            <p className='m-0 start_end fw-semibold'> 
                                {/* {moment(`${item.date} ${item.start_time}`).format(
                                    "HH:mm"
                                )} -  {moment(`${item.date} ${item.end_time}`).format(
                                    "HH:mm"
                                )} */}
                                09:00 - 12:30
                            </p>
                            <div className="d-flex align-items-center ">
                            <Timeline/>  
                            <p className="m-0">{program.topic}</p>
                            </div> 
                            </div>
                                </>
                            )
                           })}                            
                          </div>
                        
                        </div>
                         </>
                         }
                        </>
                    )
                })}
                </>
            )
           })
         }   
        </div>
      </div>
    </div>
  );
};

export default Variation3;
