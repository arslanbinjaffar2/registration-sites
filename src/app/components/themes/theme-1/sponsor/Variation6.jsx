import React from 'react'

const Variation6 = ({sponsors}) => {
    return (
        <div style={{ padding: "80px 0", backgroundColor: '#f2f2f2' }} className="module-section">
                <div className="container">
                    <div className="edgtf-title-section-holder pb-3">
                        <h2 style={{ marginBottom: '5px' }} className="edgtf-title-with-dots edgtf-appeared">
                            Sponsors and partners
                        </h2>
                        <h6 style={{ fontSize: "16px", lineHeight: "1.5", fontWeight: 300 }}
                            className="edgtf-section-subtitle">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum recusandae ea inventore.
                        </h6>
                    </div>
                    <div className="sponsorsv4-wrapper sponsorsv4-wrapper-alt row d-flex">
                      <h4><span>Platinum Sponsor</span></h4>
                        {sponsors.map((sponsor, i) => {
                            return (<div className="col-sm-4 col-md-2" key={i}>
                                <figure className="bghover">
                                    <img
                                        src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
                                        className="vc_single_image-img attachment-full"
                                        alt="x"
                                    />
                                </figure>
                            </div>)
                        })
                        }
                    </div>
                    <div className="sponsorsv4-wrapper sponsorsv4-wrapper-alt row d-flex">
                      <h4><span>Gold Sponsor</span></h4>
                        {sponsors.map((sponsor, i) => {
                            return (<div className="col-sm-4 col-md-2" key={i}>
                                <figure className="bghover">
                                    <img
                                        src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
                                        className="vc_single_image-img attachment-full"
                                        alt="x"
                                    />
                                </figure>
                            </div>)
                        })
                        }
                    </div>
                    <div className="sponsorsv4-wrapper sponsorsv4-wrapper-alt row d-flex">
                      <h4><span>Gold Sponsor</span></h4>
                        {sponsors.map((sponsor, i) => {
                            return (<div className="col-sm-4 col-md-2" key={i}>
                                <figure className="bghover">
                                    <img
                                        src={sponsor.logo && sponsor.logo !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/sponsors/" + sponsor.logo : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}
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

export default Variation6
