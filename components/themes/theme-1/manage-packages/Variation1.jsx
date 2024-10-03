import React from 'react';
import PackageTable from './PackageTable';
import {fetchPackages, formPackageSelector} from 'store/Slices/FormPackageSlice';
import { eventSelector } from 'store/Slices/EventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  incrementFetchLoadCount, incrementLoadCount
} from "store/Slices/GlobalSlice";
import PageLoader from 'components/ui-components/PageLoader';
const PageContent = ({ isHome }) => {
  const router = useRouter();
  const { event } = useSelector(eventSelector);
  const { packages, loading, package_currency } = useSelector(formPackageSelector);
  const dispatch = useDispatch();
  React.useEffect(() => { 
    if(packages === null){
      dispatch(fetchPackages(event.url));
      dispatch(incrementLoadCount());
    }
  }, [])
  React.useEffect(() => {
    if (isHome == false && packages != null && packages == 0) {
      router.push(`${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee`); 
    }
  }, [packages])
  return (
    <React.Fragment>
      {packages ? (packages.length > 0 ? <main className="ebs-manage-packages ebs-master-default-wrapper" role="main">
        <div className="ebs-header-packages w-100">
           <div className="container">
             <div className="ebs-header-content mw-100">
              <h1>{(event.labels.EVENTSITE_MANAGE_PACKAGE_HEADING !== undefined && event.labels.EVENTSITE_MANAGE_PACKAGE_HEADING !== "") ? event.labels.EVENTSITE_MANAGE_PACKAGE_HEADING : ""}</h1>
               <div className='text-start' dangerouslySetInnerHTML={{ __html: event?.eventsiteSettings?.package_description }} />
             </div>
            </div> 
        </div>
        <div className="ebs-package-content-area">
          <div className="container">
            <div className="row justify-content-center">
              {packages && packages.length > 0 && packages.map((item)=>(
                <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                  <PackageTable item={item} eventTimeZone={event.timezone.timezone} eventUrl={event.url} labels={event.labels} package_currency={package_currency}/>
                </div>
              ))}
            </div>
          </div>
        </div> 
      </main> : null) : 
        <PageLoader />
      }
    </React.Fragment>
  )
}

export default PageContent