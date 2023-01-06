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
            <footer id="ebs-footer" className="footer">
                <style dangerouslySetInnerHTML={{ __html: height }}></style>
                <div style={{paddingLeft: 0, paddingRight:0, borderRadius: 0,margin: 0}} className="wrapper-box order-summry">
                    <div className="container">
                        <div className="inner-container ebs-collaspe-item" id="collaspe-item">
                            <h3>{event?.name} </h3>
                            <div className="row">
                                <div className="col">
                                    <h5 className='link'>WHEN</h5>
                                    <p className='icon'>
                                        <i className='material-icons'>date_range</i>
                                        <time dateTime="2019-31-12">{`${moment(event?.start_date).format('MMM DD')} - ${moment(event?.end_date).format('MMM DD YYYY')}`}</time>
                                    </p>
                                    <p className="icon">
                                        <i className='material-icons'>access_time</i>
                                        {`${moment(event?.start_date + ' ' + event?.start_time).format('HH:mm')} - ${moment(event?.start_date + ' ' + event?.end_time).format('HH:mm')}`}
                                    </p>
                                    <a href="#!" style={{textDecoration: 'underline'}} className="link">Add to Calendar</a>
                                </div>
                                <div className="col">
                                    <h5 className='link'>LOCATION</h5>
                                    <h4>Eventbuizz</h4>
                                    <address>
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
                                       
                                    </address>
                                </div>
                                <div className="col">
                                    <h5 className='link'>CONTACT PERSON</h5>
                                    <h4>{event?.organizer?.name}</h4>
                                    <p>Founder &amp; CEO</p>
                                    <p>E-mail: <a href={event?.organizer?.email}>{event?.organizer?.email}</a></p>
                                    <p>Phone: {event?.organizer?.phone}</p>
                                </div>
                                <div className="col">
                                    <h5 className='link'>ORGANIZER</h5>
                                    <h4>Eventbuizz</h4>
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
