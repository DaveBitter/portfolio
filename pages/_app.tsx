// Libs
import React from 'react';

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
    const { title } = pageProps;

    return <>
        <SiteHeader title={title}>
            <SiteNav />
        </SiteHeader>

        <main><Component {...pageProps} /></main>
    </>
};

// Props
App.defaultProps = {};

export default App;
