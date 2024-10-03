import React, { useState } from 'react'
import moment from 'moment'
import ActiveLink from "components/atoms/ActiveLink";
import ProgramV2Popup from "components/ui-components/ProgramV2Popup";
import Image from 'next/image'

const ProgramItemv2 = ({ program, eventUrl, labels, agendaSettings }) => {
    const [popup, setPopup] = useState(false);
    const _ref = React.useRef();
    return (
        <>
        {popup && <ProgramV2Popup onClick={() => setPopup(false)} data={program}   />}
            <div className="ebs-program-child">
                <div className="row d-flex">
                    <div className="col-lg-2">
                        {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(program.hide_time) === 0 && <div className='ebs-program-date pt-1 m-0'>{moment(`${program.date} ${program.start_time}`).format('HH:mm')} - {moment(`${program.date} ${program.end_time}`).format('HH:mm')}</div>}
                    </div>
                    <div className="col-lg-10">
                        <div style={{cursor: 'pointer'}} onClick={() => setPopup(true)} ref={_ref} className="ebs-program-content">
                            {program.topic && <h3>{program.topic}</h3>}
                            <div className="d-flex align-items-center">
                                {program.location && <div className="ebs-program-location pb-2 me-4">
                                    <span class="material-icons text-primary align-middle me-2">location_on</span>{program.location}
                                </div>}
                                {program.program_tracks.length > 0 && <div className="ebs-tracks-program d-flex align-items-center pb-2">
                                    {program.program_tracks.slice(0,3).map((track, i) => (
                                        <span className='p-0 m-0 me-2' key={i} style={{width: 16,height: 16, padding: 0, backgroundColor: `${track.color ? track.color : '#000'}` }}></span>
                                    ))}
                                    {program.program_tracks.length > 3 && <div className='p-0 m-0 me-2 text-default'>+{program.program_tracks.length - 3}</div>}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProgramItemv2