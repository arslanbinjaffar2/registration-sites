import React from 'react'

const Variation1 = (props) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.data.html }} ></div>
  )
}

export default Variation1