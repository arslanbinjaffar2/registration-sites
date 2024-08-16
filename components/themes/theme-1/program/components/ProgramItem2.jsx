import React, { useEffect, useState } from 'react'
import moment from 'moment'
import ProgramDetailModal from './ProgramDetailModal'
import ProgramDetail from './ProgramDetail'
import WorkShopTitle from './workshopTitle'

const ProgramItem = ({ program, eventUrl, labels, agendaSettings,key,showWorkshop,setShowDetail ,showDetail,ref}) => {
    const [showWorkShopTitle,setShowWorkShopTitle]=useState(false)
    const [height, setHeight] = useState(window.innerWidth <= 1200 ? '100%' : '90px');

  useEffect(() => {
    
    const handleResize = () => {
      setHeight(window.innerWidth <= 1200 ? '100%' : '90px');
    };

    // Attach the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
        <>
        <div className="ebs-program-child-new" style={{ height }} ref={ref} >
            <div className="d-flex border rounded-4px h-100" >
                    {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(program.hide_time) === 0 && 
                    <div className='p-2 px-3  ebs-program-date d-flex flex-column align-items-center'>
                        <span className='fs-medium fw-semibold'>{moment(`${program.date} ${program.start_time}`).format('HH:mm')}</span>
                        <span > - </span>
                        <span className='fs-medium fw-semibold'>
                        {moment(`${program.date} ${program.end_time}`).format('HH:mm')}
                        </span>
                        </div>}
                        <div className='border-start w-100 d-flex justify-content-center  align-items-center flex-wrap'>
                        <div className="d-flex justify-content-between items-center align-items-center w-100 p-3 flex-wrap">
                         <div className='d-flex flex-column  align-items-start gap-2 cusor-pointer' onClick={()=>{
                                setShowDetail(true)
                                setShowWorkShopTitle(false)
                         }}>
                         {program.topic && 
                         <h4 className='m-0 fs-large fw-semibold'>{program.topic.substring(0,70)}{program.topic.length>70?".....":""}</h4>}
                        <div className='d-flex align-items-center flex-wrap'>
                        {program.program_speakers.slice(0,3)?.map((speakers, o) =>
                        <h6 className='m-0 fs-medium fw-normal'>{speakers.first_name} {speakers.last_name}, </h6>)}
                          {program.program_speakers.length>2?"....":""}
                        </div>
                         </div>
                         <div className='d-flex gap-3 align-items-center'>
                         {program.location && 
                         <div className="me-2 ebs-program-location" >
                            <i className="fa fa-map-marker" /> <span className='fs-small fw-normal'>{program.location}   </span>
                        </div>
                         } 
                        {program.program_tracks.length > 0 && 
                        <div className="ebs-tracks-program d-flex gap-1 align-items-center ">
                            {/* <span key={i} style={{ backgroundColor: `${track.color ? track.color : '#000'}` }}>{track.name}</span> */}
                            {program.program_tracks.slice(0,3).map((track, i) => (
                                  <span key={i} className="d-inline-block" 
                              style={{ backgroundColor: `${track.color ? track.color : '#000'}`,width: '16px', height: '16px', borderRadius: '50%',}}></span> ))}  
                              {program.program_tracks.length>2?"....":""}
                        </div>
                        } 
                       <div onClick={()=>setShowDetail(true)} className='border p-2 rounded-4px d-flex justify-content-center align-items-center cusor-pointer' style={{ height:"35px",width:"35px" }}>
                         <i class="fas fa-ellipsis-h"></i>
                            </div>
                         {program.workshop_id>0 &&
                         <div onClick={()=>{
                            if( program.program_workshop_end_time && program.program_workshop){
                                setShowWorkShopTitle(!showWorkShopTitle)
                                setShowDetail(false)
                            }
                         }} className='border p-2 rounded-4px d-flex justify-content-center align-items-center cusor-pointer' style={{ height:"35px",width:"35px" }}>
                            <i className={`${showWorkShopTitle?"fa fa-minus":"fa fa-plus"}`} /> </div>
                         } 
                        </div>
                        </div>

                        </div>
            </div>
           
        </div>
          <WorkShopTitle program={program} showWorkShopTitle={showWorkShopTitle}/>
         {window.innerWidth<=570 &&  <ProgramDetailModal program={program} labels={labels} eventUrl={eventUrl} agendaSettings={agendaSettings} showDetail={showDetail} setShowDetail={setShowDetail}/>}
        </>

    )
}

export default ProgramItem




// function ProgramDetail({program,labels,eventUrl,agendaSettings,showDetail}){
//     const [showText, setShowText] = useState(program.description.replace(/<\/?[^>]+(>|$)/g, "").length > 450 ? false : true);
//     const _ref = React.useRef();
//     return(
//         <>
//             <div 
//             // className={`mt-30 ${showDetail?"d-block":"d-none"}`} 
//             className={`${showDetail?"my-30":"mt-30"}`}
//              style={{
//                 transform: showDetail ? "translateY(0px)" : "translateY(-200px)",
//                 opacity: showDetail ? 1 : 0,
//                 height:showDetail ? "auto" : 0,
//                 visibility: showDetail ? "visible" : "hidden",
//                 transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
//               }}
//            >
//                 <div className="border-bottom pb-3">
//                 {program.topic &&  <h5 className='m-0 fs-2x1 fw-semibold'>{program.topic}</h5>}
//                <div className='d-flex gap-4 align-items-center justify-content-start mt-3'>
//                <div className='d-flex gap-1 align-items-center'>
//                <i className="fa fa-calendar"></i>
//                <span>{moment(program.date).format('dddd')} , {moment(program.date).format('MMMM D, YYYY')}</span>
//                </div>
//                {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(program.hide_time) === 0 &&   <div className='d-flex gap-1 align-items-center'>
//                <i className="fa fa-clock"></i>
//                <span>   {moment(`${program.date} ${program.end_time}`).format('HH:mm')}</span>
//                </div>}
//               {program.location && <div className='d-flex gap-1 align-items-center'>
//                <i className="fa fa-map-marker"></i>
//                <span>{program.location}</span>
//                </div>}
//                </div>
//                </div>
//                <div className='pt-3 m-0'>
//                <div className={`ebs-contain ${!showText ? 'truncate' : ''}`} dangerouslySetInnerHTML={{ __html: program.description }} />
//                {program.description.replace(/<\/?[^>]+(>|$)/g, "").length > 450 && <span className='ebs-more cusor-pointer fw-semibold fs-xsmall' onClick={() => {if(showText) {setTimeout(() => {
//                                 _ref?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
//                  }, 300);} setShowText(!showText) }}>{showText ? labels.EVENTSITE_READLESS : labels.EVENTSITE_READMORE} {showText ? <i class="fas fa-chevron-up"></i>:<i class="fas fa-chevron-down"></i>}</span>}
//                 </div>
//                {/* <h6 className='m-0'>Agenda :</h6>
//                <div className='pt-3 d-flex gap-2 align-items-start'>
//                 <div>
//                <i class="fas fa-chevron-right"> </i>
//                  <span>   Welcome Address: Kick off the workshop with a warm welcome and an overview of what to expect.</span>
//                 </div>
//                </div> */}
//                {program.program_tracks.length > 0 && <div className={`pt-40 row d-flex w-100 ${program.program_tracks.length ==5 ?"align-items-center":"align-items-start"}`}>                    
//                 <h5 className='m-0 col-1'>Tracks :</h5>
//                 {/* track container */}
//                 <div className="ebs-tracks-program d-flex gap-12 flex-wrap col-10">
//                             {program.program_tracks.map((track, i) => (
//                                 <div key={i} className='border rounded-5 d-flex align-items-center gap-1 p-3' style={{ minWidth:"100px",height:"31px" }}>
//                                    <span  className="d-inline-block"
//                               style={{ backgroundColor: `${track.color ? track.color : '#000'}`,width: '16px', height: '16px', borderRadius: '50%',}}></span>
//                                    <span className='fs-medium fw-light'>{track.name}</span>
//                                     </div>
//                             ))}
//                         </div>
                        
//                 <div>

//                 </div>
//                </div>}
//                {/* workshop */}
//                {program.workshop_id >0 &&
//                <div className='pt-40 d-flex align-items-center gap-3 border-bottom pb-3'>                    
//                 <h5 className='m-0'>Workshop :</h5>
//                 {/* track container */}
//                 <div className="d-flex gap-12">
//                             {/* {program.program_tracks.map((track, i) => ( */}
//                                 <div  className='border rounded-5 d-flex align-items-center gap-1 p-3' >
//                                    <span className='fs-medium fw-light'>Cybertruslen mod dansk forskning</span>
//                                     </div>
//                             {/* ))} */}
//                         </div>      
//                <div>

//                 </div>
//                </div>
//                }
//                {program.program_speakers?.length>0 &&
//                  <div className='py-3 d-flex align-items-center gap-3'>                    
//                 <h5 className='m-0'>Speakers :</h5>
//                 {/* track container */}
//                 <div className="d-flex gap-3 align-items-center">
//                         {program.program_speakers?.map((speakers, o)=>(
//                             <ActiveLink href={`/${eventUrl}/speakers/${speakers.id}`} key={o} className="d-flex align-items-center gap-12">
//                                 <figure className='m-0'  style={{ width: '42px',height:'42px',borderRadius:"50%",overflow: 'hidden' }}>

//                                     {speakers.image && speakers.image !== "" ? (
//                                                 <img
//                                                 style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.3s ease' }}
//                                                     onLoad={(e) => e.target.style.opacity = 1}
//                                                     src={
//                                                         process.env.NEXT_APP_EVENTCENTER_URL +
//                                                         "/assets/attendees/" +
//                                                         speakers.image
//                                                     } alt="" />
//                                             ) : (
//                                                 <Image
//                                                     onLoad={(e) => e.target.style.opacity = 1}
//                                                     width={'100%'}
//                                                     objectFit='cover'
//                                                     height={'100%'}
//                                                     src={
//                                                         require("public/img/user-placeholder.jpg")
//                                                     } alt="" />
//                                             )}
//                                 </figure>

//                                             <h6 className='fs-small fw-normal'>{speakers.first_name} {speakers.last_name}</h6>
//                             </ActiveLink>
//                         ))}
//                         </div>
                        
//                 <div>

//                 </div>
//                </div>
//                }
//             </div>
//         </>

//     )
// }



// function WorkShopTitle({program,showWorkShopTitle}){
//     const Starttime = moment(program.program_workshop_start_time, 'HH:mm:ss');
//     const endTime=moment(program.program_workshop_end_time, 'HH:mm:ss');
//     return(
//     <div className='d-flex align-items-start gap-5'
//              style={{
//                 transform: showWorkShopTitle ? "translateY(0px)" : "translateY(-200px)",
//                 opacity: showWorkShopTitle ? 1 : 0,
//                 height:showWorkShopTitle ? "auto" : 0,
//                 visibility: showWorkShopTitle ? "visible" : "hidden",
//                 transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
//               }}
//     >
//      <Timeline workshopLength={2}/>
//      <div className="d-flex border rounded-4px h-90 w-100">
//                 {/* <div className="col-lg-2"> */}
//                     <div className='p-2 px-3  ebs-program-date d-flex flex-column align-items-center'>
//                         <span className='fs-medium fw-semibold'>{Starttime.format('HH:mm')}</span>
//                         <span > - </span>
//                         <span className='fs-medium fw-semibold'>
//                         {endTime.format('HH:mm')}
//                         </span>
//                         </div>
//                         <div className='border-start w-100 d-flex justify-content-center  align-items-center'>
//                         <div className="d-flex justify-content-between items-center align-items-center w-100 p-3">
//                          <div className='d-flex flex-column  align-items-start gap-2 cusor-pointer'>
//                           <h4 className='m-0 fs-large fw-semibold'>{program.program_workshop}</h4>
//                          </div>
//                          <div className='d-flex gap-3 align-items-center'>

//                          {/* {program.workshop_id ?  */}
//                          <div className='border p-2 rounded-4px d-flex justify-content-center align-items-center cusor-pointer' style={{ height:"35px",width:"35px" }}>
//                          <i class="fas fa-ellipsis-h"></i>
//                             </div>
//                          {/* :""} */}
//                         </div>
//                         </div>

//                         </div>
         
//             </div>
//     </div>
//     )
// }
// function ProgramDetailModal({program,labels,eventUrl,agendaSettings,showDetail,setShowDetail}) {
//     const [showText, setShowText] = useState(program.description.replace(/<\/?[^>]+(>|$)/g, "").length > 450 ? false : true);
//     const _ref = React.useRef();
//   const [fullscreen, setFullscreen] = useState(true);
//   const [show, setShow] = useState(false);

 
//   return (
//     <>
      
//       <Modal show={showDetail} fullscreen={fullscreen} onHide={() => setShowDetail(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Program Detail</Modal.Title>
//         </Modal.Header>
//         <Modal.Body >
//         <div 
//             // className={`mt-30 ${showDetail?"d-block":"d-none"}`} 
//             className={`${showDetail?"my-30":"mt-30"}`}
//              style={{
//                 transform: showDetail ? "translateY(0px)" : "translateY(-200px)",
//                 opacity: showDetail ? 1 : 0,
//                 height:showDetail ? "auto" : 0,
//                 visibility: showDetail ? "visible" : "hidden",
//                 transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
//               }}
//            >
//                 <div className="border-bottom pb-3">
//                 {program.topic &&  <h5 className='m-0 fs-2x1 fw-semibold'>{program.topic}</h5>}
//                <div className='d-flex gap-4 align-items-center justify-content-start mt-3'>
//                <div className='d-flex gap-1 align-items-center'>
//                <i className="fa fa-calendar"></i>
//                <span>{moment(program.date).format('dddd')} , {moment(program.date).format('MMMM D, YYYY')}</span>
//                </div>
//                {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(program.hide_time) === 0 &&   <div className='d-flex gap-1 align-items-center'>
//                <i className="fa fa-clock"></i>
//                <span>   {moment(`${program.date} ${program.end_time}`).format('HH:mm')}</span>
//                </div>}
//               {program.location && <div className='d-flex gap-1 align-items-center'>
//                <i className="fa fa-map-marker"></i>
//                <span>{program.location}</span>
//                </div>}
//                </div>
//                </div>
//                <div className='pt-3 m-0'>
//                <div className={`ebs-contain ${!showText ? 'truncate' : ''}`} dangerouslySetInnerHTML={{ __html: program.description }} />
//                {program.description.replace(/<\/?[^>]+(>|$)/g, "").length > 450 && <span className='ebs-more cusor-pointer fw-semibold fs-xsmall' onClick={() => {if(showText) {setTimeout(() => {
//                                 _ref?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
//                  }, 300);} setShowText(!showText) }}>{showText ? labels.EVENTSITE_READLESS : labels.EVENTSITE_READMORE} {showText ? <i class="fas fa-chevron-up"></i>:<i class="fas fa-chevron-down"></i>}</span>}
//                 </div>
//                {/* <h6 className='m-0'>Agenda :</h6>
//                <div className='pt-3 d-flex gap-2 align-items-start'>
//                 <div>
//                <i class="fas fa-chevron-right"> </i>
//                  <span>   Welcome Address: Kick off the workshop with a warm welcome and an overview of what to expect.</span>
//                 </div>
//                </div> */}
//                {program.program_tracks.length > 0 && <div className={`pt-40 row d-flex w-100 ${program.program_tracks.length ==5 ?"align-items-center":"align-items-start"}`}>                    
//                 <h5 className='m-0 col-1'>Tracks :</h5>
//                 {/* track container */}
//                 <div className="ebs-tracks-program d-flex gap-12 flex-wrap col-10">
//                             {program.program_tracks.map((track, i) => (
//                                 <div key={i} className='border rounded-5 d-flex align-items-center gap-1 p-3' style={{ minWidth:"100px",height:"31px" }}>
//                                    <span  className="d-inline-block"
//                               style={{ backgroundColor: `${track.color ? track.color : '#000'}`,width: '16px', height: '16px', borderRadius: '50%',}}></span>
//                                    <span className='fs-medium fw-light'>{track.name}</span>
//                                     </div>
//                             ))}
//                         </div>
                        
//                 <div>

//                 </div>
//                </div>}
//                {/* workshop */}
//                {program.workshop_id >0 &&
//                <div className='pt-40 d-flex align-items-center gap-3 border-bottom pb-3'>                    
//                 <h5 className='m-0'>Workshop :</h5>
//                 {/* track container */}
//                 <div className="d-flex gap-12">
//                             {/* {program.program_tracks.map((track, i) => ( */}
//                                 <div  className='border rounded-5 d-flex align-items-center gap-1 p-3' >
//                                    <span className='fs-medium fw-light'>Cybertruslen mod dansk forskning</span>
//                                     </div>
//                             {/* ))} */}
//                         </div>      
//                <div>

//                 </div>
//                </div>
//                }
//                {program.program_speakers?.length>0 &&
//                  <div className='py-3 d-flex align-items-center gap-3'>                    
//                 <h5 className='m-0'>Speakers :</h5>
//                 {/* track container */}
//                 <div className="d-flex gap-3 align-items-center">
//                         {program.program_speakers?.map((speakers, o)=>(
//                             <ActiveLink href={`/${eventUrl}/speakers/${speakers.id}`} key={o} className="d-flex align-items-center gap-12">
//                                 <figure className='m-0'  style={{ width: '42px',height:'42px',borderRadius:"50%",overflow: 'hidden' }}>

//                                     {speakers.image && speakers.image !== "" ? (
//                                                 <img
//                                                 style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.3s ease' }}
//                                                     onLoad={(e) => e.target.style.opacity = 1}
//                                                     src={
//                                                         process.env.NEXT_APP_EVENTCENTER_URL +
//                                                         "/assets/attendees/" +
//                                                         speakers.image
//                                                     } alt="" />
//                                             ) : (
//                                                 <Image
//                                                     onLoad={(e) => e.target.style.opacity = 1}
//                                                     width={'100%'}
//                                                     objectFit='cover'
//                                                     height={'100%'}
//                                                     src={
//                                                         require("public/img/user-placeholder.jpg")
//                                                     } alt="" />
//                                             )}
//                                 </figure>

//                                             <h6 className='fs-small fw-normal'>{speakers.first_name} {speakers.last_name}</h6>
//                             </ActiveLink>
//                         ))}
//                         </div>
                        
//                 <div>

//                 </div>
//                </div>
//                }
//             </div>
        
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }
