import React, { Component } from 'react'
import {Link} from "react-router-dom";

class Newsv2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      news: props.news,
      event_url: props.event_url
    }
  }

  render() {

    const {sidebar, news, event_url} = this.state

    return (
      <div style={{paddingTop: '80px'}} className='edgtf-container'>
       <div className="edgtf-container-inner">
         <div className={`${sidebar ? 'edgtf-two-columns-75-25' : 'edgtf-full-width-inner'} clearfix`}>

           <div className="edgtf-column1 edgtf-content-left-from-sidebar">
            <div className="edgtf-column-inner">
              <div className="edgtf-blog-holder edgtf-blog-type-standard">
                {news.map(item=>(
                <article key={item.id}>
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <Link itemProp="url" to={this.props.makeNewDetailURL(event_url,item.id)}>
                        <img src={item.image && item.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/eventsite_news/" + item.image : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"} className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                      </Link>
                    </div>
                  <div className="edgtf-post-text">
                    <div className="edgtf-post-text-inner">
                      <h3 itemProp="name" className="entry-title edgtf-post-title">
                        <Link itemProp="url" to={this.props.makeNewDetailURL(event_url,item.id)}>
                          {item.title}
                        </Link>
                      </h3> 
                      <div className="edgtf-post-info">
                        <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          {item.created_at}
                        </div> 
                      </div>
                      <p itemProp="description" className="edgtf-post-excerpt"  dangerouslySetInnerHTML = {{__html:item.body}} />
                      <div style={{marginBottom: 40}} className="edgtf-post-info-bottom"></div>
                    </div>
                  </div>
                  </div>
                </article>
                ))}
              </div>
            </div>
           </div>

           {sidebar && <div className="edgtf-column2">
             <div className="edgtf-sidebar">
               <h4 className="edgtf-widget-title">Sidebar</h4>
             </div>
           </div>}

         </div>
       </div>
      </div>
    )
  }
}

export default Newsv2