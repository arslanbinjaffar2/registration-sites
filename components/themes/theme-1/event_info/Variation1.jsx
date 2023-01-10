import * as React from 'react';
import HeadingElement from 'components/ui-components/HeadingElement';
import moment from "moment";
const Variation1 = (props) => {
  const WrapperLayout = (props) => {

    const _parallax = React.useRef(null);
    React.useEffect(() => {
      window.addEventListener("scroll",scollEffect);
      return () => {
        window.removeEventListener("scroll",scollEffect);
      }
    }, [])
    
     function scollEffect () {
      const scrolled = window.pageYOffset;
      const itemOffset = _parallax.current.offsetTop;
      const itemHeight = _parallax.current.getBoundingClientRect();
      if (scrolled < (scrolled - window.innerHeight) || scrolled > (itemOffset + itemHeight.height)) return false;
        const _scroll = (scrolled - itemOffset) + itemHeight.height;
      _parallax.current.style.backgroundPosition = `50%  -${(_scroll * 0.1)}px`;
    };

    if (props.moduleVariation.background_image !== '') {
      return (
        <div ref={_parallax} style={{ backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + props.moduleVariation.background_image}`, backgroundPosition: "center", backgroundSize: 'cover' }} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding">
          {props.children}
        </div>
      );
    } else {
      return (
        <div ref={_parallax} style={{ backgroundPosition: "center", backgroundSize: 'cover' }} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding">
          {props.children}
        </div>
      );
    }

  }
    return (
      <div className="module-section">
        <WrapperLayout moduleVariation={props.moduleVariation}>
        <div className="container">
        <HeadingElement dark={true} label={props.event.description !== undefined && props.event.description.info !== undefined && props.event.description.info.title !== undefined ? props.event.description.info.title : "About the Event"}  align={'left'} />
          <div className="row d-flex ebs-about-event-section">
            <div className="col-lg-5 mb-5">
              <div className="ebs-event-detail">
                <ul>
                  <li>
                    <i className="material-icons">date_range</i>
                    <strong className="break">{props.labels.EVENT_SITE_EVENT_INFO_DATES !== undefined ? props.labels.EVENT_SITE_EVENT_INFO_DATES : "Dates"}</strong>
                    {props.eventDates.length > 0 && props.eventDates.length <= 7 && props.eventDates.map((item)=>(
                      <p>{moment(item).format('dddd, MMMM Do, YYYY')}</p>
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
                    <strong className="break">{props.labels.EVENT_SITE_EVENT_INFO_OPENING_HOURS !== undefined ? props.labels.EVENT_SITE_EVENT_INFO_OPENING_HOURS : "Opening Hours"}</strong>
                    {props.openingHours.length > 0 && props.openingHours.map((item)=>(
                      <p> {moment(item.date).format('dddd')}, {" "} {`${moment(item?.date + ' ' + item?.start_time).format('HH:mm')} - ${moment(item?.date + ' ' + item?.end_time).format('HH:mm')}`}</p>
                    ))}

                    {props.openingHours.length <=0 && 
                      <p>{moment(props.event.start_date).format('dddd')}, {" "} {`${moment(props.event?.start_date + ' ' + props.event?.start_time).format('HH:mm')} - ${moment(props.event?.start_date + ' ' + props.event?.end_time).format('HH:mm')}`}</p>
                    }
                  </li>
                  <li>
                    <i className="material-icons">location_on</i>
                    <strong className="break">{props.labels.EVENT_SITE_EVENT_INFO_LOCATION !== undefined ? props.labels.EVENT_SITE_EVENT_INFO_LOCATION : "Location"}</strong>
                    <p>{props.event.info && props.event.info.location_name}</p>
                    <p>{props.event.info && props.event.info.location_address}</p>
                    <p>{props.event.country}</p>
                  </li>
                </ul>
                {(props.event.description && props.event.description.info.show_register_now == 1) &&  <a style={{border: '2px solid #fff', color: '#fff'}} href={props.regisrationUrl} rel="noopener" className="edgtf-btn edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{props.labels.EVENTSITE_REGISTER_NOW ? props.labels.EVENTSITE_REGISTER_NOW : 'Register Now'} </a>  }
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <figure>
                <img style={{width: '100%'}} src={props.event.description !== undefined && props.event.description.info !== undefined && props.event.description.info.image !== undefined ? `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event_site/upload_images/${props.event.description.info.image}` : "https://via.placeholder.com/660x440.png"} alt="" />
              </figure>
            </div>
          </div>
        </div>
        </WrapperLayout>
      </div>
    );
  }


export default Variation1;
