// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import { getCopy } from 'static/js/utils/getContent';
import { HTTPStatusCodeType } from 'static/js/utils/Interfaces/Types';

// Components

// Resources

// Interface
interface IProps {
}

// Component
const ErrorPage = ({ }: IProps) => {
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
}

export const getStaticProps: GetStaticProps = async () => {
    const copy = getCopy()
    const status = '500';

    return {
        props: {
            title: `${copy.ahhh} ${status}`,
            copy: copy.daveScrewedUp,
            src: '/img/articles.jpg',
            alt: '',
            pageDescription: copy.daveScrewedUp,
            status
        }
    }
}

export default ErrorPage;
