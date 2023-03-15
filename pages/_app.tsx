// Libs
import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { AppProps } from "next/app";
// @ts-ignore
import { PageTransition } from "next-page-transitions";
import NProgress from "nprogress";

// Utils
import revealManager from "../src/static/js/utils/RevealManager";
import { initGA, logPageView } from "../src/static/js/utils/googleAnalytics";
import useServiceWorker from "../src/static/js/utils/hooks/useServiceWorker";

// Resources
import "highlight.js/styles/atom-one-dark.css";
import "../src/styles/all.scss";

// Components
import SiteHeader from "../src/components/Site/SiteHeader/SiteHeader";
import SiteMeta from "../src/components/Site/SiteMeta/SiteMeta";
import SiteNav from "../src/components/Site/SiteNav/SiteNav";
import SiteOpenGraphTags from "../src/components/Site/SiteOpenGraphTags/SiteOpenGraphTags";
import SiteFooter from "../src/components/Site/SiteFooter/SiteFooter";
import SiteBreadCrumbs from "../src/components/Site/SiteBreadCrumbs/SiteBreadCrumbs";

// Component
if (process.env.NODE_ENV !== "development" && !process.env.CI) {
  console.info("%cHey fellow dev!", "color: #ff5420; font-size: 2rem");
  console.info(
    "%cMake sure to take have a look at https://github.com/davebitter",
    "color: #8d9297; font-size: 1rem"
  );
}

NProgress.configure({
  minimum: 0.3,
  trickleSpeed: 0.06,
  easing: "ease",
  speed: 600,
});

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

let pageTransitionDelay = 0;
const App = ({ Component, pageProps }: AppProps) => {
  const {
    article,
    src,
    alt,
    useFancyImageBlock,
    showGenericSiteHeader = true,
    pageTitle,
    pageCopy,
    pageDescription,
    pageImage,
    isStandAlone,
  } = pageProps;

  const router = useRouter();

  useServiceWorker();

  const [pageTransitionDirection, setPageTransitionDirection] = useState("up");
  useEffect(() => {
    document.body.dataset.hasJs = "true";

    setTimeout(() => {
      revealManager.init();
    }, pageTransitionDelay);

    pageTransitionDelay = 800;

    const prevLevel = prevRoute.split("/").length - 2;
    const nextLevel = router.route.split("/").length - 2;

    if (router.route !== prevRoute) {
      switch (true) {
        case prevLevel === nextLevel:
          setPageTransitionDirection("right");
          break;

        case prevLevel < nextLevel:
          setPageTransitionDirection("up");
          break;

        case prevLevel > nextLevel:
          setPageTransitionDirection("down");
          break;

        default:
          setPageTransitionDirection("up");
          break;
      }

      setPrevRoute(router.route);
    }

    if (process.env.NODE_ENV === "development") {
      return;
    }

    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, [router.route]);

  const [prevRoute, setPrevRoute] = useState(router.route);

  if (isStandAlone) {
    return (
      <main>
        <Component {...pageProps} />
      </main>
    );
  }

  return (
    <>
      <SiteMeta
        article={article}
        pageTitle={pageTitle}
        pageDescription={pageDescription || pageCopy}
      />
      <SiteOpenGraphTags
        article={article}
        pageTitle={pageTitle}
        pageDescription={pageDescription || pageCopy}
        pageImage={pageImage || src}
      />

      <PageTransition
        timeout={pageTransitionDelay}
        classNames={`page-transition--${pageTransitionDirection} page-transition`}
        skipInitialTransition={true}
      >
        <div />
      </PageTransition>

      <SiteHeader
        title={pageTitle}
        copy={pageCopy}
        src={src}
        alt={alt}
        useFancyImageBlock={useFancyImageBlock}
        showGenericSiteHeader={showGenericSiteHeader}
        key={router.route}
      >
        <SiteNav />
        <SiteBreadCrumbs />
      </SiteHeader>

      <main>
        <Component {...pageProps} />
      </main>

      <SiteFooter />
    </>
  );
};

// Props
App.defaultProps = {};

export default App;
