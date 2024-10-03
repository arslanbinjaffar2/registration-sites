import ActiveLink from "components/atoms/ActiveLink";
import React, {useRef, useState} from "react";
import TruncateMarkup from 'react-truncate-markup';
import Image from 'next/image'
import HeadingElement from 'components/ui-components/HeadingElement';
import Slider from "react-slick";

const Variation7 = ({ news, event_url, makeNewDetailURL, loadMore, newsSettings, siteLabels, homePage, moduleVariation}) => {
  const [height, setHeight] = useState(0);
  const iframe = useRef();
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
    const WrapperLayout = (props) => {

    const _parallax = React.useRef(null);
    React.useEffect(() => {
      window.addEventListener("scroll",scollEffect);
      return () => {
        window.removeEventListener("scroll",scollEffect);
      }
    }, [])
    
     function scollEffect () {
      const scrolled = window.pageYOffset;
      const itemOffset = _parallax.current.offsetTop;
      const itemHeight = _parallax.current.getBoundingClientRect();
      if (scrolled < (scrolled - window.innerHeight) || scrolled > (itemOffset + itemHeight.height)) return false;
        const _scroll = (scrolled - itemOffset) + itemHeight.height;
      _parallax.current.style.backgroundPosition = `50%  -${(_scroll * 0.1)}px`;
    };

    if (props.moduleVariation.background_image !== '') {
      return (
        <div ref={_parallax} style={{ backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + props.moduleVariation.background_image}`, backgroundPosition: "center", backgroundSize: 'cover' }} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding">
          {props.children}
        </div>
      );
    } else {
      return (
        <div ref={_parallax} style={{ backgroundPosition: "center", backgroundSize: 'cover' }} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding">
          {props.children}
        </div>
      );
    }

  }
  const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color} : {}

  return (
    <div className="module-section ebs-newstheme-v1">
        <WrapperLayout moduleVariation={moduleVariation}>
          <div style={{background: 'transparent'}} className="edgtf-container ebs-default-padding">
            <div className="container position-relative">
              <div className="ebs-buttons-carousel">
                <button className="btn btn-primary-outline text-white p-1 rounded-circle border lh-1" onClick={previous}>
                  <span class="material-icons lh-1">chevron_left</span>
                </button>
                <button className="btn btn-primary-outline text-white p-1 rounded-circle border lh-1" onClick={next}>
                  <span class="material-icons lh-1">chevron_right</span>
                </button>
              </div>
              <div className={`${(!newsSettings.subscriber_id || homePage) ? 'edgtf-full-width-inner' : 'edgtf-two-columns-75-25'} clearfix`}>
              {homePage && <HeadingElement dark={true} label={siteLabels.EVENTSITE_NEWS_LABEL ? siteLabels.EVENTSITE_NEWS_LABEL : "News"}  align={'left'} />}
                <div className="edgtf-column1 edgtf-content-left-from-sidebar">
                  <div className="edgtf-column-inner">
                    <div className="edgtf-blog-holder edgtf-blog-type-standard">
                      <Slider  ref={slider => {sliderRef = slider;}} {...settings}>
                        {news && news.map((item,i) => (
                          <div>
                            <article style={{animationDelay: 50*i+'ms',padding: '0 10px'}} className="ebs-animation-layer" key={item.id}>
                              <div className="edgtf-post-content">
                                {item.image && <div className="edgtf-post-image rounded-2 overflow-hidden mb-4">
                                  <ActiveLink
                                    itemProp="url"
                                    href={makeNewDetailURL(event_url, item.id)}
                                  >
                                    <span className="gallery-img-wrapper-rectangle-2">
                                      <img
                                        onLoad={(e) => e.target.style.opacity = 1}
                                        src={
                                          item.image && item.image !== ""
                                            ? process.env.NEXT_APP_EVENTCENTER_URL +
                                              "/assets/eventsite_news/" +
                                              item.image
                                            : require('public/img/exhibitors-default.png')
                                        }
                                        className="attachment-full size-full wp-post-image"
                                        alt="a"
                                        width="1500"
                                        height="500"
                                      />
                                      </span>
                                  </ActiveLink>
                                </div>}
                                <div className="edgtf-post-info">
                                      <div
                                        itemProp="dateCreated"
                                        className="edgtf-post-info-date entry-date updated text-white d-flex align-items-center"
                                      >
                                        <i className="material-icons text-primary me-1">date_range</i>{item.created_at}
                                      </div>
                                    </div>
                                <div style={{background: 'transparent'}} className="edgtf-post-text mt-0 pt-0">
                                  <div className="edgtf-post-text-inner">
                                    <h3
                                      itemProp="name"
                                      className="entry-title edgtf-post-title mt-0 pt-0"
                                    >
                                      <ActiveLink
                                        className="text-white"
                                        itemProp="url"
                                        href={makeNewDetailURL(event_url, item.id)}
                                      >
                                        {item.title}
                                      </ActiveLink>
                                    </h3>
                                    <div className="edgtf-post-excerpt ebs-edgtf-post-line-clamp" dangerouslySetInnerHTML={{__html:item.body}}></div>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                  {(news.length > 0 && !homePage) &&  loadMore()}
                </div>
                {(news.length === 0 && !homePage) && <div>{siteLabels.GENERAL_NO_RECORD}</div>}
                {(newsSettings.subscriber_id !== null && newsSettings.subscriber_id !== '' && !homePage) && (
                  <div className="edgtf-column2">
                    <div className="edgtf-sidebar">
                        <iframe
                          ref={iframe}
                          onLoad={() => {
                            setHeight(iframe.current.contentWindow.window.top.document.body.scrollHeight - window.innerHeight > 400 ? iframe.current.contentWindow.window.top.document.body.scrollHeight - 200 : window.innerHeight);
                          }}
                          width="100%"
                          height={height > 0 ? height: 400}
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
      </WrapperLayout>
    </div>
  );
};

export default Variation7;
