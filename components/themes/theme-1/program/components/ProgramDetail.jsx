import React, { useEffect, useState } from 'react'
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'
import moment from 'moment'
 const ProgramDetail = ({programs,showDetail,agendaSettings,eventUrl,labels,setShowDetail}) => {
    const [programsList,setProgramsList]=useState(programs)
    const [showText, setShowText] = useState(program?.description.replace(/<\/?[^>]+(>|$)/g, "").length > 450 ? false : true);
    const _ref = React.useRef();
    const width=window.innerWidth;
    const [showHide, setShowHide] = useState(true);
    useEffect(() => {
      const handleResize = () => {
        if (width < 570) {
          setShowHide(false);
        } else {
          setShowHide(true);
        }
      };
  
      // Set the initial state based on the current window width
      handleResize();
  
      // Attach the event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    const program = programsList.programArray.find((item) => item.id === programs.id); 
    if (!program) {
        return;
    }
    return(
        <div className="w-100 bg-white">
            <div  
            id={program?.id}
            // className={`mt-30 ${showDetail?"d-block":"d-none"}`} 
            className={`position-fixed bg-white w-100 overflow-auto py-30 shadow-black`}
             style={{
                display:`${showHide?"block":"none"}`,
                // transform: showDetail ? "translateY(0px)" : "translateY(-200px)",
                opacity: showDetail ? 1 : 0,
                height:showDetail ? "auto" : 0,
                visibility: showDetail ? "visible" : "hidden",
                transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                zIndex:999,
                maxHeight:"451px",
                bottom: "0%"
              }}
           >
            <div className="container">

                <div className="border-bottom pb-3 w-100">
                <div className='d-flex justify-content-between align-items-center'>
                {program?.topic &&  <h5 className='m-0 fs-2x1 fw-semibold'>{program.topic}</h5>}
                <span class="material-symbols-outlined cursor-pointer"  style={{ fontSize: "30px" }} onClick={() => setShowDetail(false)}>close</span>
                    </div>
               <div className='d-flex gap-4 align-items-center justify-content-start mt-3'>
               <div className='d-flex gap-1 align-items-center'>
               <span class="material-symbols-outlined fs-small">calendar_month</span>
               <span>{moment(program?.date).format('dddd')} , {moment(program?.date).format('MMMM D, YYYY')}</span>
               </div>
               {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(program?.hide_time) === 0 &&   <div className='d-flex gap-1 align-items-center'>
               <span class="material-symbols-outlined fs-small">schedule</span>
               <span>   {moment(`${program.date} ${program.end_time}`).format('HH:mm')}</span>
               </div>}
              {program?.location && <div className='d-flex gap-1 align-items-center'>
                <span class="material-symbols-outlined fs-small">location_on</span>
               <span>{program.location}</span>
               </div>}
               </div>
               </div>
               <div className='pt-3 m-0'>
               <div className={`ebs-contain ${!showText ? 'truncate' : ''}`} dangerouslySetInnerHTML={{ __html: program?.description }} />
               {program?.description.replace(/<\/?[^>]+(>|$)/g, "").length > 450 && <span className='ebs-more cursor-pointer fw-semibold fs-xsmall' onClick={() => {if(showText) {setTimeout(() => {
                                _ref?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                 }, 300);} setShowText(!showText) }}>{showText ? labels.EVENTSITE_READLESS : labels.EVENTSITE_READMORE} {showText ? <i class="fas fa-chevron-up"></i>:<i class="fas fa-chevron-down"></i>}</span>}
                </div>
               {program?.program_tracks.length > 0 && <div className={`pt-32 row d-flex flex-lg-row flex-column w-100 gap-2 ${program.program_tracks.length ==8 ?"align-items-center":"align-items-start"}`}>                    
                <h5 className='m-0 col-lg-1'>Tracks :</h5>
                {/* track container */}
                <div className="ebs-tracks-program d-flex gap-12 flex-wrap">
                            {program.program_tracks.map((track, i) => (
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
               {/* workshop */}
               {program?.workshop_id >0 &&
               <div className='pt-12 d-flex align-items-center gap-3   flex-lg-row flex-column'>                    
                <h5 className='m-0'>Workshop :</h5>
                {/* track container */}
                <div className="d-flex gap-12">
                            {/* {program.program_tracks.map((track, i) => ( */}
                                <div  className='border rounded-5 d-flex align-items-center gap-1 px-3 py-1' >
                                   <span className='fs-medium fw-light'>{program.program_workshop}</span>
                                    </div>
                            {/* ))} */}
                        </div>      
               <div>

                </div>
               </div>
               }
               {program?.program_speakers?.length>0 &&
                 <div className='mt-3 pt-3  d-flex align-items-lg-center gap-3 flex-column justify-content-start flex-lg-row border-top '>                    
                <h5 className='m-0'>Speakers :</h5>
                {/* track container */}
                <div className="d-flex gap-3 align-items-center justify-content-start flex-wrap">
                        {program?.program_speakers?.map((speakers, o)=>(
                            <ActiveLink href={`/${eventUrl}/speakers/${speakers.id}`} key={o} className="d-flex align-items-center gap-12">
                                <figure className='m-0'  style={{ width: '42px',height:'42px',borderRadius:"50%",overflow: 'hidden' }}>

                                    {speakers?.image && speakers.image !== "" ? (
                                                <img
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.3s ease' }}
                                                    onLoad={(e) => e.target.style.opacity = 1}
                                                    src={
                                                        process.env.NEXT_APP_EVENTCENTER_URL +
                                                        "/assets/attendees/" +
                                                        speakers.image
                                                    } alt="" />
                                            ) : (
                                                <Image
                                                    onLoad={(e) => e.target.style.opacity = 1}
                                                    width={'100%'}
                                                    objectFit='cover'
                                                    height={'100%'}
                                                    src={
                                                        require("public/img/user-placeholder.jpg")
                                                    } alt="" />
                                            )}
                                </figure>

                                            <h6 className='fs-small fw-normal m-0'>{speakers.first_name} {speakers.last_name}</h6>
                            </ActiveLink>
                        ))}
                        </div>
                        
                <div>

                </div>
               </div>
               }
            </div>

            </div>
        </div>

   
  )
}



export default ProgramDetail