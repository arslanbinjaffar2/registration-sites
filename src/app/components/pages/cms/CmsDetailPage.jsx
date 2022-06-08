import React, {Suspense} from 'react'
import CmsDetail from '@/modules/cms/CmsDetail'

const CmsDetailPage = ({ match, event }) => {
  const currentModuleName = match.url.split("/")[2];
  
  return (
    <Suspense>
      <React.Fragment>
        <CmsDetail moduleName={currentModuleName} />
      </React.Fragment>
    </Suspense>
  )
}

export default CmsDetailPage