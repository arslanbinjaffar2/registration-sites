import React, { useEffect, useState,useInsertionEffect } from "react";
import HeadingElement from "components/ui-components/HeadingElement";
import moment from "moment";

const Completionist = ({ event, completed }) => (
  <div className="col-12">
  <div className="container">
      {(event.eventsiteSettings.show_count_down_text == 0 || (completed && event.count_down_section && event.count_down_section.expiry_message)) && (
      <div className="text-center fs-4  pt-5">
          <div  dangerouslySetInnerHTML={{ __html: event.count_down_section.expiry_message }} />
      </div>
      )}
  </div>
  </div>
);
const Variation13 = ({ event, labels, settings }) => {
    // Renderer callback with condition
    useInsertionEffect(() => {
        // Create a <style> element
        const styleElement = document.createElement('style');
        styleElement.textContent = styleSheet;
        
        // Append the <style> element to the head
        document.head.appendChild(styleElement);
        
        // Cleanup the <style> element on component unmount
        return () => {
          document.head.removeChild(styleElement);
        };
      }, []); 
    //   old code start
//   const renderer = ({ days, hours, minutes, seconds, completed }) => {

//       return (
//         <React.Fragment>
//           <div className="ebs-countdown-wrapp d-flex w-100 countdown-wrapp ebs-counter-v10">
//             {Math.floor(days / 30) > 0 && <span className="edgtf-countdown is-countdown">
//               <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(Math.floor(days / 30))}<span className="countdown-period m-0 text-white">Months</span></div></span>
//             </span>}
//             <span className="edgtf-countdown is-countdown">
//               <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(Math.floor(days % 30))} <span className="countdown-period m-0 text-white">Days</span></div></span>
              
//             </span>
//             <span className="edgtf-countdown is-countdown">
//               <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(hours)}<span className="countdown-period m-0 text-white">Hours</span></div></span>
              
//             </span>
//             <span className="edgtf-countdown is-countdown">
//               <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(minutes)}<span className="countdown-period m-0 text-white">Minutes</span></div></span>
              
//             </span>
//             <span className="edgtf-countdown is-countdown">
//               <span className="countdown-amount rounded-circle border bg-transparent"><div className="position-absolute top-50 start-50 translate-middle lh-base text-white">{zeroPad(seconds)}<span className="countdown-period m-0 text-white">Seconds</span></div></span>
              
//             </span>
//           </div>

//             {<Completionist completed={completed} event={event} />}
    
//         </React.Fragment>
//       );
    
//   };

// old code ends
 const bgStyle ={backgroundImage:settings.background_image? `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + settings.background_image}`:"", backgroundPosition: "center top", backgroundSize: 'cover', }
 const expiryDate = event.count_down_section && event.count_down_section.expiry_date
    ? new Date(event.count_down_section.expiry_date.replace(' ', 'T'))
    : null;
  const isValidDate = expiryDate && !isNaN(expiryDate.getTime());
    return (
        <div>
      {isValidDate && (
    <div style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding ebs-counter-holder">
      <div className="position-relative pt-4" style={{zIndex: 5}}>
      <div className="edgtf-container-inner container">
        <HeadingElement
          dark={true}
          page_header={true}
          label={event.count_down_section && event.count_down_section.title}
          align={settings.text_align}
        />
        {event.count_down_section && <div className="edgtf-title-section-holder text-white">
            <div className="ebs-no-margin-wrapp ebs-all-tags-white" style={{textAlign: settings.text_align ? settings.text_align : 'left'}} dangerouslySetInnerHTML={{__html: event.count_down_section.description}} />
        </div> }
      <div className="row py-5 d-flex align-items-center justify-content-center">
          <Countdown date={expiryDate.getTime() + 5000 } event={event} />
      </div>
      </div>

      </div>
    </div>
      )}
    </div>
  );
};

export default Variation13;



function Countdown({date,event}) {
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const [completed,setCompleted]=useState(false)
    const [targetDate, setTargetDate] = useState(new Date(formattedDate));
   const labels = {
    days: [event?.labels?.COUNTDOWN_LABEL_DAYS ],
    hours: [event?.labels?.COUNTDOWN_LABEL_HOURS],
    minutes: [event?.labels?.COUNTDOWN_LABEL_MINUTES],
    seconds: [event?.labels?.COUNTDOWN_LABEL_SECONDS],
  };
  const [parts, setParts] = useState({
    days: { text: labels.days, dots: 30 },
    hours: { text: labels.hours, dots: 24 },
    minutes: { text: labels.minutes, dots: 60 },
    seconds: { text: labels.seconds, dots: 60 },
  });
    // const [parts, setParts] = useState({
    //   days: { text: ['', 'day'], dots: 30 },
    //   hours: { text: ['', 'hour'], dots: 24 },
    //   minutes: { text: ['', 'minute'], dots: 60 },
    //   seconds: { text: ['', 'second'], dots: 60 },
    // });
  
    useEffect(() => {
      getRemainingTime(targetDate, parts);
    }, [targetDate, parts]);
  
    const getRemainingTime = (target, parts) => {
      const now = new Date();
      const remaining = {};
      let seconds = Math.floor((target - now) / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      hours = hours - (days * 24);
      minutes = minutes - (days * 24 * 60) - (hours * 60);
      seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
      remaining.days=days;
      remaining.hours=hours;
      remaining.minutes=minutes;
      remaining.seconds=seconds;
      if(days<0 || days==0){
        days=0;
        hours=0;
        minutes=0;
        seconds=0;
      }    
          Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
              const partEl = document.querySelector(`.${key}`);
              const remainingEl = partEl.querySelector('.remaining');
              const numberEl = remainingEl.querySelector('.number');
              // const textEl = remainingEl.querySelector('.text');
              numberEl.innerText = value;
              // textEl.innerText = parts[key].text[Number(value === 1)];
              const dots = partEl.querySelectorAll('.dot');
              dots.forEach((dot, idx) => {
                  dot.dataset.active = idx <= value;
                  dot.dataset.lastactive = idx === value;
                });
            });
            
      if (now <= target) {
        window.requestAnimationFrame(() => {
          getRemainingTime(target, parts);
        });
      }else{
        setCompleted(true)
      }
    };
  
    return (
        <>
      <div className="countdown">
        {Object.entries(parts).map(([key, value]) => (
            <div className="" key={key}>
            <div  className={`part ${key}`}>
            <div className="remaining">
              <span className="number"></span>
            </div>
            {Array.from({ length: value.dots }).map((_, idx) => (
                <div key={idx} className="dot-container" style={{ '--dot-idx': idx ,'--dots':value.dots }}>
                <div className="dot"></div>
              </div>
            ))}
          </div>
            <span className="text m-0 text-capitalize">{value.text[0]}</span>
            </div>
        ))}
         
      </div>
      <Completionist completed={completed} event={event} />
            </>
    );
  }





  const styleSheet=`
  .countdown{
  --number-color: hsl(0 0% 100%);
  --text-color: hsl(0 0% 25%);
  --dot-color:#707070;
  --dot-color-remaining:#FFFFFF;
  --dot-color-active: rgba(255,255,255, 0.3);
  font-family: system-ui, sans-serif;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(268px,1fr));
  row-gap: 2.5rem;
  column-gap: 3.5rem;
  width: 100%;
  margin-inline: auto;
  container: inline-size;
  .text {
       padding-top:40px;
        width: 100%;
        display: inline-block;
        color: var(--text-color);
        text-transform: uppercase;
        font-size: 32px;
        text-align:center;
        font-weight:500;
      }
   .part {
    aspect-ratio: 1/1;
    display: grid;
    place-items: center;
     .remaining {
      grid-area: 1/1;
      color: hsl(0 0% 100%);
      display: grid;
      text-align: center;
      font-size: 4cqi;
      .number {
        color: var(--number-color);
        font-size:90px;
        font-weight:500;
        letter-spacing: -5.4px;
        text-transform: lowercase;
      }
    }
     .dot-container {
      grid-area: 1/1;
      height: 100%;
      width: 4%;
      rotate: calc(360deg / var(--dots) * var(--dot-idx));
       .dot {
        width: 100%;
        aspect-ratio: 2/4;
        background-color: var(--dot-color);
        border-radius:2px;
        transition: background-color .25s;
        &[data-active=true]{
          background-color: var(--dot-color-remaining);
          &[data-lastactive=true]{
            background-color: var(--dot-color-active);
          }
        }
      }
    }
  }
}`