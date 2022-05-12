import React, {useEffect, useState} from 'react'
import {
    fetchNewsletterData,
    newsLetterSelector,
    updateNewsLetterData,
  } from "store/Slices/myAccount/newsletterSlice";
  import { eventSelector } from "store/Slices/EventSlice";
  import { useSelector, useDispatch } from "react-redux";
const ManageNewsLetter = () => {
    const { event } = useSelector(eventSelector);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchNewsletterData(event.id, event.url));
    }, []);
    const { newsletter } = useSelector(newsLetterSelector);
    return (
        <div className="edgtf-container ebs-my-profile-area pb-5">
        <div className="edgtf-container-inner">
          <div className="ebs-header">
            <h2>My Subscriptions</h2>
          </div>
          <div className="wrapper-inner-content network-category-sec">
                {newsletter && <ManageNewsLetterList newsletter={newsletter} event={event} />}
          </div>
        </div>
      </div>
  )
}

export default ManageNewsLetter


const ManageNewsLetterList = ({newsletter, event}) => {
  const [subsriberList, setsubsriberList] = useState(newsletter.subscriber_detail.subscriber_list);
  const [mySubscriberListPrev, setmySubscriberListPrev] = useState(newsletter.subscriber_detail.subscriber_list.filter((item)=>(item.isExists)).map((item)=>(item.id)));
  const [mySubscriberListNew, setmySubscriberListNew] = useState(newsletter.subscriber_detail.subscriber_list.filter((item)=>(item.isExists)).map((item)=>(item.id)));
  const dispatch = useDispatch();

  const addSubscription = (iId) =>{
    if(mySubscriberListNew.indexOf(iId) === -1) {
        setmySubscriberListNew([...mySubscriberListNew, iId])
      }else{
        setmySubscriberListNew([...mySubscriberListNew.filter((item)=>( item !== iId))])
      }
  }
  const handleSave = () =>{
    dispatch(updateNewsLetterData(event.id, event.url, { previous_ids:mySubscriberListPrev, subscriber_ids:mySubscriberListNew }));
  }
  return (
    <div className='radio-check-field'>
        <h5></h5>
       {subsriberList.map((item)=>(
           <label key={item.id} onClick={()=>{addSubscription(item.id)}} className={ mySubscriberListNew.indexOf(item.id) !== -1 ? 'checked': ''}><span>{item.name}</span></label>
        )) 
    }    
        <div className="bottom-button">
              <button className="btn btn-save-next btn-loader" onClick={(e)=>{handleSave(e)}}> Save </button>
          </div>
    </div>

  )
}
