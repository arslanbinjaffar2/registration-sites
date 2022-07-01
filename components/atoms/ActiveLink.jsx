import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = (props) => {
    const { asPath } = useRouter()
    console.log(asPath);
    const childClassName = props.className || ''
    const activeClassName = props.activeClassName || ''

    // pages/index.js will be matched via props.href
    // pages/about.js will be matched via props.href
    // pages/[slug].js will be matched via props.as
    const className =
        asPath === props.href || asPath === props.as
            ? `${childClassName} ${activeClassName}`.trim()
            : childClassName

    return (
        <Link scroll={false} {...props}>
            <a className={className}>{props.children}</a>
        </Link>
    )
}

export default ActiveLink