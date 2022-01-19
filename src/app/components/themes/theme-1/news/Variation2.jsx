import { Link } from "react-router-dom";
import React, {useState} from "react";
import TruncateMarkup from 'react-truncate-markup';

const Variation2 = ({ news, event_url, makeNewDetailURL, loadMore }) => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div style={{ paddingTop: "30px" }} className="edgtf-container">
      <div className="edgtf-container-inner">
        <div
          className={`${
            sidebar ? "edgtf-two-columns-75-25" : "edgtf-full-width-inner"
          } clearfix`}
        >
          <div className="edgtf-column1 edgtf-content-left-from-sidebar">
            <div className="edgtf-column-inner">
              <div className="edgtf-blog-holder edgtf-blog-type-standard">
                {news.map((item) => (
                  <article key={item.id}>
                    <div className="edgtf-post-content">
                      <div className="edgtf-post-image">
                        <Link
                          itemProp="url"
                          to={makeNewDetailURL(event_url, item.id)}
                        >
                          <img
                            src={
                              item.image && item.image !== ""
                                ? process.env.REACT_APP_EVENTCENTER_URL +
                                  "/assets/eventsite_news/" +
                                  item.image
                                : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"
                            }
                            className="attachment-full size-full wp-post-image"
                            alt="a"
                            width="1500"
                            height="500"
                          />
                        </Link>
                      </div>
                      <div className="edgtf-post-text">
                        <div className="edgtf-post-text-inner">
                          <h3
                            itemProp="name"
                            className="entry-title edgtf-post-title"
                          >
                            <Link
                              itemProp="url"
                              to={makeNewDetailURL(event_url, item.id)}
                            >
                              {item.title}
                            </Link>
                          </h3>
                          <div className="edgtf-post-info">
                            <div
                              itemProp="dateCreated"
                              className="edgtf-post-info-date entry-date updated"
                            >
                              {item.created_at}
                            </div>
                          </div>
                          <TruncateMarkup lines={3}>
                            <p className="edgtf-post-excerpt">{item.body.replace(/<(.|\n)*?>/g, '')}</p>
                          </TruncateMarkup>
                          <div
                            style={{ marginBottom: 40 }}
                            className="edgtf-post-info-bottom"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {sidebar && (
            <div className="edgtf-column2">
              <div className="edgtf-sidebar">
                <h4 className="edgtf-widget-title">Sidebar</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Variation2;
