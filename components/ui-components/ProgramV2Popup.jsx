import * as React from 'react';
import Image from 'next/image';
import moment from 'moment';

const ProgramV2Popup = ({ width, onClick, data }) => {

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			document.getElementsByTagName('body')[0].classList.add('un-scroll');
			return () => {
				document.getElementsByTagName('body')[0].classList.remove('un-scroll');
			}
		}
	}, []);
	console.log(data, 'data');
	return (
		<div style={{ zIndex: 9999 }} className="fixed ebs-popup-container ebs-popup-container-v2">
			<div className="ebs-popup-wrapper" style={{ maxWidth: width ? width : '1280px' }}>
				<span onClick={onClick} className="ebs-close-link"><i className="material-icons">close</i></span>
				<div className="ebs-popup-inner ebs-popup-timeline">
					{data.program_workshop && <h4 className="workkshop-box">{data.program_workshop}</h4>}
					<div className="title">{data.topic}</div>
			
					<div className="ebs-bottom-wrapp">

						<div className="location"><i className="material-icons text-primary">event_available</i> {moment(new Date(data.date)).format('D MMMM, Y')}</div>
						{data.start_time && data.end_time &&<div className="time"><i className="material-icons text-primary">access_time</i> {data.start_time} - {data.end_time}</div>}
						<div className="location"><i className="material-icons text-primary">place</i> {data.location}</div>
						{data.video > 0 && <div className="video"><i className="material-icons text-primary">play_circle</i> {data.video}</div>}
					</div>
					<hr />
					{data.description && <div style={{ padding: '20px 0' }} dangerouslySetInnerHTML={{ __html: data.description }} />}
					{data.program_tracks && <div className="d-lg-flex d-md-block mb-3">
						<h5 style={{whiteSpace: 'nowrap'}} className='m-0 mb-3 me-3'>Tracks:</h5>
								 <div className="tracks">
								{data.program_tracks.map((track, k) =>
									<span className='rounded-pill px-2 py-2 me-3 mb-2' style={{ backgroundColor: `#F5F5F5`, color: '#313131' }} key={k}>
										<em className='rounded-circle d-inline-block align-top me-2' style={{ width: 16, height: 16, backgroundColor: `${track.color ? track.color : '#000'}` }} key={k}>
										</em>
										{track.name}
										</span>
								)}
							</div>
					</div>}
					{data.program_speakers.length > 0 && <div className="d-lg-flex d-md-block mb-3">
						<h5 style={{whiteSpace: 'nowrap'}} className='m-0 mb-3 me-3 pt-2'>Speakers:</h5>
					<div className="d-flex ebs-program-speakers-v2 flex-wrap">
						{data.program_speakers.map((speakers, i) =>
							<div key={i} style={{ animationDelay: 50 * i + 'ms' }} className="ebs-animation-layer d-flex align-items-center me-3 mb-3 ">
								<span className="gallery-img-wrapper-square-v2">
									{speakers.image && speakers.image !== "" ? (
										<img
											className='rounded-circle me-2'
											width={42}
											onLoad={(e) => e.target.style.opacity = 1}
											src={
												process.env.NEXT_APP_EVENTCENTER_URL +
												"/assets/attendees/" +
												speakers.image
											} alt="" />
									) : (
										<Image objectFit='contain' layout="fill"
											className='rounded-circle me-2'
											width={42}
											onLoad={(e) => e.target.style.opacity = 1}
											src={
												require("public/img/user-placeholder.jpg")
											} alt="" />
									)}

								</span>
								<h6 className='m-0'>{speakers.first_name} {speakers.last_name}</h6>
							</div>)}
					</div>
					</div>}
				</div>
			</div>
		</div>
	);
}

export default ProgramV2Popup;
