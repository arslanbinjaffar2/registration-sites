import {Link} from "react-router-dom";
import React,{useState} from 'react';
import TruncateMarkup from 'react-truncate-markup';

const Variation3 = ({news, event_url, makeNewDetailURL, loadMore}) => {
  return (
    <div style={{padding: '80px 0'}} className='edgtf-container'>
       <div className="container">
         <div className={`${ 'edgtf-full-width-inner'} clearfix`}>

           <div className="edgtf-column1 edgtf-content-left-from-sidebar">
            <div className="edgtf-column-inner">
              <div className="edgtf-blog-holder edgtf-blog-type-split-column ">
                {news.map((item,i)=>(
                    <article style={{animationDelay: 50*i+'ms'}} className="ebs-animation-layer" key={item.id}>
                      <div className="edgtf-post-content">
                        {item.image && <div className="edgtf-post-image">
                          <Link itemProp="url" to={makeNewDetailURL(event_url,item.id)}>
                            <span className="gallery-img-wrapper-rectangle-2">
                              <img onLoad={(e) => e.target.style.opacity = 1} src={item.image && item.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/eventsite_news/" + item.image : ""} className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                            </span>
                          </Link>
                        </div>}
                        <div className="edgtf-post-text">
                          <div className="edgtf-post-text-inner">
                            <h3 itemProp="name" className="entry-title edgtf-post-title">
                              <Link itemProp="url" to={makeNewDetailURL(event_url,item.id)}>
                                {item.title}
                              </Link>
                            </h3>
                            <div className="edgtf-post-info">
                              <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                                {item.created_at}
                              </div>
                            </div>
                            
                            <TruncateMarkup lines={3}>
                              <p className="edgtf-post-excerpt">{item.body.replace(/<(.|\n)*?>/g, '')}</p>
                            </TruncateMarkup>
                          </div>
                        </div>
                      </div>
                    </article>
                ))}
              </div>
            </div>
           </div>
           {news.length > 0 &&  loadMore()}
           {/* {sidebar && <div className="edgtf-column2">
             <div className="edgtf-sidebar">
               <h4 className="edgtf-widget-title">Sidebar</h4>
             </div>
           </div>} */}

         </div>
       </div>
      </div>
  )
}

export default Variation3
