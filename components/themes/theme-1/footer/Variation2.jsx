import React, {useState, useEffect} from "react";
import moment from "moment";
const Variation1 = ({event, siteLabels}) => {

    const [height, setheight] = useState('');
    useEffect(() => {
      const _footer = document.getElementById('ebs-footer')?.offsetHeight;
      const _style  = `.master-container {min-height: calc(100% - ${_footer}px) !important;}`
      setheight(_style);
     
    }, []);

  return (
    <>
        {(event.eventsiteSettings.use_reg_form_footer == 0  && event.eventsiteSettings.reg_site_footer_image !== "") && 
          <img src={`${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/event_site/upload_images/'}${event.eventsiteSettings.reg_site_footer_image}`} alt=""  style={{width:"100%"}}/>
        }
        {event.eventsiteSettings.use_reg_form_footer === 1 && 
            <>
            <footer id="ebs-footer" className="footer ebs-variation-dark">
                <style dangerouslySetInnerHTML={{ __html: height }}></style>
                <div style={{paddingLeft: 0, paddingRight:0, borderRadius: 0,margin: 0}} className="wrapper-box order-summry">
                    <div className="container">
                        <div className="inner-container ebs-collaspe-item" id="collaspe-item">
                            <h3>{event?.name} </h3>
                            <div className="row">
                                <div className="col">
                                    <h5 className='link'>{event?.labels?.EVENT_SITE_FOOTER_TITLE_ONE}</h5>
                                    <p className='icon d-flex'>
                                        <i className='material-icons'>date_range</i>
                                        <time dateTime="2019-31-12">{`${moment(event?.start_date).format('MMM DD')} - ${moment(event?.end_date).format('MMM DD YYYY')}`}</time>
                                    </p>
                                    
                                    {event.eventOpeningHours.length > 0 && event.eventOpeningHours.map((item, i)=>(
                                        <p className="icon d-flex" key={i}>
                                            <i className='material-icons'>access_time</i>
                                            {moment(item.date).format('dddd')}, {" "} {`${moment(item?.date + ' ' + item?.start_time).format('HH:mm')} - ${moment(item?.date + ' ' + item?.end_time).format('HH:mm')}`}
                                        </p>
                                    ))}

                                    {event.eventOpeningHours.length <=0 && 
                                    <p className="icon d-flex">
                                        <i className='material-icons'>access_time</i>
                                        {moment(event.start_date).format('dddd')}, {" "} {`${moment(event?.start_date + ' ' + event?.start_time).format('HH:mm')} - ${moment(event?.start_date + ' ' + event?.end_time).format('HH:mm')}`}
                                    </p>
                                    }

                                    
                                    <a href={`${process.env.NEXT_APP_EVENTCENTER_URL}/event/${event.url}/detail/addToCalender`} style={{textDecoration: 'underline'}} className="link">Add to Calendar</a>
                                </div>
                                <div className="col">
                                    <h5 className='link'>{event?.labels?.EVENT_SITE_FOOTER_TITLE_TWO}</h5>
                                    <address className="d-flex icon">
                                        <i className="material-icons">room</i>
                                        {event?.info?.location_name && (
                                            <React.Fragment>
                                                {event?.info?.location_name}<br />
                                            </React.Fragment>
                                        )}
                                        {event?.info?.location_address && (
                                            <React.Fragment>
                                                {event?.info?.location_address}<br />
                                            </React.Fragment>
                                        )}
                                        
                                        {event?.country && (
                                            <React.Fragment>
                                                {event?.country}<br />
                                            </React.Fragment>
                                        )}
                                       
                                    </address>
                                </div>
                                <div className="col">
                                    <h5 className='link'>{event?.labels?.EVENT_SITE_FOOTER_TITLE_THREE}</h5>
                                    {event.eventContactPersons.length > 0 && event.eventContactPersons.map((person, i)=>(
                                        <React.Fragment key={i}>
                                        <p>Name: {person.first_name} {" "} {person.last_name}</p>
                                        <p>E-mail: <a href={`mailto:${person.email}`}>{person.email}</a></p>
                                        <p>Phone: {person.phone}</p>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="col">
                                    <h5 className='link'>{event?.labels?.EVENT_SITE_FOOTER_TITLE_FOUR}</h5>
                                    <h4>{event?.organizer_name}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            </>
        }

    </>
  );
};

export default Variation1;
