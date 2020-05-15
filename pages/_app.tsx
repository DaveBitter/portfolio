// Libs
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
// @ts-ignore
import { PageTransition } from 'next-page-transitions';

// Utils
import revealManager from '../src/static/utils/RevealManager';
import { initGA, logPageView } from '../src/static/utils/googleAnalytics';

// Resources
import '../src/styles/all.scss';

// Components
import SiteHeader from '../src/components/Site/SiteHeader/SiteHeader';
import SiteNav from '../src/components/Site/SiteNav/SiteNav';
import SiteMeta from '../src/components/Site/SiteMeta/SiteMeta';
import SiteOpenGraphTags from '../src/components/Site/SiteOpenGraphTags/SiteOpenGraphTags';

// Interface
interface IProps {
    Component: any,
    pageProps: any
}

// Component
let pageTransitionDelay = 0
const App = ({ Component, pageProps }: IProps) => {
    const { article, src, alt, showGenericSiteHeader = true, title, copy } = pageProps;

    const router = useRouter();

    const [pageTransitionDirection, setPageTransitionDirection] = useState('up')
    useEffect(() => {
        document.body.dataset.hasJs = 'true';

        setTimeout(() => {
            revealManager.init();
        }, pageTransitionDelay);

        pageTransitionDelay = 800;

        const prevLevel = prevRoute.split("/").length - 2;
        const nextLevel = router.route.split("/").length - 2;

        switch (true) {
            case prevLevel === nextLevel:
                setPageTransitionDirection('right')
                break;

            case prevLevel < nextLevel:
                setPageTransitionDirection('up')
                break;

            case prevLevel > nextLevel:
                setPageTransitionDirection('down')
                break;

            default:
                setPageTransitionDirection('up')
                break;
        }

        setPrevRoute(router.route)

        if (process.env.NODE_ENV === 'development') { return; }

        // @ts-ignore
        if (!window.GA_INITIALIZED) {
            initGA();
            // @ts-ignore
            window.GA_INITIALIZED = true;
        }
        logPageView();
    }, [router.route]);

    const [prevRoute, setPrevRoute] = useState('')

    return <>
        <SiteMeta />
        <SiteOpenGraphTags article={article} pageTitle={title} pageDescription={copy} pageImage={src} />

        <PageTransition timeout={pageTransitionDelay} classNames={`page-transition--${pageTransitionDirection} page-transition`} skipInitialTransition={true}>
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
