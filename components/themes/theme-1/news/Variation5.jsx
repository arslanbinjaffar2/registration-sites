import React, {useEffect, useMemo, useRef, useState} from "react";
import Image from 'next/image'
import ActiveLink from "components/atoms/ActiveLink";

const Variation5 = ({ news, event_url, makeNewDetailURL, loadMore, newsSettings, siteLabels, homePage, moduleVariation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ShowAllModules,setShowAllModules]=useState({
    modules:4
  })
  const [firstModule=[],secondModule=[],...rest]=news || []
  const firstTwoModule = useMemo(() => [firstModule, secondModule], [news]);
  const restModules = useMemo(() => rest, [news]);
  const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color} : {}  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
 

 function FirstTwoNewsModules(){
  return(
    firstTwoModule.length>0? firstTwoModule.map((item)=>{
      return(
        <SingleNewModule key={item.id} height={"360px"} top={"86%"} makeNewDetailURL={makeNewDetailURL} event_url={event_url} {...item} />
      )
    }):""
  )
 }
 function RestNewsModules(){
  return(
    restModules.length>0? restModules.slice(0,ShowAllModules.modules).map((item)=>{
      return(
        <SingleNewModule key={item.id} height={"293px"} top={"84%"} makeNewDetailURL={makeNewDetailURL} event_url={event_url} {...item}/>
      )
    }):""
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
if (!news || news.length === 0) {
  return <p>No news available.</p>;
}
  return (
    <div style={bgStyle}  className="edgtf-container ebs-default-padding">
      <div className="container">
        <div className={`${(!newsSettings.subscriber_id || homePage) ? 'edgtf-full-width-inner' : 'edgtf-two-columns-75-25'} clearfix`}>
         {/* {homePage && <HeadingElement dark={false} label={siteLabels.EVENTSITE_NEWS_LABEL ? siteLabels.EVENTSITE_NEWS_LABEL : "News"}  align={'center'} />} */}
         <div className="row d-flex justify-content-between w-100 ">
            <h2 className="col-md-6 col-12 d-flex flex-column m-0">
              <span >{siteLabels.EVENTSITE_NEWS_LABEL ? siteLabels.EVENTSITE_NEWS_LABEL : "News"}</span>
              <span className="ebs-heading-bottom-border d-inline-block  mt-4"></span>
            </h2>
          </div>
          {/* container */}
         <div className="d-flex flex-column">
         <div className="grid-layout-container">
           <FirstTwoNewsModules/>
         </div>
         <div className="grid-layout-container">
         <RestNewsModules/>
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

export default Variation5;
function SingleNewModule({makeNewDetailURL,event_url,id,created_at,body,title,image,height,top}){
  return(
  <div className="h-100">
  <ActiveLink itemProp="url" href={makeNewDetailURL(event_url, id)}>
<figure className="m-0 w-100  position-relative" style={{height}}>
                              {image ? 
                               <img
                                onLoad={(e) => e.target.style.opacity = 1}
                                src={
                                  image && image !== ""
                                     ? process.env.NEXT_APP_EVENTCENTER_URL +
                                       "/assets/eventsite_news/" +
                                       image
                                     : require('public/img/exhibitors-default.png')
                                 }
                                 className="w-100 h-100"
                                alt="g"
                              />
                              :
                              <Image objectFit='contain' layout="fill"
                                onLoad={(e) => e.target.style.opacity = 1}
                                src={
                                  require("public/img/user-placeholder.jpg")
                                }
                                alt="g"
                              />}
                        
                      

    <span style={{ top }} className="position-absolute border d-flex justify-content-center align-items-center px-3 py-6 rounded-5 h-29 ebs-news-date bg-white">{created_at}</span>
  </figure>
     <h3 className="m-0 mt-4 fs-24 fw-semibold">{title}</h3>
  </ActiveLink>
     <p className="edgtf-post-excerpt ebs-edgtf-post-line-clamp-new m-0 mt-3" dangerouslySetInnerHTML={{__html:body}}></p>
  </div>

  )
}
