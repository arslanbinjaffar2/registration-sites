import * as React from 'react';
class Variation2 extends React.Component {
    render() {
        const sponsors = this.props.sponsors;
        return (
            <div style={{ padding: "80px 0" }} className="module-section">
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
                    <div className="sponsorsv2-wrapper row d-flex">
                        {sponsors.map((sponsor, i) => {
                            return (<div className="col-sm-3 col-md-2" key={i}>
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
        );
    }
}

export default Variation2;
