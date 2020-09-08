// Libs
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { AppProps } from 'next/app';
// @ts-ignore
import { PageTransition } from 'next-page-transitions';

// Utils
import revealManager from '../src/static/js/utils/RevealManager';
import { initGA, logPageView } from '../src/static/js/utils/googleAnalytics';
import useServiceWorker from 'static/js/utils/hooks/useServiceWorker';

// Resources
import 'highlight.js/styles/atom-one-dark.css';
import '../src/styles/all.scss';

// Components
import SiteHeader from '../src/components/Site/SiteHeader/SiteHeader';
import SiteMeta from '../src/components/Site/SiteMeta/SiteMeta';
import SiteNav from '../src/components/Site/SiteNav/SiteNav';
import SiteOpenGraphTags from '../src/components/Site/SiteOpenGraphTags/SiteOpenGraphTags';
import SiteFooter from 'components/Site/SiteFooter/SiteFooter';

// Component
let pageTransitionDelay = 0
const App = ({ Component, pageProps }: AppProps) => {
    const { article, src, alt, showGenericSiteHeader = true, title, copy, pageDescription, pageImage } = pageProps;

    const router = useRouter();

    useServiceWorker();

    const [pageTransitionDirection, setPageTransitionDirection] = useState('up')
    useEffect(() => {
        document.body.dataset.hasJs = 'true';

        setTimeout(() => {
            revealManager.init();
        }, pageTransitionDelay);

        pageTransitionDelay = 800;

        const prevLevel = prevRoute.split("/").length - 2;
        const nextLevel = router.route.split("/").length - 2;

        if (router.route !== prevRoute) {
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
        }

        if (process.env.NODE_ENV === 'development') { return; }

        // @ts-ignore
        if (!window.GA_INITIALIZED) {
            initGA();
            // @ts-ignore
            window.GA_INITIALIZED = true;
        }
        logPageView();
    }, [router.route]);

    const [prevRoute, setPrevRoute] = useState(router.route)

    return <>
        <SiteMeta article={article} pageTitle={title} pageDescription={pageDescription || copy} />
        <SiteOpenGraphTags article={article} pageTitle={title} pageDescription={pageDescription || copy} pageImage={pageImage || src} />

        <PageTransition timeout={pageTransitionDelay} classNames={`page-transition--${pageTransitionDirection} page-transition`} skipInitialTransition={true}>
            <div />
        </PageTransition>

        <SiteHeader title={title} copy={copy} src={src} alt={alt} showGenericSiteHeader={showGenericSiteHeader} key={router.route}>
            <SiteNav />
        </SiteHeader>

        <main>
            <Component {...pageProps} />
        </main>

        <SiteFooter />
    </>
};

// Props
App.defaultProps = {};

export default App;
