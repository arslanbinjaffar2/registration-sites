import * as React from 'react';
import Videopopup from "@/Videopopup";
import { PortalWithState } from "react-portal";
class Variation1 extends React.Component {
    render() {
        return (
            <div style={{ backgroundImage: `url(${require('img/h1-parallax1.jpg')})`, padding: '100px 0' }} className="edgtf-parallax-section-holder">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6">
                            <div className="edgtf-video-button">
                                <PortalWithState closeOnOutsideClick closeOnEsc>
                                    {({ openPortal, closePortal, isOpen, portal }) => (
                                        <React.Fragment>
                                            <span className="edgtf-video-button-play" onClick={openPortal} >
                                                <span className="edgtf-video-button-image">
                                                    <img itemProp="image" src="https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/h1-image1.jpg" alt="" />
                                                </span>
                                                <span className="edgtf-video-button-wrapper">
                                                    <span className="edgtf-video-button-wrapper-inner">
                                                        <i className="fa fa-play-circle" aria-hidden="true"></i>
                                                    </span>
                                                </span>
                                            </span>
                                            {portal(
                                                <Videopopup
                                                    url="https://www.youtube.com/watch?v=F2NDJQqVoWI"
                                                    onClose={closePortal} />
                                            )}
                                        </React.Fragment>
                                    )}
                                </PortalWithState>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{ color: '#ffffff', padding: '0 3% 19px 8%' }} className="edgtf-elements-holder-item-inner">
                                <div className="edgtf-title-section-holder">
                                    <h2 style={{ color: '#ffffff' }} className="edgtf-title-with-dots edgtf-appeared">Live Streaming </h2>
                                    <span className="edge-title-separator edge-enable-separator"></span>
                                    <h6 style={{ color: '#ffffff' }} className="edgtf-section-subtitle">Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad his suavita tevi disse </h6>
                                </div>
                                <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at, vel pertinax sensibus id, error epicurei mea et. Mea facilisis urbanitas. moderatius id. Vis ei rationibus definiebas, eu qui purto zril laoreet. Ex error omnium interpretaris pro, alia illum ea vim.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Variation1;
