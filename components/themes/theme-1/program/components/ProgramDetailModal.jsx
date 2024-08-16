import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'
import moment from 'moment'
const ProgramDetailModal = ({program,labels,eventUrl,agendaSettings,showDetail,setShowDetail}) => {
    const [showText, setShowText] = useState(program.description.replace(/<\/?[^>]+(>|$)/g, "").length > 450 ? false : true);
    const _ref = React.useRef();
    const [fullscreen, setFullscreen] = useState(true);    
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 570) {
          setShowDetail(false)
        } else {
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
      return (
        <>
          
          <Modal show={showDetail} fullscreen={fullscreen} onHide={() => setShowDetail(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Program Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body >
            <div 
                // className={`mt-30 ${showDetail?"d-block":"d-none"}`} 
                className={`${showDetail?"my-30":"mt-30"}`}
                 style={{
                    transform: showDetail ? "translateY(0px)" : "translateY(-200px)",
                    opacity: showDetail ? 1 : 0,
                    height:showDetail ? "auto" : 0,
                    visibility: showDetail ? "visible" : "hidden",
                    transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                  }}
               >
                    <div className="border-bottom pb-3">
                    {program.topic &&  <h5 className='m-0 fs-2x1 fw-semibold'>{program.topic}</h5>}
                   <div className='d-flex gap-4 align-items-center justify-content-start mt-3'>
                   <div className='d-flex gap-1 align-items-center'>
                   <i className="fa fa-calendar"></i>
                   <span>{moment(program.date).format('dddd')} , {moment(program.date).format('MMMM D, YYYY')}</span>
                   </div>
                   {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(program.hide_time) === 0 &&   <div className='d-flex gap-1 align-items-center'>
                   <i className="fa fa-clock"></i>
                   <span>   {moment(`${program.date} ${program.end_time}`).format('HH:mm')}</span>
                   </div>}
                  {program.location && <div className='d-flex gap-1 align-items-center'>
                   <i className="fa fa-map-marker"></i>
                   <span>{program.location}</span>
                   </div>}
                   </div>
                   </div>
                   <div className='pt-3 m-0'>
                   <div className={`ebs-contain ${!showText ? 'truncate' : ''}`} dangerouslySetInnerHTML={{ __html: program.description }} />
                   {program.description.replace(/<\/?[^>]+(>|$)/g, "").length > 450 && <span className='ebs-more cusor-pointer fw-semibold fs-xsmall' onClick={() => {if(showText) {setTimeout(() => {
                                    _ref?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                     }, 300);} setShowText(!showText) }}>{showText ? labels.EVENTSITE_READLESS : labels.EVENTSITE_READMORE} {showText ? <i class="fas fa-chevron-up"></i>:<i class="fas fa-chevron-down"></i>}</span>}
                    </div>
                   {/* <h6 className='m-0'>Agenda :</h6>
                   <div className='pt-3 d-flex gap-2 align-items-start'>
                    <div>
                   <i class="fas fa-chevron-right"> </i>
                     <span>   Welcome Address: Kick off the workshop with a warm welcome and an overview of what to expect.</span>
                    </div>
                   </div> */}
                   {program.program_tracks.length > 0 && <div className={`pt-40 row d-flex w-100  gap-2 ${program.program_tracks.length ==5 ?"align-items-center":"align-items-start"}`}>                    
                    <h5 className='m-0 col-lg-1'>Tracks :</h5>
                    {/* track container */}
                    <div className="ebs-tracks-program d-flex gap-12 flex-wrap col-lg-10">
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
                   {program.workshop_id >0 &&
                   <div className='pt-40 d-flex align-items-lg-center gap-3 border-bottom pb-3 flex-lg-row flex-column'>                    
                    <h5 className='m-0'>Workshop :</h5>
                    {/* track container */}
                    <div className="d-flex gap-12">
                                {/* {program.program_tracks.map((track, i) => ( */}
                                    <div  className='border rounded-5 d-flex align-items-center gap-1 p-3' >
                                       <span className='fs-medium fw-light'>Cybertruslen mod dansk forskning</span>
                                        </div>
                                {/* ))} */}
                            </div>      
                   <div>
    
                    </div>
                   </div>
                   }
                   {program.program_speakers?.length>0 &&
                     <div className='py-3 d-flex align-items-lg-center gap-3 flex-lg-row flex-column'>                    
                    <h5 className='m-0'>Speakers :</h5>
                    {/* track container */}
                    <div className="d-flex gap-3 align-items-center flex-wrap">
                            {program.program_speakers?.map((speakers, o)=>(
                                <ActiveLink href={`/${eventUrl}/speakers/${speakers.id}`} key={o} className="d-flex align-items-center gap-12">
                                    <figure className='m-0'  style={{ width: '42px',height:'42px',borderRadius:"50%",overflow: 'hidden' }}>
    
                                        {speakers.image && speakers.image !== "" ? (
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
    
                                                <h6 className='fs-small fw-normal'>{speakers.first_name} {speakers.last_name}</h6>
                                </ActiveLink>
                            ))}
                            </div>
                            
                    <div>
    
                    </div>
                   </div>
                   }
                </div>
            
            </Modal.Body>
          </Modal>
        </>
      );
    }

export default ProgramDetailModal