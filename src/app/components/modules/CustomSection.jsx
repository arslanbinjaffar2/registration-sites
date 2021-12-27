import React, { Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { service } from "../../services/service";

function loadModule(theme, variation) {
  const Component = React.lazy(() =>
    import(`@/themes/${theme}/custom-sections/${variation}`)
  );

  return Component;
}

const CustomSection = ({ pageId, event }) => {
  const CustomComponent = loadModule(event.theme.slug, "CustomSection");
  const [pageData, setPageData] = useState(null);
  useEffect(() => {
    loadPage(pageId);
  }, []);
  const loadPage = async (id) => {
    await service
      .get(`${process.env.REACT_APP_URL}/event/${event.url}/page/${id}`)
      .then((response) => {
        setPageData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomComponent pageData={pageData} />
    </Suspense>
  );
};
const mapStateToProps = (state) => {
  const { event } = state;
  return {
    event,
  };
};

export default connect(mapStateToProps)(CustomSection);
