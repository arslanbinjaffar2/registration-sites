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
              <h1>Get your tickets</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet.</p>
             </div>
            </div> 
        </div>
        <div className="ebs-package-content-area">
          <div className="container">
            <div className="row">
              {packages && packages.length > 0 && packages.map((item)=>(
                <div key={item.id} className="col-md-6 col-lg-4">
                  <PackageTable item={item} eventUrl={event.url}/>
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