import React, { Suspense } from 'react';
import PageLoader from "components/ui-components/PageLoader";
import Head from 'next/head';
import PageContent from './PageContent';

const ManagePackages = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <React.Fragment>
        <Head>
          <title>Manage Packages</title>
      </Head>
        <PageContent />
      </React.Fragment>
  </Suspense>
  )
}

export default ManagePackages