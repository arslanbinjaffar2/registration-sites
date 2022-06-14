import * as React from 'react';

const TimelinePopup =  ({width, onClick, data}) => {
 
	React.useEffect(() => {
		document.getElementsByTagName('body')[0].classList.add('un-scroll');	
	
		return () => {
			document.getElementsByTagName('body')[0].classList.remove('un-scroll');
		}
	}, [])
    return (
        <div style={{zIndex: 9999}} className="fixed ebs-popup-container">
            <div className="ebs-popup-wrapper" style={{ maxWidth: width ? width : '980px' }}>
                <span onClick={onClick} className="ebs-close-link"><i className="material-icons">close</i></span>
                <div className="ebs-popup-inner ebs-popup-timeline">
									{data.program_workshop && <h4 className="workkshop-box">{data.program_workshop}</h4>}
									<div className="title">{data.name}</div>
									{data.tracks && <div className="tracks">
										{data.tracks.map((track, k) =>
											<span style={{backgroundColor: `${track.color ? track.color: '#000'}`}} key={k}>{track.name}</span>
											)}
									</div>}
									<div className="ebs-bottom-wrapp">
										<div className="location"><i className="material-icons">place</i> {data.location}</div>
											{data.start_time && data.end_time &&
												<div className="time"><i className="material-icons">access_time</i> {data.start_time} - {data.end_time}</div>
											}
											{data.video > 0 && <div className="video"><i className="material-icons">play_circle</i> {data.video}</div>}
									</div>
											{data.description && <div dangerouslySetInnerHTML={{__html: data.description}} />}
										{data.program_speakers.length > 0 && <div className="row d-flex ebs-program-speakers">
											{data.program_speakers.map((speakers,i)=>
											<div key={i} className="col-md-3 col-sm-4 col-lg-2 col-6 ebs-speakers-box">
												<img  src={
														speakers.image && speakers.image !== ""
														? process.env.REACT_APP_EVENTCENTER_URL +
														"/assets/attendees/" +
														speakers.image
														: require("img/user-placeholder.jpg")
													} alt="" />
												<h4>{speakers.first_name} {speakers.last_name}</h4>
													{speakers.info && <p>{speakers.info.title}</p>}
											</div>)}
										</div>}
                </div>
            </div>
        </div>
    );
}

export default TimelinePopup;

