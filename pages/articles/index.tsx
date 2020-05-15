// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles, getHeadings, getCopy } from '../../src/static/js/utils/getContent';

// Resources

// Components
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    items: any
}

// Component
const Articles = ({ items }: IProps) => {

    return <div className='grid'>
        <div className='g2'>
            <ArticleTeasers articles={items} />
        </div>
    </div>;
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const headings = getHeadings();
    const copy = getCopy();
    const articles = getArticles();

    return {
        props: {
            items: articles.items,
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
