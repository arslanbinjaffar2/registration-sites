import React, {useState} from "react";
import HeadingElement from "@/ui-components/HeadingElement";
import { Link } from "react-router-dom";
const CmsListing = ({ listing, moduleName, breadCrumbData, eventSiteModuleName, eventUrl, menu_id }) => {
  const [breadCrumbs, setBreadCrumbs] = useState(arrayTraverse(breadCrumbData, menu_id, eventSiteModuleName));
  const [cmsListing, setCmsListing] = useState(getListing(listing, menu_id));
  return (
    <div style={{padding: "80px 0",}}
      className="edgtf-parallax-section-holder">
      <div className="container">
        <HeadingElement dark={false} label={eventSiteModuleName}  align={'center'} />
        <nav aria-label="breadcrumb" className="ebs-breadcrumbs">
            <ul className="breadcrumb">
              {breadCrumbs.map((crumb, i) => (
                <li className="breadcrumb-item" key={i}>
                  {crumb.id === menu_id ? crumb.name : <Link to={`/${eventUrl}/${moduleName}?menu_id=${crumb.id}`} >{crumb.name}</Link>}
                </li>
              ))}
            </ul>
        </nav>
        <div className="ebs-inner-page-wrapper">
          <ul>
            {cmsListing && cmsListing.map((item, i)=>(
                <li key={i}>
                  {item.page_type === 1 && 
                        <Link to={`/${eventUrl}/${moduleName}/${item.id}`}>
                          {item.info.name}
                        </Link>
                  }
                {item.page_type === 2 && 
                  <a href={`${item.website_protocol}${item.url}`} target="_blank"  >{item.info.name}</a>
                }
                {item.page_type === "menu" && 
                  <Link to={`/${eventUrl}/${moduleName}?menu_id=${item.id}`}>
                  {item.info.name}
                </Link>
                }
                {item.submenu && 
                        <ul>
                            {item.submenu.map((subitem, j)=>(
                            <li key={j}>
                              {subitem.page_type === 1 && 
                                <Link to={`/${eventUrl}/${moduleName}/${subitem.id}`}>
                                  {subitem.info.name}
                                </Link>
                              }
                              {subitem.page_type === 2 && 
                                <a href={`${subitem.website_protocol}${subitem.url}`} target="_blank"  >{subitem.info.name}</a>
                              }
                              </li>
                            ))}
                        </ul>
                }
                </li>
            ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};


export default CmsListing;


const arrayTraverse = (array, menu_id, eventSiteModuleName) => {
  console.log(array, menu_id, eventSiteModuleName);
  let returnArray = [{id:"module", name: eventSiteModuleName, type: "menu"}];
  let toFolder = null;
  if(menu_id && menu_id !== 'module'){
      toFolder = array.find((item)=>(item.id === parseFloat(menu_id)));
  }
if(toFolder){
  returnArray.push({id:toFolder.id, name:toFolder.info.name, type: toFolder.page_type ? toFolder.page_type : 'menu'});
}
return returnArray;
}

const getListing = (array, menu_id) => {
  let arr = array;
  console.log(array);
  if(menu_id && menu_id !== 'module'){
   arr = array.find((item)=>(item.id === parseFloat(menu_id))).submenu;
   console.log(arr);
  }
  return arr;
}



