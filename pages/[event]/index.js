import type from 'next'
import Head from 'next/head'
import React from "react";
import { useRouter } from 'next/router';

const Index = () => {

    const router = useRouter();

    return (
        <>
            <Head>
                <title>WPFiles</title>
                <meta name="description" content="Description" />
            </Head>
        </>
    )
}

export default Index