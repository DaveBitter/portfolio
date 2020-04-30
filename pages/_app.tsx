// Libs
import React from 'react';
import Head from 'next/head';

// Utils

// Resources
import '../src/styles/all.scss';

// Components
import SiteHeader from '../src/components/Site/SiteHeader/SiteHeader';
import SiteNav from '../src/components/Site/SiteNav/SiteNav';

// Interface
interface IProps {
    Component: any,
    pageProps: any
}

// Component
const App = ({ Component, pageProps }: IProps) => {
    const { src, alt, showGenericSiteHeader = true, title } = pageProps;

    return <>
        <Head>
            <meta name='viewport' id='viewporttag' content='width=device-width, user-scalable=no, initial-scale=1' />
            <meta name='theme-color' content='#222222'></meta>
        </Head>
        <SiteHeader title={title} src={src} alt={alt} showGenericSiteHeader={showGenericSiteHeader}>
            <SiteNav />
        </SiteHeader>

        <main><Component {...pageProps} /></main>
    </>
};

// Props
App.defaultProps = {};

export default App;
