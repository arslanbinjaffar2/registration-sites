import React from 'react'

const Timeline = ({workshopLength}) => {
  return (
<div className="timeline">
  {new Array(1).fill().map(()=>(
    <div className="timeline-item"></div>
  ))}

</div>

  )
}

export default Timeline