// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles, getDictionary } from '../../src/static/utils/getContent';

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

export const getStaticPaths = async () => {
    return {
        paths: getArticles().items.map((article: any) => ({ params: { slug: article.slug } })),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    const dictionary = getDictionary();

    return { props: { title: dictionary.latestArticles || null } }
}

// Props
Articles.defaultProps = {};

export default Articles;
