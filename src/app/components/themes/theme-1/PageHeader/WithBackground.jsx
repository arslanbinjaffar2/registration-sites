import React from 'react'

const WithBackground = ({children}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
        minHeight: 250,
        marginBottom:'50px',
      }}
      className="edgtf-title edgtf-standard-type edgtf-has-background edgtf-content-left-alignment edgtf-title-large-text-size edgtf-animation-no edgtf-title-image-not-responsive edgtf-title-with-border"
    >
    <div className="edgtf-title-holder d-flex align-items-center justify-content-center">
    <div className="container">
      <div className="edgtf-title-subtitle-holder">
        <div className="edgtf-title-subtitle-holder-inner">
          {children}   
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default WithBackground