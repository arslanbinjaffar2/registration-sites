import React from 'react'

const Variation3 = ({sponsors}) => {
    return (
        <div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section">
                <div className="container">
                    <div className="edgtf-title-section-holder text-center pb-5">
                        <h2 className="edgtf-title-with-dots edgtf-appeared">
                            Sponsors and partners
                        </h2>
                        <span className="edge-title-separator edge-enable-separator"></span>
                      </div>
                    </div>
                    <div className="container">
                     <div className="row d-flex sponsorsv5-wrapper">
                       <h4>Platinium Sponsors</h4>
                        {sponsors.map((sponsor, i) => {
                            return (<div className="col-sm-4 col-6 col-md-3 col-lg-3" key={i}>
                                <figure className="bghover">
                                    <img
                                        src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : `${process.env.REACT_APP_EVENTCENTER_URL}/_admin_assets/images/header_logo_size_image.jpg`}
                                        className="vc_single_image-img attachment-full"
                                        alt="x"
                                    />
                                </figure>
                            </div>)
                        })
                        }
                    </div>
                </div>
            </div>
    )
}

export default Variation3
