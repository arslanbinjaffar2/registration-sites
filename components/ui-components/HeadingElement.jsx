import React from 'react'

 const HeadingElement = ({dark,align,label,desc, page_header, breakheading,headcolor}) => {
  if(label == ''){
    return null;
  }
  return (
  <div className={`row d-flex ${!page_header ? 'mb-4':''} `}>
            {align === 'center' && <div className="col-md-8 offset-md-2 text-center">
              <div className="edgtf-title-section-holder d-block h2">
                <h1
                  style={{fontSize: '35px', color: headcolor ? headcolor : (dark ? '#fff' :'#313131') }}
                  className="edgtf-title-with-dots edgtf-appeared"
                >
                  {label}
                </h1>
                <span className="edge-title-separator edge-enable-separator"></span>
              </div>
              {desc && <div className="edgtf-title-section-holder">
                <h6 style={{ color: headcolor ? headcolor : (dark ? '#fff' :'#313131') }} className="edgtf-section-subtitle">{desc}</h6>
              </div>}
            </div>}
            {align === 'left' && 
              <React.Fragment>
                <div className={desc && !breakheading ? "col-md-4" : "col-md-12"}>
                  <div className="edgtf-title-section-holder">
                    <h1
                      style={{fontSize: '35px', color: headcolor ? headcolor : (dark ? '#fff' :'#313131') }}
                      className="edgtf-title-with-dots edgtf-appeared d-block h2"
                    >
                      {label}
                    </h1>
                    <span className="edge-title-separator edge-enable-separator"></span>
                  </div>
                </div>
                {desc && <div className={breakheading ? 'col-md-12' : 'col-md-8'}>
                 <div className="edgtf-title-section-holder">
                    <h6 style={{ color: headcolor ? headcolor : (dark ? '#fff' :'#313131'),marginTop: breakheading ? 0 : 15 }} className="edgtf-section-subtitle">{desc}</h6>
                  </div>
                </div> }
              </React.Fragment>
            }
  </div>
  )
};
export default HeadingElement;
