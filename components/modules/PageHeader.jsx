import React from 'react'
import { eventSelector } from "store/Slices/EventSlice";

import SimpleHeader from 'components/themes/theme-1/PageHeader/SimpleHeader'
import WithBackground from 'components/themes/theme-1/PageHeader/WithBackground'
import WithSolidColor from 'components/themes/theme-1/PageHeader/WithSolidColor'
import HeadingElement from 'components/ui-components/HeadingElement';
import { useSelector, useDispatch } from "react-redux";
const in_array = require("in_array");
const PageHeader = ({children, label, align, breadCrumbs}) => {
  const { event } = useSelector(eventSelector);
  let moduleVariation = event.moduleVariations.filter(function (module, i) {
    return in_array(module.alias, ["page_header"]);
  });
  if(moduleVariation === 'background'){
    return <WithBackground moduleVariation={moduleVariation} >
      <HeadingElement dark={true} label={label}  align={align} />
      {breadCrumbs && breadCrumbs(moduleVariation)}
    </WithBackground>
  }
  
  if(moduleVariation === 'color'){
    return <WithSolidColor>
      <HeadingElement dark={false} label={label}  align={align} />
      {breadCrumbs && breadCrumbs(moduleVariation)}

    </WithSolidColor>
  }

  return <SimpleHeader>
    <HeadingElement dark={false} label={label}  align={align} />
     {breadCrumbs && breadCrumbs(moduleVariation)}
    </SimpleHeader>
}

export default PageHeader