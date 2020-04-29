// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import { getHeadings } from 'static/utils/getContent';

// Resources

// Components

// Interface
interface IProps { }

// Component
const Home = ({ }: IProps) => {
    return <div className='grid'>
        <div className='g2'>
        </div>
    </div>;
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const headings = getHeadings();

    return { props: { title: headings.greeting || null } }
}
// Props
Home.defaultProps = {};

export default Home;
