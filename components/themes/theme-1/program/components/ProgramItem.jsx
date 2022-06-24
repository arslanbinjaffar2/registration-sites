import React, { useState } from 'react'
import moment from 'moment'
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'

const ProgramItem = ({ program, eventUrl }) => {
    const [showText, setShowText] = useState(program.description.length > 450 ? false : true);
    return (
        <div className="ebs-program-child">
            <div className="row d-flex">
                <div className="col-lg-2">
                    {!program.hide_time && <div className='ebs-program-date'>{moment(new Date(`${program.date} ${program.start_time}`)).format('HH:mm')} - {moment(new Date(`${program.date} ${program.end_time}`)).format('HH:mm')}</div>}
                </div>
                <div className="col-lg-10">
                    <div className="ebs-program-content">
                        {program.topic && <h3>{program.topic}</h3>}
                        {program.location && <div className="ebs-program-location">
                            <i className="fa fa-map-marker" /> {program.location}
                        </div>}
                        {program.program_tracks.length > 0 && <div className="ebs-tracks-program">
                            {program.program_tracks.map((track, i) => (
                                <span key={i} style={{ backgroundColor: `${track.color ? track.color : '#000'}` }}>{track.name}</span>
                            ))}
                        </div>}
                        {program.description && <div className="ebs-description">
                            <div className={`ebs-contain ${!showText ? 'truncate' : ''}`} dangerouslySetInnerHTML={{ __html: program.description }} />
                            {program.description.length > 450 && <span className='ebs-more' onClick={() => { setShowText(!showText) }}>{showText ? 'Collapse' : 'Read More'}</span>}
                        </div>}

                        <div className="row d-flex ebs-program-speakers">
                            {program.program_speakers.map((speakers, o) =>
                                <div style={{ animationDelay: 50 * o + 'ms' }} key={o} className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box ebs-animation-layer">
                                    <ActiveLink href={`/${eventUrl}/speakers/${speakers.id}`}>
                                        <span className="gallery-img-wrapper-square">
                                            {speakers.image && speakers.image !== "" ? (
                                                <img
                                                    onLoad={(e) => e.target.style.opacity = 1}
                                                    src={
                                                        process.env.REACT_APP_EVENTCENTER_URL +
                                                        "/assets/attendees/" +
                                                        speakers.image
                                                    } alt="" />
                                            ) : (
                                                <Image
                                                    onLoad={(e) => e.target.style.opacity = 1}
                                                    src={
                                                        require("public/img/user-placeholder.jpg")
                                                    } alt="" />
                                            )}
                                        </span>
                                        <h4>{speakers.first_name} {speakers.last_name}</h4>
                                    </ActiveLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramItem