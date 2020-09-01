// Libs
import React from 'react';
import { GetStaticProps } from 'next';
import { getCopy } from 'static/js/utils/getContent';

// Utils

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
        paths: ['404', '500',].map((status: string) => ({ params: { status } })),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
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
