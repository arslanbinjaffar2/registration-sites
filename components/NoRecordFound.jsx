import React from 'react'

const NoRecordFound = ({siteLabels}) => {
  return (
    <>
        <div className='p-3 bg-body rounded-2 fw-medium  text-center'>{siteLabels.EVENT_NORECORD_FOUND}</div>
    </>
  )
}

export default NoRecordFound