import React, { useState, useRef } from "react";
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'
import PageHeader from "components/modules/PageHeader";
import HeadingElement from "components/ui-components/HeadingElement";

const arrayTraverse = (array, menu_id, currentPage, eventSiteModuleName) => {
  let returnArray = [{ id: "module", name: eventSiteModuleName, type: "menu" }];
  let toFolder = null;
  if (menu_id && menu_id !== 'module') {
    toFolder = array.find((item) => (item.id === parseFloat(menu_id)));
  }

  if (toFolder) {
    returnArray.push({ id: toFolder.id, name: toFolder.info.name, type: toFolder.page_type ? toFolder.page_type : 'menu' });
  }

  returnArray.push({ id: currentPage.id, name: currentPage.name, type: 'page' });
  return returnArray;
}

const CmsDetail = ({ detail, labels ,moduleName, breadCrumbData, eventSiteModuleName, eventUrl, eventsiteSettings }) => {
  const [breadCrumbs, setBreadCrumbs] = useState(arrayTraverse(breadCrumbData, detail.menu_id, detail, eventSiteModuleName));
  const [height, setHeight] = useState(0);
  const [Loading, setLoading] = useState(true);
  const iframe = useRef();

  const informationModules = {
    additional_information: "additional_info",
    general_information: "general_info",
    practicalinformation: "event_info",
  };

  return (
    <React.Fragment>
    <PageHeader label={detail.name}  align={'left'} showBreadcrumb={eventsiteSettings.show_eventsite_breadcrumbs}  breadCrumbs={(type,headcolor)=>{
      return ( <nav aria-label="breadcrumb" className={`ebs-breadcrumbs ${type !== "background" ? 'ebs-dark': ''}`}>
       <ul className="breadcrumb">
         {breadCrumbs.map((crumb, i) => (
           <li className="breadcrumb-item" key={i} style={{ color: headcolor}}>
             {crumb.id === detail.id ? crumb.name : <ActiveLink href={`/${eventUrl}/${moduleName}?menu_id=${crumb.id}`} ><span style={{ color: headcolor}}>{crumb.name}</span></ActiveLink>}
           </li>
         ))}
       </ul>
   </nav>)
    }} >       
      </PageHeader> 
      <div style={{ paddingTop: "30px" }} className="edgtf-container">
        <div className="edgtf-container-inner container">
          <div className={`${"edgtf-full-width-inner"} clearfix`}>
            
            <div className="edgtf-column1 edgtf-content-left-from-sidebar">
              <div className="edgtf-column-inner">
                <div className="edgtf-blog-holder edgtf-blog-type-standard">
                  <article>
                    <div className="edgtf-post-content">
                      {detail.image && detail.image_position === 'top' && (
                        <div className="edgtf-post-image">
                          <a itemProp="url" href="">
                            {detail.image && detail.image !== "" ? (
                              <img
                                onLoad={(e) => e.target.style.opacity = 1}
                                src={
                                  process.env.NEXT_APP_EVENTCENTER_URL +
                                  `/assets/${informationModules[moduleName]}/` +
                                  detail.image
                                }
                                className="attachment-full size-full wp-post-image"
                                width="1500"
                                height="500"
                                alt="Post Image"
                              />
                            ) : (
                              <Image objectFit='contain' layout="fill"
                                onLoad={(e) => e.target.style.opacity = 1}
                                src=""
                                alt="Post Image"
                              />
                            )}
                          </a>
                        </div>
                      )}
                      <div className="edgtf-post-text">
                        <div className="edgtf-post-text-inner">
                          {detail.description && (
                            <div>
                              {Loading && 
                              <div className="d-flex justify-content-center"> 
                                <div style={{width: '6rem', height: '6rem'}} className="spinner-border"> <span className="sr-only">Loading...</span></div>
                              </div>}
                              <iframe
                                ref={iframe}
                                onLoad={() => {
                                  const obj = iframe.current;
                                  obj.contentWindow.document.body.style.fontFamily = '"Open Sans", sans-serif';
                                  setHeight(
                                    obj.contentWindow.document.body.scrollHeight +
                                    200
                                  );
                                  setLoading(false)
                                }}
                                width="100%"
                                height={height}
                                title="test"
                                itemProp="description"
                                className="edgtf-post-excerpt"
                                srcDoc={detail.description}
                              />
                            </div>
                          )}

                          {detail.pdf && (
                            <div className="infobooth-pdf">
                              <a
                                href={`${process.env.NEXT_APP_EVENTCENTER_URL}/assets/${informationModules[moduleName]}/${detail.pdf}`}
                                download
                                target="_blank" rel="noreferrer"
                                style={{
                                  border: "none !important",
                                  float: "left",
                                }}
                              >
                                <img
                                  alt="Pdf"
                                  className="infoBoothImage"
                                  src={`${process.env.NEXT_APP_EVENTCENTER_URL}/_mobile_assets/images/pdf.png`}
                                  width="40"
                                  style={{ border: "none !important" }}
                                />
                              </a>
                              <a
                                href={`${process.env.NEXT_APP_EVENTCENTER_URL}/assets/${informationModules[moduleName]}/${detail.pdf}`}
                                className="link_infobooth"
                                target="_blank" rel="noreferrer"
                                download
                              >
                                <span>{detail.pdf_title ? detail.pdf_title : labels?.PRACTICAL_INFORMATION_VIEW_DOCUMENT ?? "View Document"}</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      {detail.image && detail.image_position !== 'top' && (
                        <div className="edgtf-post-image">
                          <a itemProp="url" href="">
                            {detail.image && detail.image !== "" ? (
                              <img
                                onLoad={(e) => e.target.style.opacity = 1}
                                src={
                                  process.env.NEXT_APP_EVENTCENTER_URL +
                                  `/assets/${informationModules[moduleName]}/` +
                                  detail.image
                                }
                                className="attachment-full size-full wp-post-image"
                                width="1500"
                                height="500"
                                alt="Post Image"
                              />
                            ) : (
                              <Image objectFit='contain' layout="fill"
                                onLoad={(e) => e.target.style.opacity = 1}
                                src=""
                                alt="Post Image"
                              />
                            )}
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default CmsDetail;
