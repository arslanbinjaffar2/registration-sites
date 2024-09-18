import ActiveLink from "components/atoms/ActiveLink";
import React, {useEffect, useRef, useState} from "react";
import TruncateMarkup from 'react-truncate-markup';
import Image from 'next/image'
import HeadingElement from 'components/ui-components/HeadingElement';
import { useRouter } from "next/router";

const Variation4 = ({ news, event_url, makeNewDetailURL, loadMore, newsSettings, siteLabels, homePage, moduleVariation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ShowAllModules,setShowAllModules]=useState({
    modules:4
  })
  const [height, setHeight] = useState(0);
  const iframe = useRef();
  const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color} : {}  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  
 function NewsModules(){
  return(
   news.length>0? news.slice(0,ShowAllModules.modules).map((item,index)=>{
      return(
        <SingleNewModule key={item.id}  index={index} setShowAllModules={setShowAllModules}  makeNewDetailURL={makeNewDetailURL} event_url={event_url} {...item}/>
      )
    }):null
  )
 }
 
 const toggleVisibility = () => {
  if (window.pageYOffset > 300) {
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }
};

 
 const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

useEffect(() => {
  window.addEventListener('scroll', toggleVisibility);
  return () => window.removeEventListener('scroll', toggleVisibility);
}, []);
 const handleViewAll = () => {
  setShowAllModules({ ...ShowAllModules, modules: news.length });
};
console.log(news.length,"new length")
  return (
    <div style={bgStyle}  className="edgtf-container ebs-default-padding">
      <div className="container">
        <div className={`${(!newsSettings.subscriber_id || homePage) ? 'edgtf-full-width-inner' : 'edgtf-two-columns-75-25'} clearfix`}>
         {/* {homePage && <HeadingElement dark={false} label={siteLabels.EVENTSITE_NEWS_LABEL ? siteLabels.EVENTSITE_NEWS_LABEL : "News"}  align={'center'} />} */}
          <div className="row d-flex justify-content-between w-100">
            <h2 className="col-md-6 col-12 d-flex flex-column m-0">
              <span >{siteLabels.EVENTSITE_NEWS_LABEL ? siteLabels.EVENTSITE_NEWS_LABEL : "News"}</span>
              <span className="ebs-heading-bottom-border d-inline-block  mt-4"></span>
            </h2>
          </div>
          {/* container */}
         <div className="d-flex flex-column mt-40">
         <div className="d-flex flex-column gap-3">
          {NewsModules()}
         </div>
        {ShowAllModules.modules < news.length && <button onClick={handleViewAll} className="d-flex justify-content-center align-items-center align-self-center mt-32   p-0 rounded-2 ebs-view-btn">
          <span className="py-12 px-3">View All</span>
          <span class="Button-styles__ButtonIcon-sc-37ebb3b-1 jnfvHm button__icon"><span data-cy="icon-arrow-right" class="Icon-styles__IconDefinitions-sc-274238bf-1 hZWJIC">   
              <span className="material-symbols-outlined text-white d-flex justify-content-center align-items-center"> arrow_right_alt</span>
              </span></span>       
         </button>}
         {!homePage && isVisible && <button className="ebs-scrollTop-btn" onClick={scrollToTop}>
         <span class="material-symbols-outlined">
          arrow_upward
          </span>
         </button>}
         </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Variation4;





function SingleNewModule({event_url,created_at,body,title,id}){
  const {push}=useRouter()
  const ebsDateStyle={
    width:"fit-content",
  }
 const handleShowDetail=()=>{
  push(`/${event_url}/news/${id}`)
 }
 const regex = /(\d{1,2})\s([a-zA-Z]{3})[a-zA-Z]*\s(\d{4})/i; 
 const created_at_with_comma = created_at.replace(regex, "$1 $2, $3");
  return(
    <div className="border  p-md-4 p-3  rounded-2  ebs-news-single-new-module-item">
    <div className="d-flex justify-content-between align-items-center row">
     <div className="col-lg-10">
    <span className="border d-flex justify-content-center align-items-center px-3 py-6 rounded-5 h-29 ebs-news-date"style={ebsDateStyle}>{created_at_with_comma}</span>
     <h3 className="m-0 mt-2 fs-24  fw-medium" style={{ textTransform:"unset" }}>{title}</h3>
     {/* <div className="m-0 mt-2" contentEditable='true' dangerouslySetInnerHTML={{ __html: body }}></div> */}
     <p className="edgtf-post-excerpt ebs-edgtf-post-line-clamp-new m-0 mt-2" dangerouslySetInnerHTML={{__html:body}}></p>
    </div>
    <div className="col-lg-2 d-flex justify-content-lg-end justify-content-start mt-md-0 mt-2">
    <button onClick={handleShowDetail}
    className="d-flex justify-content-center align-items-center  border ebs-read-more-btn rounded-1 py-12 px-3 bg-transparent gap-1">
     <span >Read more</span>
     {/* <span className="material-symbols-outlined " style={{ fontSize:"18px" }}>chevron_right</span> */}
     <Image objectFit='contain' layout="fixed" width={'7px'} height={'12px'} src={require('public/img/arrow-right.svg')} alt="" className=""/>
    </button>
    </div>
     </div>
  </div>
  )
}