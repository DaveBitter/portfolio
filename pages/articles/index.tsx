// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles, getHeadings, getCopy } from '../../src/static/utils/getContent';

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
    const copy = getCopy();

    return {
        props: {
            title: headings.latestArticles || null,
            copy: copy.articlesLead || null,
            src: '/img/articles.jpg',
            alt: ''
        }
    }
}

// Props
Articles.defaultProps = {};

export default Articles;
