import React, { Suspense } from "react";
import CmsListing from "components/modules/cms/CmsListing";
import { useRouter } from 'next/router';

const CmsPage = (props) => {

  const router = useRouter();

  const { menu_id } = router.query;
  
  return (
    <CmsListing moduleName={props.module} menu_id={menu_id} />
  );

};

export default CmsPage;
