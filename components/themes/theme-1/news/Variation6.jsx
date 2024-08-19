import ActiveLink from "components/atoms/ActiveLink";
import React, {useEffect, useRef, useState} from "react";
import TruncateMarkup from 'react-truncate-markup';
import Image from 'next/image'
import HeadingElement from 'components/ui-components/HeadingElement';

const Variation6 = ({ news, event_url, makeNewDetailURL, loadMore, newsSettings, siteLabels, homePage, moduleVariation}) => {
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
   news.length>0? news.slice(0,).map((item)=>{
      return(
        <SingleNewModule key={item.id}  makeNewDetailURL={makeNewDetailURL} event_url={event_url} {...item} />
      )
    }):""
  )
 }
 
  return (
    <div  className="edgtf-container ebs-default-padding">
      <div className="container">
        <div className={`${(!newsSettings.subscriber_id || homePage) ? 'edgtf-full-width-inner' : 'edgtf-two-columns-75-25'} clearfix`}>
         {/* {homePage && <HeadingElement dark={false} label={siteLabels.EVENTSITE_NEWS_LABEL ? siteLabels.EVENTSITE_NEWS_LABEL : "News"}  align={'center'} />} */}
         {/* <div className="row d-flex justify-content-between w-100 ">
            <h2 className="col-md-6 col-12 d-flex flex-column m-0">
              <span >{siteLabels.EVENTSITE_NEWS_LABEL ? siteLabels.EVENTSITE_NEWS_LABEL : "News"}</span>
              <span className="ebs-heading-bottom-border d-inline-block  mt-4"></span>
            </h2>
            <p className="col-md-6 col-12 m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac felis et leo efficitur consequat.</p>
          </div> */}
          {/* container */}
          <div className="d-flex flex-column gap-40  mt-40">
          <NewsModules />
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Variation6;

function SingleNewModule({id,created_at,body,title,image,makeNewDetailURL,event_url}){
  const [width,setWidth]=useState(window.innerWidth) 
   useEffect(()=>{
    const handleRize=()=>{
      setWidth(window.innerWidth);
    }
    addEventListener('resize',handleRize);

    return ()=>{
      removeEventListener('resize',handleRize);
    }
   },[width])
  return(
    <div className="row" style={{ gap:"0px" }}>
    <div className="col-md-6 col-12 ebs-left-side-container p-40">
     <h3 className="m-0 fs-24 fw-semibold text-light">{title}</h3>
     <p className="edgtf-post-excerpt ebs-edgtf-post-line-clamp mt-3" dangerouslySetInnerHTML={{__html:body}}></p>
     <button className="bg-light d-flex justify-content-center align-items-center align-self-center mt-32   p-0 rounded-2 ebs-view-btn">
          <span className="py-12 px-3">View All</span>
          <span class="Button-styles__ButtonIcon-sc-37ebb3b-1 jnfvHm button__icon"><span data-cy="icon-arrow-right" class="Icon-styles__IconDefinitions-sc-274238bf-1 hZWJIC">   
              <span className="material-symbols-outlined text-white d-flex justify-content-center align-items-center"> arrow_right_alt</span>
              </span></span>       
    </button>
  </div>
  <div className="bg-black col-md-6 col-12 p-0">
  <ActiveLink itemProp="url" href={makeNewDetailURL(event_url, id)}>
  {image &&  <figure className="m-0 w-100  position-relative" style={{ height:width<=570?"408px":"100%" }}>
                            <Image
                              layout="fill"
                              onLoad={(e) => e.target.style.opacity = 1}
                              src={
                               image && image !== ""
                                  ? process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/eventsite_news/" +
                                    image
                                  : require('public/img/exhibitors-default.png')
                              }
                              className="attachment-full size-full wp-post-image"
                              alt="a"
                            />
    {/* <span className="position-absolute border d-flex justify-content-center align-items-center px-3 py-6 rounded-5 h-29 ebs-news-date bg-white" 
   >{created_at}</span> */}
  </figure>}
  </ActiveLink>
  </div>
    </div>
  )
}