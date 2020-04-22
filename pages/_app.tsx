// Libs
import React from 'react';

// Utils

// Resources
import '../src/styles/all.scss';

// Components

// Interface
interface IProps {
    Component: any,
    pageProps: any
}

// Component
const App = ({ Component, pageProps }: IProps) => {
    return <Component {...pageProps} />
};

// Props
App.defaultProps = {};

export default App;
