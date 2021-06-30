// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import query from '../../src/static/js/utils/api/query';
import { HTTPStatusCodeType } from '../../src/static/js/utils/Interfaces/Types';
import generateOGImage from '../../src/static/js/utils/generateOGImage';

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
    const { copy } = await query('/content/ui'); const status = '500';

    const ogImage = await generateOGImage('/error', {});

    return {
        props: {
            pageTitle: `${copy.ahhh} ${status}`,
            pageCopy: copy.daveScrewedUp || null,
            pageImage: ogImage || null,
            src: '/img/articles.jpg',
            alt: '',
            pageDescription: copy.daveScrewedUp || null,
            status
        }
    };
};

export default ErrorPage;
