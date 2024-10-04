import React from 'react'

const Timeline = ({color}) => {
  return (
    <div className="timeline ms-lg-3 ms-0 me-3" >
    <div className="timeline-item" style={{ borderColor:`${color ?"#000":""}` }}></div>
    </div>  

  )
}

export default Timeline