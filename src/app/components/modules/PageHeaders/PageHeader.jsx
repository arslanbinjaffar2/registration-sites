import React from 'react'
import SimpleHeader from '@/themes/theme-1/PageHeader/SimpleHeader'
import WithBackground from '@/themes/theme-1/PageHeader/WithBackground'
import WithSolidColor from '@/themes/theme-1/PageHeader/WithSolidColor'
const PageHeader = ({type, children}) => {
  if(type === 'background'){
    return <WithBackground>
        {children}
    </WithBackground>
  }
  
  if(type === 'color'){
    return <WithSolidColor>
        {children}
    </WithSolidColor>
  }

  return <SimpleHeader>
        {children}
    </SimpleHeader>
}

export default PageHeader