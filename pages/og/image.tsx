// Libs
import React from 'react';
import { GetServerSideProps } from 'next';
import OGCard from '../../src/components/OGCard/OGCard';

// Utils

// Resources

// Components

// Interface
interface IProps {
    title: string,
    date?: string,
    image?: string,
}

// Component
const OGImage = ({ title, date, image }: IProps) => {
    return <>
        <OGCard title={title} date={date} image={image} />
    </>;
};

// Props
OGImage.defaultProps = {};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { title, date, image } = query;

    return {
        props: {
            isStandAlone: true,
            ...(title && { title }),
            ...(date && { date }),
            ...(image && { image })
        }
    };
};

export default OGImage;
