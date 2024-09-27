import React, {useEffect, useState} from 'react';
import moment from 'moment';
import TracksPopup from '../components/TrackPopup';

const colorPalette = [
  '#5AB879', // Color 1
  '#306ADF', // Color 2
  '#C2335A', // Color 3
  '#F3C048', // Color 4
  '#48F3C0', // Color 5
  '#F348D6', // Color 6
  '#D648F3', // Color 7
  '#D6F348', // Color 8
  '#F3D648', // Color 9
  '#48D6F3', // Color 10
];
const otherProgramTitleColor="#C0C0C0";
const Variation9 = ({programs, eventUrl, tracks, showWorkshop, siteLabels, agendaSettings}) => {
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate,setSelectedDate]=useState("")
  const [workShopId,setWorkShopId]=useState(0)
  // State to hold session colors
  const [sessionColors, setSessionColors] = useState({}); // Initialize as an object to map workshop_id to colors
  const borderBottom="4px solid #313131";
  // Function to generate a consistent color from a given string (e.g., sessionId or programId)
  const generateColors = (workshopIds) => {
    const colors = {};
    workshopIds.forEach((workshopId, index) => {
      colors[workshopId] = colorPalette[index % colorPalette.length];
    });
    // Update state with the new colors
    setSessionColors((prevColors) => ({ ...prevColors, ...colors }));
  };
  
  // Function to generate and store colors for workshop_ids
  const getDistinctColor = (index) => {
    const hue = (index * 36) % 360; // Change the step for distinctness
    const saturation = 70; // Saturation level
    const lightness = 50; // Lightness level
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
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
  
      // Generate and store colors for the workshop_ids
      generateColors(allWorkshopIds);
    }
  }, [programsLoc]);
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
    return (
       <div style={{padding: '60px 0 40px 0'}} className="module-section">
        <div className='border-bottom'>
        <div className='container overflow-auto ebs-day-filter-tabs' id='dayfiltered'>
          <div className='d-flex align-align-items-center ebs-day-filter-tabs-container'>
            {Object.values(programsLoc).length >0 && programsLoc && Object.keys(programsLoc).map((item,k)=>{
              return(
             <div className='text-center cursor-pointer fw-semibold ebs-filters-tab-item' key={item}
             style={{borderBottom:selectedDate==item?borderBottom:""}}
               onClick={()=>setSelectedDate(item)}>
                Day {k+1}
              </div>
              )
            })}  
        
        </div>
        </div>
        </div>
        <div className="ebr_program_variaton_9_container container">
        <div className='d-flex  gap-1 workshop_title_container algin-items-center'>
        {Object.values(programsLoc).length >0 && programsLoc && Object.keys(programsLoc).map((key,k,array)=>(
          <>
          {programsLoc[key].map((item,index)=>{
            return(
              <WorkshopTitle9 key={item+index} item={item} array={array} sessionColors={sessionColors} setWorkShopId={setWorkShopId} k={k}/>
            )
          })}
          </>
          
        ))}
    </div>
    <div className='program_container'>
        {Object.values(programsLoc).length >0 && programsLoc && Object.keys(programsLoc).map((key,k)=>(
          <>
           {
            selectedDate!==""?programsLoc[selectedDate].map((item,k)=>{
              return(
                <>
                {item.workshop_id > 0 && workShopId!==0?
                <>
                {Object.keys(item)
                .filter((key) => item[key].workshop_id === workShopId) 
                .flatMap((key) => item[key].workshop_programs) 
                .map((program) => (
                  <ProgramItem9 item={program} key={program.topic+k} sessionColors={sessionColors} workShopId={workShopId}/>
                ))}
                </>
                :<ProgramItem9 item={item} key={item.topic} sessionColors={sessionColors} workShopId={workShopId}/> 
              }
                </>
              )
            }):
            programsLoc[key].map((item,k)=>{
              return(
                <>
                {item.workshop_id > 0 && workShopId!==0?
                <>
                {Object.keys(item)
                .filter((key) => item[key].workshop_id === workShopId) 
                .flatMap((key) => item[key].workshop_programs) 
                .map((program) => (
                  <ProgramItem9 item={program} key={program.id} sessionColors={sessionColors} workShopId={workShopId}/>
                ))}
                </>
                :<ProgramItem9 item={item} key={item.topic+item.id} sessionColors={sessionColors} workShopId={workShopId}/> 
              }
                </>
              )
            })
           }
          </>
        ))}
        </div>
        </div>
       </div>
    )
}

export default Variation9





const ProgramItem9=({item,sessionColors,workShopId})=>{
  const startTime = moment(`${item.date} ${item.start_time}`);
  const endTime = moment(`${item.date} ${item.end_time}`);
  const durationMinutes = endTime.diff(startTime, 'minutes');
  const isHTML = containsHTMLTags(item.description);
  const workshopColor =workShopId!==0 ? sessionColors[workShopId]:otherProgramTitleColor;  
  function containsHTMLTags(str) {
    return /<\/?[a-z][\s\S]*>/i.test(str);
  }
  return(
     <div className='program_item d-flex align-items-center'>
      {JSON.stringify(item.workShopId)}
      <div className='time d-flex flex-column align-items-center'  style={{ '--pseudo-bg-color': workshopColor }}>
      <p className='m-0 start_end'> {moment(`${item.date} ${item.start_time}`).format(
                    "HH:mm"
                  )} -  {moment(`${item.date} ${item.end_time}`).format(
                    "HH:mm"
                  )}</p>
      <p className=' m-0 mt-6 minutes'>{durationMinutes} min</p>
      </div>
      <div className='detail '>
        <h4 className='m-0 title'>{item.topic}</h4>
        {isHTML ? (
         <div className='m-0 pt-3 description truncate ebs-edgtf-post-line-clamp' dangerouslySetInnerHTML={{ __html: item.description}}/> 
      ) : (
        <p className='m-0 pt-3 description truncate ebs-edgtf-post-line-clamp'>{item.description}</p>
      )}
       
        <div className='d-flex gap-3 lcoation_tracks_container align-items-center mt-2'>
        {item.location!=="" && <div className='d-flex gap-1 align-items-center location_container'>
          <span className="material-symbols-outlined icon">
          location_on
          </span>
      <p className='text m-0'>{`${item.location.length>25?item.location.substring(0,25)+"....":item.location}`}</p>
          </div>}
          <div className='tracks_container d-flex algin-items-center gap-2'>
          {item?.program_tracks && item?.program_tracks.length>0 && item.program_tracks.slice(0,3).map((track)=>{
            return(
              <span className="d-inline-block"
              key={track.id+track.name}
              data-title={track.name}
              style={{
                backgroundColor: `${track.color ? track.color : "#000"}`,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            ></span>
            )
           })
          }
             <TracksPopup
                      item={item}
                />
          </div>
        </div>
      </div>
     </div>

  )
}


const WorkshopTitle9=({item,sessionColors,array,setWorkShopId,k})=>{
return(
         <>
              {
                item.workshop_id > 0 &&
              <div className={`workshop_tab`} style={{ backgroundColor: `${sessionColors[item.workshop_id] || '#fff'}` }} onClick={()=>{
                setWorkShopId(item.workshop_id )
              }}>{item.program_workshop}</div>
              }
              {array.length-1 ==k && 
              <div className="workshop_tab text-center" style={{  backgroundColor:otherProgramTitleColor }} onClick={()=>setWorkShopId(0)}>other</div>
              }
              </>
)
}
