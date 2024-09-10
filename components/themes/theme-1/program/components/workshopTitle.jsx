import React, { Fragment,useRef, useState } from 'react'
import moment from 'moment'
import Timeline from './timeline';
import ProgramDetail from './ProgramDetail';

import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
 const WorkShopTitle = ({program,setShowProgramDetail,agendaSettings,eventUrl,labels,handleItemClick, handleIsShowTrackPopup}) => {
const Starttime = moment(program.program_workshop_start_time, 'HH:mm:ss');
const endTime=moment(program.program_workshop_end_time, 'HH:mm:ss');
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const TrackPopupRef = useRef(null);
  function handleIsShowTrackPopup  (event){
    setShow(!show);
    setTarget(event.target);
  };
     
const [showWorkShopDetail,setShowWorkShopDetail]=useState(false)
    return(
        <>
             <div className="ebs-program-child-new bg-white">
            <div className="d-flex border rounded-4px h-100 border-black-color" >
                    {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(program.hide_time) === 0 && 
                    <div className='p-2 px-3  ebs-program-date d-flex flex-column align-items-center justify-content-center'>
                        <span className='fs-medium fw-medium'>{Starttime.format('HH:mm')}</span>
                        <span className='fs-medium fw-medium'>
                        {endTime.format('HH:mm')}
                        </span>
                        </div>}
                        <div className='border-start border-black-color w-100 d-flex justify-content-center  align-items-center flex-wrap'>
                        <div className="d-flex justify-content-between items-center align-items-center w-100 p-3 flex-wrap">
                         <div className={`d-flex flex-column  align-items-start  cursor-pointer ${program.program_speakers.length>0?"gap-2":"gap-0"}`}>
                         {program.topic && 
                         <h4 className='m-0 fs-large fw-medium'>{program.program_workshop.substring(0,70)}{program.topic.length>70?".....":""}</h4>}
                        
                         </div>
                         <div className='d-flex gap-3 align-items-center'>
                         <div onClick={()=>setShowWorkShopDetail(!showWorkShopDetail)} className='border-black-color border p-2 rounded-4px d-flex justify-content-center align-items-center cursor-pointer' style={{ height:"35px",width:"35px" }}>
                            <i className={`${showWorkShopDetail?"fa fa-minus":"fa fa-plus"}`} /> </div>
                        
                        </div>
                        </div>

                        </div>
            </div>
           
        </div>
    <div className={`d-flex  gap-lg-5 gap-3 ${showWorkShopDetail && "mt-3 "}`}
       style={{ 
        display:`${showWorkShopDetail?"block":"none"}`,
        // transform: showDetail ? "translateY(0px)" : "translateY(-200px)",
        opacity: showWorkShopDetail ? 1 : 0,
        height:showWorkShopDetail ? "auto" : 0,
        visibility: showWorkShopDetail ? "visible" : "hidden",
        transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
        }}
            //  style={{
            //     transform: showWorkShopTitle ? "translateY(0px)" : "translateY(-200px)",
            //     opacity: showWorkShopTitle ? 1 : 0,
            //     height:showWorkShopTitle ? "auto" : 0,
            //     transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
            //   }}
    >
       <div className={`d-flex flex-column w-100 timeline-container  ${program.workshop_programs.length>0?" gap-3":""}`}>
      {program.workshop_programs.map((item,i)=>(
        <div className='ebs-list-workshop' key={item.id}  onClick={() => handleItemClick(item, program.workshop_programs)}>

        <SingleProgram 
        eventUrl={eventUrl}
        labels={labels}
        setShowWorkshopProgramDetail={setShowProgramDetail}
        handleIsShowTrackPopup={handleIsShowTrackPopup}
        item={item} i={i} lastItem={program.workshop_programs.length-1} agendaSettings={agendaSettings}/>
        </div>
      ))}
       </div>

      
    </div>
        
    </>

    )
}
   

export default WorkShopTitle




function  SingleProgram({item,agendaSettings,setShowWorkshopProgramDetail,TrackPopupRef,show,target,handleIsShowTrackPopup }){
  
    return(
        <>
        <div className='d-flex justify-content-center align-items-center'>
       <Timeline/>
        <div  className="d-flex border rounded-4px  w-100 bg-white border-black-color" >

        {/* <div className="col-lg-2"> */}
        {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(item.hide_time) === 0 && 
                   <div className='p-2 px-3  ebs-program-date d-flex flex-column align-items-center justify-content-center'>
                       <span className='fs-medium fw-semibold'>{moment(`${item.date} ${item.start_time}`).format('HH:mm')}</span>
                       <span className='fs-medium fw-semibold'>
                       {moment(`${item.date} ${item.end_time}`).format('HH:mm')}
                       </span>
                       </div>}
                <div className='border-start w-100 d-flex justify-content-center  align-items-center border-black-color'>
                <div className="d-flex justify-content-between items-center align-items-center w-100 p-3">
                 <div className='d-flex flex-column  align-items-start gap-2 cursor-pointer'>
                  <h4 className='m-0 fs-large fw-semibold'>{item.topic}</h4>
                 </div>
                
                 <div className='d-flex gap-3 align-items-center'>
                  {item.location && 
                    <div className="me-2 ebs-program-location d-flex" >
                    <span class="material-symbols-outlined fs-small" >location_on</span> <span className='fs-small fw-normal'>{item.location}   </span>
                    </div>
                    }
                      {item.program_tracks.length > 0 && 
                        <div className="ebs-tracks-program gap-1 align-items-center d-sm-flex d-none">
                            {item.program_tracks.slice(0,3).map((track, i) => (
                                  <span key={i} className="d-inline-block" 
                              style={{ backgroundColor: `${track.color ? track.color : '#000'}`,width: '16px', height: '16px', borderRadius: '50%',}}></span> ))}  
                             <span onClick={()=>handleIsShowTrackPopup(true)} className="cursor-pointer ebs-more-track-shown border-black-color border fs-xsmall d-flex justify-content-center align-items-center"  style={{ width: '20px', height: '20px', borderRadius: '50%' }}>+{item.program_tracks.length-4}</span>
                        </div>
                        } 
                      <TracksPopup TrackPopupRef={TrackPopupRef} show={show} target={target} item={item}/>
                 <div onClick={()=>setShowWorkshopProgramDetail(true)}
                    className='border-black-color border p-2 rounded-4px d-flex justify-content-center align-items-center cursor-pointer' style={{ height:"35px",width:"35px" }}>
                    <span class="material-symbols-outlined">more_horiz</span>
                    </div>
                    
                    
                    </div>
                </div>

                </div>
    </div>

                    </div>   
        </>

            
    )
}
function TracksPopup({show,target,TrackPopupRef,item}) {
  return (
    <div ref={TrackPopupRef}>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={TrackPopupRef}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h5" className='m-0 bg-white'>Tracks :</Popover.Header>
          <Popover.Body className='w-100'>
          {item?.program_tracks.length > 0 && <div className={`row d-flex   w-100 gap-2 ${item.program_tracks.length ==8 ?"align-items-center":"align-items-start"} flex-wrap`}>                     
                {/* track container */}
                <div className="ebs-tracks-program d-flex gap-12 flex-wrap">
                            {item.program_tracks.map((track, i) => (
                                <div key={i} className='border rounded-5 d-flex align-items-center gap-1 p-3' style={{ minWidth:"100px",height:"31px" }}>
                                   <span  className="d-inline-block"
                              style={{ backgroundColor: `${track.color ? track.color : '#000'}`,width: '16px', height: '16px', borderRadius: '50%',}}></span>
                                   <span className='fs-medium fw-light'>{track.name}</span>
                                    </div>
                            ))}
                        </div>
                <div>
                </div>
               </div>}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}