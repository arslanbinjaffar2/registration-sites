import React from 'react'
import moment from 'moment'
const ProgramItem = ({item}) => {
  return (
    <div  className="ebs-program-child">
        <div className="row d-flex">
        <div className="col-lg-2">
            {!item.hide_time && <div className='ebs-program-date'>{moment(new Date(`${item.date} ${item.start_time}`)).format('HH:mm')} - {moment(new Date(`${item.date} ${item.end_time}`)).format('HH:mm')}</div>}
        </div>
        <div className="col-lg-10">
            <div className="ebs-program-content">
            {item.topic && <h3>{item.topic}</h3>}
            {item.location && <div className="ebs-program-location">
                <i className="fa fa-map-marker"/> {item.location}
            </div>}
            <div className="ebs-tracks-program">
                <span style={{backgroundColor: '#D69417'}}>TOMORROW’S SECURITY THREATS</span>
                <span style={{backgroundColor: '#278D1F'}}>TOMORROW’S SECURITY THREATS IN COUNTRY 87</span>
            </div>
            {item.description && <div className='ebs-description' dangerouslySetInnerHTML={{__html: item.description}} />}

            <div className="row d-flex ebs-program-speakers">
                {item.program_speakers.map((speakers,o) =>
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
  )
}

export default ProgramItem