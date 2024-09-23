import React, {useRef, useState, useEffect } from "react";
import moment from "moment";
import Timeline from "./timeline";
import TrackPopup from './TrackPopup'
import { useSelector } from "react-redux";
import { programListingSelector } from "../../../../../store/Slices/ProgramListingSlice";
const WorkShopTitle = ({
  program,
  setShowProgramDetail,
  agendaSettings,
  eventUrl,
  labels,
  handleItemClick,
  handleIsShowTrackPopup,
  showProgramDetail,
  programsState,
  bgstyle
}) => {
  const [showWorkShopDetail, setShowWorkShopDetail] = useState(false);
  const Starttime = moment(program.program_workshop_start_time, "HH:mm:ss");
  const endTime = moment(program.program_workshop_end_time, "HH:mm:ss");
  console.log(bgstyle.backgroundColor,"bgstyle")
  return (
    <>
      <div className="ebs-program-child-new bg-white">
        <div className="d-flex border rounded-4px h-100 border-black-color">
          {parseInt(agendaSettings.agenda_display_time) === 1 &&
            parseInt(program.hide_time) === 0 && (
              <div className="p-2 px-3  ebs-program-date d-flex flex-column align-items-center justify-content-center">
              <span className="fs-medium fw-medium" style={{ width:"48px" }}>
              {moment(`${program.date} ${program.start_time}`).format(
               "HH:mm"
             )}
           </span>
           <span className="fs-medium fw-medium" style={{ width:"48px"}}>
           {moment(`${program.date} ${program.end_time}`).format(
               "HH:mm"
             )}
           </span>
         </div>
            )}
          <div className="border-start border-black-color w-100 d-flex justify-content-center  align-items-center flex-wrap">
            <div className="d-flex justify-content-between items-center align-items-center w-100 p-3 flex-wrap">
              <div
                className={`d-flex flex-column  align-items-start  cursor-pointer ${
                  program.program_speakers.length > 0 ? "gap-2" : "gap-0"
                }`}
              >
                {program.topic && (
                  <h4 className="m-0 fs-large fw-medium">
                    {program.program_workshop.substring(0, 70)}
                    {program.topic.length > 70 ? "....." : ""}
                  </h4>
                )}
              </div>
              <div className="d-flex gap-3 align-items-center">
                <div
                  onClick={() => setShowWorkShopDetail(!showWorkShopDetail)}
                  className="border-black-color border p-2 rounded-4px d-flex justify-content-center align-items-center cursor-pointer"
                  style={{ height: "35px", width: "35px" }}
                >
                  <i
                    className={`${
                      showWorkShopDetail ? "fa fa-minus" : "fa fa-plus"
                    }`}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`d-flex  gap-lg-5 gap-3 ${showWorkShopDetail && "mt-3 "}`}
        style={{
          display: `${showWorkShopDetail ? "block" : "none"}`,
          opacity: showWorkShopDetail ? 1 : 0,
          height: showWorkShopDetail ? "auto" : 0,
          visibility: showWorkShopDetail ? "visible" : "hidden",
          transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
        }}
      >
        <div
          className={`d-flex flex-column w-100 timeline-container  ${
            program.workshop_programs.length > 0 ? " gap-3" : ""
          }`}
          style={{ '--bg-first-last-child': bgstyle.backgroundColor }}
        >
          {program.workshop_programs.map((item, i) => (
            <div
              className="ebs-list-workshop"
              key={item.id}
              onClick={() => handleItemClick(item, program.workshop_programs)}
            >
              <SingleProgram
                eventUrl={eventUrl}
                labels={labels}
                setShowWorkshopProgramDetail={setShowProgramDetail}
                handleIsShowTrackPopup={handleIsShowTrackPopup}
                item={item}
                i={i}
                showProgramDetail={showProgramDetail}
                lastItem={program.workshop_programs.length - 1}
                agendaSettings={agendaSettings}
                programsState={programsState}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkShopTitle;

function SingleProgram({
  item,
  agendaSettings,
  setShowWorkshopProgramDetail,
  target,
  showProgramDetail,
  programsState
}) {
  const {programId}=useSelector(programListingSelector)
  const [width, setWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWidth(innerWidth);
    
    };

    // Set the initial state based on the current window width
    handleResize();

    // Attach the event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
 
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Timeline />
        <div className="d-flex border rounded-4px  w-100 bg-white border-black-color">
          {parseInt(agendaSettings.agenda_display_time) === 1 &&
            parseInt(item.hide_time) === 0 && (
              <div className="p-2 px-3  ebs-program-date d-flex flex-column align-items-center justify-content-center">
                <span className="fs-medium fw-semibold" style={{ width:"48px" }}>
                  {moment(`${item.date} ${item.start_time}`).format("HH:mm")}
                </span>
                <span className="fs-medium fw-semibold" style={{ width:"48px" }}>
                  {moment(`${item.date} ${item.end_time}`).format("HH:mm")}
                </span>
              </div>
            )}
         
          <div className="border-start w-100 d-flex justify-content-lg-center  align-items-center border-black-color">
            <div className="d-flex justify-content-between  align-items-md-center  p-3 flex-md-row flex-column align-items-start"
             style={{ width: `${width <= 570 ? "85%" : "100%"}` }}
            >
              <div className="d-flex   align-items-start gap-2 cursor-pointer">
                <h4 className="m-0 fs-large fw-semibold">{item.topic}</h4>
              </div>
              <div className="d-flex gap-3 align-items-center flex-md-row flex-column">
                {item.location && (
                  <div className="me-2 ebs-program-location d-flex">
                    <span class="material-symbols-outlined fs-small">
                      location_on
                    </span>{" "}
                    <span className="fs-small fw-normal"> 
                    {item.location.length>20?`${item.location.substring(0,20)} ...`:item.location}{" "}

                    </span>
                  </div>
                )}
                {item.program_tracks.length > 0 && (
                  <div className="ebs-tracks-program gap-1 align-items-center d-flex ">
                    {item.program_tracks.slice(0, 3).map((track, i) => (
                      <span
                        key={i}
                        className="d-inline-block"
                        data-title={track.name}
                        style={{
                          backgroundColor: `${
                            track.color ? track.color : "#000"
                          }`,
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                        }}
                      ></span>
                    ))}
                    {item.program_tracks.length > 3 ? (
                    <TrackPopup
                    item={item}
                  />
                    ) : null}
                  </div>
                )}
               
               
                <div
                  onClick={() => setShowWorkshopProgramDetail(true)}
                  className={`ms-auto border-black-color border p-2 rounded-4px 
                    d-flex justify-content-center align-items-center cursor-pointer  ${
                    width <= 570 ? "center-Btn" : ""}
                 ${programsState.id == programId && showProgramDetail ? "bg-black text-white":"bg-white text-black"}`}
                  style={{ height: "35px",width:"35px"}}
                >
                  <span class="material-symbols-outlined">more_horiz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
