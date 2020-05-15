// Libs
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
// @ts-ignore
import { PageTransition } from 'next-page-transitions';

// Utils
import revealManager from 'static/utils/RevealManager';

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
let pageTransitionDelay = 0
const App = ({ Component, pageProps }: IProps) => {
    const { src, alt, showGenericSiteHeader = true, title, copy } = pageProps;
    const router = useRouter();

    useEffect(() => {
        document.body.dataset.hasJs = 'true';

        setTimeout(() => {
            revealManager.init();
        }, pageTransitionDelay);

        pageTransitionDelay = 800;
    }, [router.route]);


    return <>
        <Head>
            <meta name='viewport' id='viewporttag' content='width=device-width, user-scalable=no, initial-scale=1' />
            <meta name='theme-color' content='#222222'></meta>
        </Head>

        <PageTransition timeout={pageTransitionDelay} classNames='page-transition' skipInitialTransition={true}>
            <div />
        </PageTransition>

        <SiteHeader title={title} copy={copy} src={src} alt={alt} showGenericSiteHeader={showGenericSiteHeader} key={router.route}>
            <SiteNav />
        </SiteHeader>

        <main>
            <Component {...pageProps} />
        </main>

    </>
};

// Props
App.defaultProps = {};

export default App;
