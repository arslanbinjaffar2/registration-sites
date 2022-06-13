import React, {useState} from 'react'
import moment from 'moment'

const WorkShop = ({item}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="ebs-program-parent ebs-program-workshop">
    <div className="ebs-workshop-header">{item.program_workshop}<i className="material-icons" onClick={()=>{setOpen(!open)}}>expand_more</i></div>
                  {open && item.workshop_programs.map((program,i) =>
                  <div key={i} className="ebs-program-child">
                    <div className="row d-flex">
                      <div className="col-lg-2">
                        {!program.hide_time && <div className='ebs-program-date'>{moment(new Date(`${program.date} ${program.start_time}`)).format('HH:mm')} - {moment(new Date(`${program.date} ${program.end_time}`)).format('HH:mm')}</div>}
                      </div>
                      <div className="col-lg-10">
                        <div className="ebs-program-content">
                          {program.topic && <h3>{program.topic}</h3>}
                          {program.location && <div className="ebs-program-location">
                            <i className="fa fa-map-marker"/> {program.location}
                          </div>}
                          {program.program_tracks.length > 0 && 
                            <div className="ebs-tracks-program">
                              {program.program_tracks.map((track,i)=>(
                                <span key={i} style={{backgroundColor: `${track.color ? track.color : '#000'}`}}>{track.name}</span>
                              ))}
                                
                            </div>
                          }
                          {program.description && <div className='ebs-description' dangerouslySetInnerHTML={{__html: program.description}} />}

                          <div className="row d-flex ebs-program-speakers">
                            {program.program_speakers.map((speakers,o) =>
                              <div key={o} className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
                                <img  src={
                                  speakers.image && speakers.image !== ""
                                    ? process.env.REACT_APP_EVENTCENTER_URL +
                                      "/assets/attendees/" +
                                      speakers.image
                                    : require("img/user-placeholder.jpg")
                                } alt="" />
                                <h4>{speakers.first_name} {speakers.last_name}</h4>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    )}
    </div>
  )
}

export default WorkShop