import moment from 'moment';
import React from 'react';
import Countdown, { zeroPad } from "react-countdown";
import { setRegistrationEndtime } from "../../../../helpers/helper";
import * as moment_timezone from 'moment-timezone';
const Completionist = ({ labels }) =>
  <div className="col-12">
    <h2>{labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON ? labels.RESGISTRATION_SITE_THIS_EVENT_IS_GOING_ON : "This event is going on."}</h2>
  </div>;


const PackageTable = ({ eventUrl, eventTimeZone, item, labels, package_currency }) => {

  // Renderer callback with condition
  const renderer = ({ months, days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist labels={labels} />;
    } else {
      // Render a countdown
      return (
        <React.Fragment>
          <div className="ebs-countdown-wrapp d-flex">
            {Math.floor(days / 30) > 0 && <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period text-white">Month</span>
              <span className="ebs-countdown-amount">{zeroPad(Math.floor(days / 30))}</span>
            </span>}
            <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period text-white">Days</span>
              <span className="ebs-countdown-amount">{zeroPad(Math.floor(days % 30))}</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period text-white">Hours</span>
              <span className="ebs-countdown-amount">{zeroPad(hours)}</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period text-white">Min</span>
              <span className="ebs-countdown-amount">{zeroPad(minutes)}</span>
            </span>
            <span className="edgtf-countdown is-countdown">
              <span className="ebs-countdown-period text-white">Sec</span>
              <span className="ebs-countdown-amount">{zeroPad(seconds)}</span>
            </span>
          </div>
        </React.Fragment>
      );
    }
  };

  const registerDateEnd = React.useMemo(() => {
    let currentDate = moment_timezone().tz(eventTimeZone);
    let endDate = moment(setRegistrationEndtime(eventTimeZone, moment(`${moment(item.eventsite_setting.registration_end_date).format('YYYY-MM-DD')} ${item.eventsite_setting.registration_end_time}`)));
    let diff = item.eventsite_setting.registration_end_date !== "0000-00-00 00:00:00" ? (currentDate.diff(endDate) < 0) : true;
    return diff;
  }, [item]);

  return (
    <div className={`ebs-package-table-wrapp ${!registerDateEnd && 'ebs-no-table-footer'}`}>
      {item.show_tickets_left === 1 ? <h5 className='text-white fw-normal'>{(labels.EVENTSITE_TICKETS_LEFT !== undefined && labels.EVENTSITE_TICKETS_LEFT !== "") ? labels.EVENTSITE_TICKETS_LEFT : "Tickets left"} {':'} {(item.total_tickets - item.sold_tickets) > 0 ? (item.total_tickets - item.sold_tickets) : "Unlimited"}</h5> : null}
      <h3 className='text-white'>{item.heading}</h3>
      <p className='text-white'>{item.sub_heading}</p>
      {item.enable_price === 1 ? <div className="ebs-table-price border-top border-bottom py-4 text-white mb-3">{item.price}<small>{package_currency}</small></div> : null}
      {item.description && <div className="ebs-table-price-listing text-white border-0 pt-0" dangerouslySetInnerHTML={{ __html: item.description }} />}
      {registerDateEnd && item.eventsite_setting.registration_end_date !== "0000-00-00 00:00:00" &&
        <div className="ebs-table-timer">
          <h4 className='text-white'>{(labels.EVENTSITE_TIME_LEFT !== undefined && labels.EVENTSITE_TIME_LEFT !== "") ? labels.EVENTSITE_TIME_LEFT : "Time left:"}</h4>
          <Countdown date={setRegistrationEndtime(eventTimeZone, moment(`${moment(item.eventsite_setting.registration_end_date).format('YYYY-MM-DD')} ${item.eventsite_setting.registration_end_time}`))} renderer={renderer} />
        </div>
      }
      {registerDateEnd && <div className="ebs-footer-table">
        <a href={`${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${eventUrl}/attendee/manage-attendee?attendee_types=${item.attendee_type}`} className="btn-table rounded-pill">{labels.EVENTSITE_REGISTER_NOW2}</a>
      </div>}
    </div>
  )
}

export default PackageTable