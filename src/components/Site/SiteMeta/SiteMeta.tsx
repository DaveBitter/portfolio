// Libs
import React from 'react';
import Head from 'next/head';

// Utils

// Resources

// Components

// Interface
interface IProps { }

// Component
const SiteMeta = ({ }: IProps) => {
    return <Head>
        <meta name='viewport' id='viewporttag' content='width=device-width, user-scalable=no, initial-scale=1' />
        <meta name='theme-color' content='#222222'></meta>
    </Head>
};

// Props
SiteMeta.defaultProps = {};

export default SiteMeta;
