// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import { getCopy } from '../../src/static/js/utils/getContent';
import { HTTPStatusCodeType } from '../../src/static/js/utils/Interfaces/Types';

// Components

// Resources

// Interface
// interface IProps {
// }

// Component
const ErrorPage = () => {
    return (
        <>
        </>
    );
};

export const getStaticPaths = async () => {
    return {
        paths: ['404', '500',].map((status: HTTPStatusCodeType) => ({ params: { status } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async () => {
    const copy = getCopy();
    const status = '500';

    return {
        props: {
            pageTitle: `${copy.ahhh} ${status}`,
            pageCopy: copy.daveScrewedUp,
            src: '/img/articles.jpg',
            alt: '',
            pageDescription: copy.daveScrewedUp,
            status
        }
    };
};

export default ErrorPage;
