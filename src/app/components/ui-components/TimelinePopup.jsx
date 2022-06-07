import * as React from 'react';

const TimelinePopup =  ({width, onClick, data}) => {
    console.log(data);
    return (
        <div style={{zIndex: 9999}} className="fixed ebs-popup-container">
            <div className="ebs-popup-wrapper" style={{ maxWidth: width ? width : '980px' }}>
                <span onClick={onClick} className="ebs-close-link"><i className="material-icons">close</i></span>
                <div className="ebs-popup-inner ebs-popup-timeline">
									{data.workshop && <h4 className="workkshop-box">{data.workshop}</h4>}
									<div className="title">{data.name}</div>
									{data.tracks && <div className="tracks">
										{data.tracks.map((track, k) =>
											<span style={{backgroundColor: '#6B3182'}} key={k}>{track}</span>
											)}
									</div>}
									<div className="ebs-bottom-wrapp">
										<div className="location"><i className="material-icons">place</i> Main Stage</div>
											{data.start_time && data.end_time &&
												<div className="time"><i className="material-icons">access_time</i> {data.start_time} - {data.end_time}</div>
											}
											{data.video > 0 && <div className="video"><i className="material-icons">play_circle</i> {data.video}</div>}
									</div>
											<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae praesentium soluta laudantium.</p>
										<div className="row d-flex ebs-program-speakers">
											<div className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={require("img/user-placeholder.jpg")} alt="" />
												<h4>Bella Nelson</h4>
												<p>Marketing manager</p>
											</div>
											<div className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={require("img/user-placeholder.jpg")} alt="" />
												<h4>Bella Nelson</h4>
												<p>Marketing manager</p>
											</div>
											<div className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={require("img/user-placeholder.jpg")} alt="" />
												<h4>Bella Nelson</h4>
												<p>Marketing manager</p>
											</div>
											<div className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={require("img/user-placeholder.jpg")} alt="" />
												<h4>Bella Nelson</h4>
												<p>Marketing manager</p>
											</div>
											<div className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={require("img/user-placeholder.jpg")} alt="" />
												<h4>Bella Nelson</h4>
												<p>Marketing manager</p>
											</div>
											<div className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={require("img/user-placeholder.jpg")} alt="" />
												<h4>Bella Nelson</h4>
												<p>Marketing manager</p>
											</div>
											<div className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={require("img/user-placeholder.jpg")} alt="" />
												<h4>Bella Nelson</h4>
												<p>Marketing manager</p>
											</div>
											<div className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={require("img/user-placeholder.jpg")} alt="" />
												<h4>Bella Nelson</h4>
												<p>Marketing manager</p>
											</div>
									</div>
                </div>
            </div>
        </div>
    );
}

export default TimelinePopup;

