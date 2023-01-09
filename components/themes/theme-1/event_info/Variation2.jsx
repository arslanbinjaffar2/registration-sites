import * as React from 'react';
import HeadingElement from 'components/ui-components/HeadingElement';
import moment from 'moment';
const Variation1 = (props) => {
  console.log(props.labels.EVENT_INFO_CHECK_IN_START);
    return (
      <div className="module-section">
        <div className="ebs-default-padding">
        <div className="container">
        <HeadingElement dark={false} label={props.event.description !== undefined && props.event.description.info !== undefined && props.event.description.info.title !== undefined ? props.event.description.info.title : "About the Event"}  align={'left'} />
          <div className="row d-flex ebs-about-event-section">
            <div className="col-lg-5 mb-5">
              <div className="ebs-event-detail ebs-dark-about">
                <ul>
                  <li>
                    <i className="material-icons">date_range</i>
                    <strong className="break">DATES</strong>
                    {props.eventDates.length > 0 && props.eventDates.length <= 7 && props.eventDates.map((item)=>(
                      <p>{moment(item).format('dddd ,D MMMM YYYY')}</p>
                      ))}
                    {(props.eventDates.length <=0 || props.eventDates.length > 7) && 
                      <>
                        <p>{moment(props.event.start_date).format('dddd, MMMM Do, YYYY')}</p>
                        <p>{moment(props.event.end_date).format('dddd, MMMM Do, YYYY')}</p>
                      </>
                    }
                  </li>
                  <li>
                    <i className="material-icons">watch_later</i>
                    <strong className="break">{props.labels.EVENT_INFO_CHECK_IN_START !== undefined ? props.labels.EVENT_INFO_CHECK_IN_START : "Opening Hours"}</strong>
                    {props.openingHours.length > 0 && props.openingHours.map((item)=>(
                      <p>{moment(item.date).format('dddd')}, {" "} {moment(item.start_time, 'h:mm a').format("hh:mm a")}-{moment(item.end_time, 'h:mm a').format("hh:mm a")}</p>
                    ))}

                    {props.openingHours.length <=0 && 
                      <p>{moment(props.event.start_date).format('dddd')}, {" "} {moment(props.event.start_time, 'h:mm a').format("hh:mm a")}-{moment(props.event.end_time, 'h:mm a').format("hh:mm a")}</p>
                    }
                    
                  </li>
                  <li>
                    <i className="material-icons">location_on</i>
                    <strong className="break">location</strong>
                    <p>{props.event.info && props.event.info.location_name}</p>
                    <p>{props.event.info && props.event.info.location_address}</p>
                  </li>
                </ul>
                { (props.event.description && props.event.description.info.show_register_now == 1) && <a style={{border: '2px solid #363636', color: '#363636'}} href={props.regisrationUrl} rel="noopener" className="edgtf-btn edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color"> {props.labels.EVENTSITE_REGISTER_NOW ? props.labels.EVENTSITE_REGISTER_NOW : 'Register Now'} </a> } 
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <figure>
                <img style={{width: '100%'}} src={props.event.description !== undefined && props.event.description.info !== undefined && props.event.description.info.image !== undefined ? `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event_site/upload_images/${props.event.description.info.image}` : "https://via.placeholder.com/660x440.png"} alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }


export default Variation1;
