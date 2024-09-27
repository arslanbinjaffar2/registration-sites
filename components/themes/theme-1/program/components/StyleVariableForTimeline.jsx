import React from 'react'

const StyleVariableForTimeline = ({bgStyle}) => {
  return (
    <>
          <style
        dangerouslySetInnerHTML={{
          __html: `
      .timeline-container .ebs-list-workshop:first-of-type::before {background:${bgStyle.backgroundColor}}
        .timeline-container .ebs-list-workshop:last-of-type::after {background:${bgStyle.backgroundColor}}
        `,
        }}
      />
    </>
  )
}

export default StyleVariableForTimeline