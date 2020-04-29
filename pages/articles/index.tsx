// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles, getHeadings } from '../../src/static/utils/getContent';

// Resources

// Components
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
}

// Component
const Articles = ({ }: IProps) => {

    return <div className='grid'>
        <div className='g2'>
            <ArticleTeasers articles={getArticles().items} />
        </div>
    </div>;
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const headings = getHeadings();

    return { props: { title: headings.latestArticles || null } }
}

// Props
Articles.defaultProps = {};

export default Articles;
