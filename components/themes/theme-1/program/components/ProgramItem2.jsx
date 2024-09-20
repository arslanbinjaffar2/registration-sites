import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import ProgramDetailModal from "./ProgramDetailModal";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import TracksPopup from "./TrackPopup";
import { useSelector } from "react-redux";
import { programListingSelector } from "../../../../../store/Slices/ProgramListingSlice";
const ProgramItem = ({
  programList,
  program,
  eventUrl,
  labels,
  agendaSettings,
  setShowDetail,
  showDetail,
  ref,
  handleItemClick,
}) => {
  const {programId}=useSelector(programListingSelector)
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [trackHighlightClass,setTrackHightLightClass]=useState("ebs-more-track-shown-focus")
  const TrackPopupRef = useRef(null);
  const trackRef=useRef(null)
  function handleIsShowTrackPopup(event) {
    setShow(!show);
    setTarget(event.target);
  }
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(innerWidth);
      if (width > 570) {
        setShowDetail(false);
      } else {
      }
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
      <div
        className="ebs-program-child-new bg-white"
        ref={ref}
        onClick={() => handleItemClick(program, programList)}
      >
        <div className="d-flex border h-100 border-black-color rounded-1">
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
          <div className="border-start border-black-color   d-flex justify-content-lg-center justify-content-start  align-items-center  position-relative w-100 flex-md-row flex-column">
            <div
              className="d-flex justify-content-between  align-items-md-center align-items-start  p-3 flex-wrap align-self-start"
              style={{ width: `${width <= 570 ? "85%" : "100%"}` }}
            >
              <div
                className={`d-flex flex-column  align-items-start  cursor-pointer ${
                  program.program_speakers.length > 0 ? "gap-2" : "gap-0"
                }`}
                onClick={() => {
                  setShowDetail(true);
                }}
              >
                {program.topic && (
                  <h4 className="m-0 fs-large fw-medium">
                    {program.topic.substring(0, 70)}
                    {program.topic.length > 70 ? "....." : ""}
                  </h4>
                )}
                <div className="d-flex align-items-center flex-wrap">
                  {program.program_speakers.slice(0, 3)?.map((speakers, o) => (
                    <h6 className="m-0 fs-medium fw-normal" key={speakers+o}>
                      {speakers.first_name} {speakers.last_name},{" "}
                    </h6>
                  ))}
                  {program.program_speakers.length > 5 ? "...." : ""}
                </div>
              </div>
              <div
                className="d-flex gap-3 align-items-center justify-content-between mt-lg-0 mt-3"
                style={{
                  width: `${
                    window.innerWidth <= 570 && program.location
                      ? "100%"
                      : "auto"
                  } `,
                }}
              >
                {program.location && (
                  <div className="me-2 ebs-program-location d-flex">
                    <span className="material-symbols-outlined fs-small">
                      location_on
                    </span>{" "}
                    <span className="fs-small fw-normal">
                      {program.location.length>20?`${program.location.substring(0,20)} ...`:program.location}{" "}
                    </span>
                  </div>
                )}
                {program.program_tracks.length > 0 && (
                  <div className="ebs-tracks-program gap-1 align-items-center d-sm-flex d-none">
                    {/* <span key={i} style={{ backgroundColor: `${track.color ? track.color : '#000'}` }}>{track.name}</span> */}
                    {program.program_tracks.slice(0, 3).map((track, i) => (
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
                    {program.program_tracks.length > 3 ? (
                      <span
                        onClick={handleIsShowTrackPopup}
                        className={`cursor-pointer ebs-more-track-shown border-black-color border fs-xsmall d-flex justify-content-center align-items-center
                          ${show? trackHighlightClass:""}`}
                       
                      >
                        +{program.program_tracks.length - 3}
                      </span>
                    ) : null}
                  </div>
                )}
                <div
                  onClick={() => setShowDetail(true)}
                  className={`ms-auto border-black-color border p-2 rounded-4px d-flex justify-content-center align-items-center cursor-pointer ${
                    width <= 570 ? "center-Btn" : ""
                  } ${program.id==programId && showDetail ? "bg-black text-white":"bg-white text-black"}`}
                  style={{ height: "35px", width: "35px" }}
                >
                  <span className="material-symbols-outlined">more_horiz</span>
                </div>
              </div>
            </div>
            {program.program_tracks.length > 0 && (
              <div className="ebs-tracks-program gap-1 align-items-center d-sm-none d-flex mb-3 flex-wrap ps-3 align-items-center align-self-start">
                {/* <span key={i} style={{ backgroundColor: `${track.color ? track.color : '#000'}` }}>{track.name}</span> */}
                {program.program_tracks.slice(0, 3).map((track, i) => (
                  <span
                    key={i}
                    className="d-inline-block"
                    data-title={track.name}
                    style={{
                      backgroundColor: `${track.color ? track.color : "#000"}`,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                    }}
                  ></span>
                ))}
                {program.program_tracks.length > 3 ? (
                  <span
                    onClick={handleIsShowTrackPopup}
                    className={`cursor-pointer ebs-more-track-shown border-black-color border fs-xsmall d-flex justify-content-center align-items-center
                      ${show? trackHighlightClass:""}`}>
                    +{program.program_tracks.length - 3}
                  </span>
                ) : null}
                {/* <span onClick={handleIsShowTrackPopup} className="ebs-more-track-shown border-black-color border fs-xsmall d-flex justify-content-center align-items-center"  style={{ width: '20px', height: '20px', borderRadius: '50%' }}>+{program.program_tracks.length-4}</span> */}
              </div>
            )}
          </div>
        </div>
      </div>
      {window.innerWidth <= 570 && (
        <ProgramDetailModal
          program={program}
          labels={labels}
          eventUrl={eventUrl}
          agendaSettings={agendaSettings}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          trackRef={trackRef}
        />
      )}
      <TracksPopup
        TrackPopupRef={TrackPopupRef}
        show={show}
        target={target}
        item={program}
        setShow={setShow}
      />
    </>
  );
};

export default ProgramItem;

// function TracksPopup({ show, setShow, target, TrackPopupRef, program,trackRef }) {
//   useEffect(() => {
//     // Function to handle click outside the popup
//     const handleClickOutside = (event) => {
//       // Check if the click is outside the popup
//       if (
//         TrackPopupRef.current &&
//         !TrackPopupRef.current.contains(event.target)
//       ) {
//         setShow(false); // Hide the popup
//       }
//     };

//     // Add event listener when the component mounts
//     document.addEventListener("mousedown", handleClickOutside);

//     // Clean up event listener when the component unmounts
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   useEffect(()=>{
//     if(trackRef?.current){
//       trackRef.current.focus();
//     }
//   },[show])
//   return (
//     <div ref={TrackPopupRef}>
//       <Overlay
//         show={show}
//         target={target}
//         placement="bottom-end"
//         container={TrackPopupRef}
//         containerPadding={20}
//       >
//         <Popover id="popover-contained">
//           <Popover.Header as="h5" className="m-0 bg-white">
//             Tracks :
//           </Popover.Header>
//           <Popover.Body className="w-100">
//             {program?.program_tracks.length > 0 && (
//               <div
//                 className={`row d-flex   w-100 gap-2 ${
//                   program.program_tracks.length == 8
//                     ? "align-items-center"
//                     : "align-items-start"
//                 } flex-wrap`}
//               >
//                 {/* track container */}
//                 <div className="ebs-tracks-program d-flex gap-12 flex-wrap">
//                   {program.program_tracks.map((track, i) => (
//                     <div
//                       key={i}
//                       className="border rounded-5 d-flex align-items-center gap-1 p-3"
//                       style={{ minWidth: "100px", height: "31px" }}
//                     >
//                       <span
//                         className="d-inline-block"
//                         style={{
//                           backgroundColor: `${
//                             track.color ? track.color : "#000"
//                           }`,
//                           width: "16px",
//                           height: "16px",
//                           borderRadius: "50%",
//                         }}
//                       ></span>
//                       <span className="fs-medium fw-light">{track.name}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div></div>
//               </div>
//             )}
//           </Popover.Body>
//         </Popover>
//       </Overlay>
//     </div>
//   );
// }
