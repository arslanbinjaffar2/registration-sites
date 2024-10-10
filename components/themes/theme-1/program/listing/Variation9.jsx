import React, { useEffect, useState } from "react";
import moment from "moment";
import TracksPopup from "../components/TrackPopup";
import { BgStyles, colorPalette, otherProgramTitleColor } from "../utils/programs";
import { useDimention, useProgramId } from "../utils/customHooks";
import ProgramDetail from "../components/ProgramDetail";
import NoRecordFound from '../../../../../components/NoRecordFound'
const Variation9 = ({
  programs,
  eventUrl,
  tracks,
  showWorkshop,
  siteLabels,
  agendaSettings,
  moduleVariation
}) => {
  const {handleItemClick,showDetail,setShowDetail,detailRef,programsState}=useProgramId()
  const {width}=useDimention()
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState("");
  const [workShopId, setWorkShopId] = useState(0);
  const [sessionColors, setSessionColors] = useState({});
  const borderBottom = "4px solid #313131";
  const generateColors = (workshopIds) => {
    const colors = {};
    workshopIds.forEach((workshopId, index) => {
      colors[workshopId] = colorPalette[index % colorPalette.length];
    });
    setSessionColors((prevColors) => ({ ...prevColors, ...colors }));
  };

  useEffect(() => {
    if (Object.keys(programsLoc).length > 0) {
      const allWorkshopIds = [];

      Object.keys(programsLoc).forEach((key) => {
        programsLoc[key].forEach((item) => {
          if (item.workshop_id > 0) {
            allWorkshopIds.push(item.workshop_id);
          }
        });
      });
      generateColors(allWorkshopIds);
    }
  }, [programsLoc]);

  return (
    <div style={BgStyles(moduleVariation,"60px 0 40px 0" )} className="module-section">
      <div className="border-bottom">
        <div
          className="container overflow-auto ebs-day-filter-tabs"
          id="dayfiltered"
        >
          <div className="d-flex align-align-items-center ebs-day-filter-tabs-container">
            {Object.values(programsLoc).length > 0 &&
              programsLoc &&
              Object.keys(programsLoc).map((item, k) => {
                return (
                  <div
                    className="text-center cursor-pointer fw-semibold ebs-filters-tab-item"
                    key={item}
                    style={{
                      borderBottom: selectedDate == item ? borderBottom : "",
                    }}
                    onClick={() => setSelectedDate(item)}
                  >
                   {moment(item).format("ddd MMM yyy")}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    {Object.keys(programsLoc).length>0  &&
      <div className="ebr_program_variaton_9_container container">
        <div className="d-flex  gap-1 workshop_title_container algin-items-center">
        {Object.values(programsLoc).length > 0 &&
          programsLoc &&
          (() => {
            const renderedWorkshops = new Set();
            return Object.keys(programsLoc).map((key, k, array) => (
              <>
                {programsLoc[key].map((item, index) => {
                  if (item.workshop_id > 0 && !renderedWorkshops.has(item.workshop_id)) {
                    renderedWorkshops.add(item.workshop_id);
                    return (
                      <WorkshopTitle9
                        key={item.workshop_id}
                        item={item}
                        array={array}
                        sessionColors={sessionColors}
                        setWorkShopId={setWorkShopId}
                        k={k}
                      />
                    );
                  }
                  return null;
                })}
              </>
            ));
          })()}
        </div>
        <div className="program_container">
        {Object.keys(programsLoc).length>0 && Object.keys(programsLoc).filter((Date)=>selectedDate!==""?selectedDate==Date:Date).map((Date,k)=>{
          return(
            <>
            {programsLoc[Date].
            filter((item)=>item.workshop_id===workShopId ? item.workshop_programs:item)
            .map((program,index,program_array)=>{
              return(
                <>
            <ProgramItem9
              item={program}
              key={program.topic + k}
              sessionColors={sessionColors}
              workShopId={workShopId}
              handleItemClick={handleItemClick}
              setShowDetail={setShowDetail}
              programArray={program_array}
              />
                </>
              )
            })
            }
            </>
            )
        })}
       
        </div>
      </div>}
      {Object.keys(programsLoc).length<=0 && 
        <NoRecordFound siteLabels={siteLabels}/>
        }
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

export default Variation9;

const ProgramItem9 = ({ item, sessionColors, workShopId,programArray, handleItemClick,setShowDetail}) => {
  const startTime = moment(`${item.date} ${item.start_time}`);
  const endTime = moment(`${item.date} ${item.end_time}`);
  const durationMinutes = endTime.diff(startTime, "minutes");
  const isHTML = containsHTMLTags(item.description);
  const workshopColor =
    workShopId !== 0 ? (sessionColors[workShopId] || sessionColors[item.workshop_id>0 ? item.workshop_id:0]) : otherProgramTitleColor;
  function containsHTMLTags(str) {
    return /<\/?[a-z][\s\S]*>/i.test(str);
  }
  
  console.log(workshopColor,"workshop")
  return (
    <div className="program_item d-flex align-items-center" >
      <div
        className="time d-flex flex-column align-items-center"
        style={{ "--pseudo-bg-color": workshopColor }}
      >
        <p className="m-0 start_end">
          {" "}
          {moment(`${item.date} ${item.start_time}`).format("HH:mm")} -{" "}
          {moment(`${item.date} ${item.end_time}`).format("HH:mm")}
        </p>
        <p className=" m-0 mt-6 minutes">{durationMinutes} min</p>
      </div>
      <div className="detail ">
        <h4 className="m-0 title" onClick={()=>{
      handleItemClick(item,programArray)
      setShowDetail(true)
  }}>{item.topic}</h4>
        {isHTML ? (
          <div
            className="m-0 pt-3 description truncate ebs-edgtf-post-line-clamp"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        ) : (
          <p className="m-0 pt-3 description truncate ebs-edgtf-post-line-clamp">
            {item.description}
          </p>
        )}

        <div className="d-flex gap-3 lcoation_tracks_container align-items-center mt-2">
          {item.location !== "" && (
            <div className="d-flex gap-1 align-items-center location_container">
              <span className="material-symbols-outlined icon">
                location_on
              </span>
              <p className="text m-0">{`${
                item.location.length > 25
                  ? item.location.substring(0, 25) + "...."
                  : item.location
              }`}</p>
            </div>
          )}
          <div className="tracks_container d-flex algin-items-center gap-2">
            {item?.program_tracks &&
              item?.program_tracks.length > 0 &&
              item.program_tracks.slice(0, 3).map((track) => {
                return (
                  <span
                    className="d-inline-block"
                    key={track.id + track.name}
                    data-title={track.name}
                    style={{
                      backgroundColor: `${track.color ? track.color : "#000"}`,
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
    </div>
  );
};

const WorkshopTitle9 = ({ item, sessionColors, array, setWorkShopId, k }) => {
  return (
    <>
      {item.workshop_id > 0 && (
        <div
          className={`workshop_tab`}
          style={{
            backgroundColor: `${sessionColors[item.workshop_id] || "#fff"}`,
          }}
          onClick={() => {
            setWorkShopId(item.workshop_id);
          }}
        >
          {item.program_workshop}
        </div>
      )}
      {array.length - 1 == k && (
        <div
          className="workshop_tab text-center"
          style={{ backgroundColor: otherProgramTitleColor }}
          onClick={() => setWorkShopId(0)}
        >
          other
        </div>
      )}
    </>
  );
};
