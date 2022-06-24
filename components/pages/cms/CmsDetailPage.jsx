import React, { Suspense } from 'react'
import CmsDetail from 'components/modules/cms/CmsDetail';

const CmsDetailPage = (props) => {

  return (
    <Suspense>
      <React.Fragment>
        <CmsDetail moduleName={props.module} />
      </React.Fragment>
    </Suspense>
  )

}

export default CmsDetailPage