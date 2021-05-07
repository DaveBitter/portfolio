// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles } from '../../src/static/js/utils/getContent';
import query from '../../src/static/js/utils/api/query';
import { ArticleInterface } from '../../src/static/js/utils/Interfaces/Interfaces';
import { ArticleTypeType } from '../../src/static/js/utils/Interfaces/Types';

// Resources

// Components
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    items: ArticleInterface[],
    type: ArticleTypeType
}

// Component
const Tags = ({ items, type }: IProps) => {
    return <div className='grid'>
        <div className='g2'>
            <ArticleTeasers type={type} articles={items} />
        </div>
    </div>;
};

export const getStaticProps: GetStaticProps = async () => {
    const { copy, headings } = await query('/content');

    const articles = getArticles();

    return {
        props: {
            items: articles,
            pageTitle: headings.latestArticlesAndTags || null,
            pageCopy: copy.articlesAndTagsLead || null,
            src: '/img/articles.jpg',
            alt: '',
            type: 'articles'
        }
    };
};

// Props
Tags.defaultProps = {};

export default Tags;
