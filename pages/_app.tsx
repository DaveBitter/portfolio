// Libs
import React, { useEffect, useState } from 'react';
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
import SiteMeta from 'components/Site/SiteMeta/SiteMeta';

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
    }, [router.route]);

    const [prevRoute, setPrevRoute] = useState('')

    return <>
        <SiteMeta />

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
