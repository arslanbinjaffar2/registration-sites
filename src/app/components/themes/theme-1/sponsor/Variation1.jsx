import * as React from 'react';
class Variation1 extends React.Component {
    render() {
        const sponsors = this.props.sponsors;
        return (
            <div style={{ padding: "80px 0" }} className="module-section">
                <div className="container">
                    <div className="edgtf-title-section-holder text-center pb-5">
                        <h2 className="edgtf-title-with-dots edgtf-appeared">
                            Sponsors and partners
                        </h2>
                        <span className="edge-title-separator edge-enable-separator"></span>
                    </div>
                    <div className="row d-flex">
                        {sponsors.map((sponsor, i) => {
                            return (<div className="col-sm-6 col-md-3" key={i}>
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
        );
    }
}

export default Variation1;
