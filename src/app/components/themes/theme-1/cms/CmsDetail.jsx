import React, {useState, useRef} from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../modules/PageHeaders/PageHeader";
import HeadingElement from "@/ui-components/HeadingElement";

const arrayTraverse = (array, menu_id, currentPage, eventSiteModuleName) => {
console.log(array, menu_id, currentPage, eventSiteModuleName);
let returnArray = [{id:"module", name: eventSiteModuleName, type: "menu"}];
  let toFolder = null;
  if(menu_id && menu_id !== 'module'){
    toFolder = array.find((item)=>(item.id === parseFloat(menu_id)));
    }

if(toFolder){
  returnArray.push({id:toFolder.id, name:toFolder.info.name, type: toFolder.page_type ? toFolder.page_type : 'menu'});
}

returnArray.push({id: currentPage.id, name: currentPage.name, type:'page' });
return returnArray;
}

const CmsDetail = ({ detail, moduleName, breadCrumbData, eventSiteModuleName, eventUrl }) => {
  const [breadCrumbs, setBreadCrumbs] = useState(arrayTraverse(breadCrumbData, detail.menu_id, detail, eventSiteModuleName));
  const [height, setHeight] = useState(0);
  const iframe = useRef();

  const informationModules = {
    additional_information: "additional_info",
    general_information: "general_info",
    practicalinformation: "event_info",
  };

  return (
    <React.Fragment>
          <PageHeader type={'background'}>
            <HeadingElement dark={true} label={detail.name}  align={'left'} />
            <nav aria-label="breadcrumb" className="ebs-breadcrumbs">
                <ul className="breadcrumb">
                  {breadCrumbs.map((crumb, i) => (
                    <li className="breadcrumb-item" key={i}>
                      {crumb.id === detail.id ? crumb.name : <Link to={`/${eventUrl}/${moduleName}?menu_id=${crumb.id}`} >{crumb.name}</Link>}
                    </li>
                  ))}
                </ul>
            </nav>
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
                          <img
                            src={
                              detail.image && detail.image !== ""
                                ? process.env.REACT_APP_EVENTCENTER_URL +
                                  `/assets/${informationModules[moduleName]}/` +
                                  detail.image
                                : ""
                            }
                            className="attachment-full size-full wp-post-image"
                            alt="a"
                            width="1500"
                            height="500"
                          />
                        </a>
                      </div>
                    )}
                    <div className="edgtf-post-text">
                      <div className="edgtf-post-text-inner">
                        {detail.description && (
                          <div>
                            <iframe
                              ref={iframe}
                              onLoad={() => {
                                const obj = iframe.current;
                                setHeight(
                                  obj.contentWindow.document.body.scrollHeight +
                                    200
                                );
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
                              href={`${process.env.REACT_APP_EVENTCENTER_URL}/assets/${informationModules[moduleName]}/${detail.pdf}`}
                              download
                              target="_blank"
                              style={{
                                border: "none !important",
                                float: "left",
                              }}
                            >
                              <img
                                alt=""
                                className="infoBoothImage"
                                src={`${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/pdf.png`}
                                width="40"
                                style={{ border: "none !important" }}
                              />
                            </a>
                            <a
                              href={`${process.env.REACT_APP_EVENTCENTER_URL}/assets/${informationModules[moduleName]}/${detail.pdf}`}
                              className="link_infobooth"
                              target="_blank"
                              download
                            >
                              <span>View Document</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {detail.image && detail.image_position !== 'top' && (
                      <div className="edgtf-post-image">
                        <a itemProp="url" href="">
                          <img
                            src={
                              detail.image && detail.image !== ""
                                ? process.env.REACT_APP_EVENTCENTER_URL +
                                  `/assets/${informationModules[moduleName]}/` +
                                  detail.image
                                : ""
                            }
                            className="attachment-full size-full wp-post-image"
                            alt="a"
                            width="1500"
                            height="500"
                          />
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
