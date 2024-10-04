import React, { useEffect, useRef, useState } from 'react'
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
const TracksPopup = ({item,showBorder }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [trackHighlightClass,setTrackHightLightClass]=useState("ebs-more-track-shown-focus")
  const TrackPopupRef = useRef(null);
  useEffect(() => {
    // Function to handle click outside the popup
    const handleClickOutside = (event) => {
      // Check if the click is outside the popup
      if (
        TrackPopupRef.current &&
        !TrackPopupRef.current.contains(event.target)
      ) {
        setShow(false); // Hide the popup
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleIsShowTrackPopup = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <div  ref={TrackPopupRef}>
        {item?.program_tracks.length > 3 ? (
          <span
            onClick={handleIsShowTrackPopup}
            className={`cursor-pointer ebs-more-track-shown   fs-xsmall d-flex justify-content-center align-items-center
              ${show? trackHighlightClass:""}
              ${showBorder ?"border border-black-color":""}
              `}
              >
            +{item.program_tracks.length - 3}
          </span>
        ) : null}
      <Overlay
        show={show}
        target={target}
        container={TrackPopupRef.current}
        placement="top-end"
        containerPadding={20}
        className="border-0 z-3"
      >
        <Popover id="popover-contained" className="border-0 z-3">
          <Popover.Header as="h5" className="m-0 bg-white z-3">
            Tracks :
          </Popover.Header>
          <Popover.Body className="w-100 overflow-auto"   style={{ height:"200px" }}>
            {item?.program_tracks.length > 0 && (
              <div
                className={`row d-flex   w-100 gap-2 ${
                  item.program_tracks.length == 8
                    ? "align-items-center"
                    : "align-items-start"
                } flex-wrap`}
              >
                {/* track container */}
                <div className="ebs-tracks-program d-flex gap-12 flex-wrap">
                  {item.program_tracks.map((track, i) => (
                    <div
                      key={i}
                      className="border rounded-5 d-flex align-items-center gap-1 p-2"
                      style={{ minWidth: "100px", height: "auto"}}
                    >
                      <span
                        className="d-inline-block"
                        style={{
                          backgroundColor: `${
                            track.color ? track.color : "#000"
                          }`,
                          minWidth: "16px",
                          height: "16px",
                          borderRadius: "50%",
                        }}
                      ></span>
                      <span className="fs-medium fw-light">
                        {track.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div></div>
              </div>
            )}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );

  
}

export default TracksPopup