import React from 'react'

 const HeadingElement = ({dark,align,label,desc}) => {
  return (
    <div className="row d-flex mb-5">
            {align === 'center' && <div className="col-md-8 offset-md-2 text-center">
              <div className="edgtf-title-section-holder">
                <h2
                  style={{ color: dark ? '#fff' :'#313131' }}
                  className="edgtf-title-with-dots edgtf-appeared"
                >
                  {label}
                </h2>
                <span className="edge-title-separator edge-enable-separator"></span>
              </div>
              <div className="edgtf-title-section-holder">
                <h6 style={{ color: dark ? '#fff' :'#313131' }} className="edgtf-section-subtitle">{desc}</h6>
              </div>
            </div>}
            {align === 'left' && 
              <React.Fragment>
                <div className="col-md-4">
                  <div className="edgtf-title-section-holder">
                    <h2
                      style={{ color: dark ? '#fff' :'#313131' }}
                      className="edgtf-title-with-dots edgtf-appeared"
                    >
                      {label}
                    </h2>
                    <span className="edge-title-separator edge-enable-separator"></span>
                  </div>
                </div>
                <div className="col-md-8">
                <div className="edgtf-title-section-holder">
                    <h6 style={{ color: dark ? '#fff' :'#313131' }} className="edgtf-section-subtitle">{desc}</h6>
                  </div>
                </div>
              </React.Fragment>
            }
          </div>
  )
};
export default HeadingElement;
