import React, { useState, useRef } from "react";
import Masonry from "react-masonry-css";
import ActiveLink from "components/atoms/ActiveLink";
import TruncateMarkup from 'react-truncate-markup';
import Image from 'next/image'
import HeadingElement from 'components/ui-components/HeadingElement';

const Variation2 = ({ news, event_url, makeNewDetailURL, loadMore, newsSettings, newsSubscriberSetting, siteLabels, homePage, moduleVariation }) => {
  const [height, setHeight] = useState(0);
  const iframe = useRef();
  const breakpointColumnsObj = {
    default: newsSettings.subscriber_id ? 2 : 3,
    1100: 2,
    700: 2,
    500: 1,
  };
  const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color} : {}

  return (
    <div style={{paddingLeft: 0, paddingRight: 0, ...bgStyle}} className="edgtf-container ebs-default-padding">
      <div className="container">
        <div className={`${(!newsSettings.subscriber_id || homePage) ? 'edgtf-full-width-inner' : 'edgtf-two-columns-75-25'} clearfix`}>
         {homePage && <HeadingElement dark={false} label={siteLabels.EVENTSITE_NEWS_LABEL ? siteLabels.EVENTSITE_NEWS_LABEL : "News"}  align={'center'} />}
          <div className="edgtf-column1 edgtf-content-left-from-sidebar">
            <div className="edgtf-column-inner">
              <div className="edgtf-blog-holder edgtf-blog-type-standard">
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {news.map((item, i) => (
                    <article className="ebs-animation-layer" style={{ animationDelay: 50 * i + 'ms' }} key={item.id}>
                      <div className="edgtf-post-content">
                        {item.image && <div className="edgtf-post-image">
                          <ActiveLink
                            itemProp="url"
                            href={makeNewDetailURL(event_url, item.id)}
                          >
                            <span className="gallery-img-wrapper-rectangle-2">
                              {item.image && item.image !== "" ? (
                                <img
                                  onLoad={(e) => e.target.style.opacity = 1}
                                  src={
                                    process.env.NEXT_APP_EVENTCENTER_URL +
                                    "/assets/eventsite_news/" +
                                    item.image
                                  }
                                  className="attachment-full size-full wp-post-image"
                                  alt="a"
                                  width="1500"
                                  height="500"
                                />
                              ) : (
                                <Image objectFit='contain' layout="fill"
                                  onLoad={(e) => e.target.style.opacity = 1}
                                  src={
                                    require('public/img/exhibitors-default.png')
                                  }
                                  className="attachment-full size-full wp-post-image"
                                  alt="a"
                                  width="1500"
                                  height="500"
                                />
                              )}
                            </span>
                          </ActiveLink>
                        </div>}
                        <div className="edgtf-post-text">
                          <div className="edgtf-post-text-inner">
                            <h3
                              itemProp="name"
                              className="entry-title edgtf-post-title"
                            >
                              <ActiveLink
                                itemProp="url"
                                href={makeNewDetailURL(
                                  event_url,
                                  item.id
                                )}
                              >
                                {item.title}
                              </ActiveLink>
                            </h3>
                            <div className="edgtf-post-info">
                              <div
                                itemProp="dateCreated"
                                className="edgtf-post-info-date entry-date updated"
                              >
                                {item.created_at}
                              </div>
                            </div>
                            <p className="edgtf-post-excerpt ebs-edgtf-post-line-clamp" dangerouslySetInnerHTML={{__html:item.body}}></p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </Masonry>
              </div>
            </div>
            {(news.length > 0 && !homePage) && loadMore()}
          </div>
          {(news.length === 0 && !homePage) && <div>{siteLabels.GENERAL_NO_RECORD}</div>}
          {newsSettings.subscriber_id != null && newsSettings.status != 0 && !homePage && (
            <div className="edgtf-column2">
              <div className="edgtf-sidebar">
                <iframe
                  ref={iframe}
                  onLoad={() => {
                    setHeight(iframe.current.contentWindow.window.top.document.body.scrollHeight - window.innerHeight > 400 ? iframe.current.contentWindow.window.top.document.body.scrollHeight - 200 : window.innerHeight);
                  }}
                  width="100%"
                  height={height > 0 ? height : 400}
                  title="test"
                  itemProp="description"
                  className="edgtf-post-excerpt"
                  src={`${process.env.NEXT_APP_URL}/event/${event_url}/getMailingListSubscriberForm/${newsSettings.subscriber_id}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Variation2;
