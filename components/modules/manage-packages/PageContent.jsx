import React from 'react';
import PackageTable from './PackageTable';
import {fetchPackages, formPackageSelector} from 'store/Slices/FormPackageSlice';
import { eventSelector } from 'store/Slices/EventSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementFetchLoadCount, incrementLoadCount
} from "store/Slices/GlobalSlice";
const PageContent = () => {
  const { event } = useSelector(eventSelector);
  const { packages, loading } = useSelector(formPackageSelector);
  const dispatch = useDispatch();
  React.useEffect(() => { 
    if(packages === null){
      dispatch(fetchPackages(event.url));
      dispatch(incrementLoadCount());
    }
    
  }, [])
  
  return (
    <React.Fragment>
      {packages && packages.length > 0 && <main className="ebs-manage-packages" role="main">
        <div className="ebs-header-packages">
           <div className="container">
             <div className="ebs-header-content">
              <h1>{(event.labels.EVENTSITE_MANAGE_PACKAGE_HEADING !== undefined && event.labels.EVENTSITE_MANAGE_PACKAGE_HEADING !== "") ? event.labels.EVENTSITE_MANAGE_PACKAGE_HEADING : "Get your tickets"}</h1>
              <p>{(event.labels.EVENTSITE_MANAGE_PACKAGE_DESCRIPTION !== undefined && event.labels.EVENTSITE_MANAGE_PACKAGE_DESCRIPTION !== "") ? event.labels.EVENTSITE_MANAGE_PACKAGE_DESCRIPTION : "All different packages to register against"}</p>
             </div>
            </div> 
        </div>
        <div className="ebs-package-content-area">
          <div className="container">
            <div className="row">
              {packages && packages.length > 0 && packages.map((item)=>(
                <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                  <PackageTable item={item} eventUrl={event.url} labels={event.labels}/>
                </div>
              ))}
            </div>
          </div>
        </div> 
      </main>}
    </React.Fragment>
  )
}

export default PageContent