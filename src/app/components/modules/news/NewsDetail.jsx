import React, { Component } from 'react';
import {EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon} from "react-share";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {service} from "../../../services/service";

class NewsDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      news: {},
      newsId : this.props.match.params.id,
    }

  }

  componentDidMount() {
    this.loadNewsDetails(this.state.newsId)
  }

  loadNewsDetails(id) {
    service.get(`${process.env.REACT_APP_URL}/event/${this.props.event.url}/news/${id}/detail`).then(
        response => {
          this.setState({
            news: response.data
          });
        }
    )
  }

  render() {
    const {sidebar, news} = this.state
    if(Object.entries(news).length === 0) return <div>Loading...</div>;
    return (

      <div style={{paddingTop: '80px'}} className='edgtf-container'>
        <div className="edgtf-container-inner">
          <div className={`${sidebar ? 'edgtf-two-columns-75-25' : 'edgtf-full-width-inner'} clearfix`}>
            <div className="edgtf-column1 edgtf-content-left-from-sidebar">
              <div className="edgtf-column-inner">
                <div className="edgtf-blog-holder edgtf-blog-type-standard">
                  <article>
                    <div className="blog-post-social">
                      <FacebookIcon size={32} round={true}  />
                      <TwitterIcon size={32} round={true}  />
                      <LinkedinIcon size={32} round={true}  />
                      <EmailIcon size={32} round={true}  />
                    </div>
                    <div className="edgtf-post-content">
                      <div className="edgtf-post-image">
                        <a itemProp="url" href="">
                          <img src={news.image && news.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + "/assets/eventsite_news/" + news.image : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"}  className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                        </a>
                      </div>
                      <div className="edgtf-post-text">
                        <div className="edgtf-post-text-inner">
                          <h2 itemProp="name" className="entry-title edgtf-post-title">
                            <a itemProp="url" href="#!" title="Web Analytics Made Easy">
                              {news.title}
                            </a>
                          </h2>
                          <div className="edgtf-post-info">
                            <div style={{fontSize: 15}} itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                              {news.created_at}
                            </div>
                          </div>
                          <div style={{marginBottom: 40,marginTop: 0}} className="edgtf-post-info-bottom"></div>
                          <p itemProp="description" className="edgtf-post-excerpt"  dangerouslySetInnerHTML = {{__html:news.body}} />

                        </div>
                      </div>
                    </div>
                  </article>
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

function mapStateToProps(state) {
  const { event } = state;
  return {
    event
  };
}

export default connect(mapStateToProps)(withRouter(NewsDetail));