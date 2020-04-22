// Libs
import React from 'react';

// Utils

// Resources
import '../src/styles/all.scss';

// Components
import SiteNav from 'components/Site/SiteNav/SiteNav';

// Interface
interface IProps {
    Component: any,
    pageProps: any
}

// Component
const App = ({ Component, pageProps }: IProps) => {
    return <>
        <SiteNav />

        <Component {...pageProps} />
    </>
};

// Props
App.defaultProps = {};

export default App;
