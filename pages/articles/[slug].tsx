// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles } from '../../src/static/utils/getContent';

// Resources

// Components
import Article from '../../src/components/Article/Article';

// Interface
interface IProps {
    article: any
}

// Component
const ArticlePage = ({ article, ...rest }: IProps) => {
    return <>
        <Article {...article} />
    </>;
};

// Props
Article.defaultProps = {};

export const getStaticPaths = async () => {
    return {
        paths: getArticles().items.map((article: any) => ({ params: { slug: article.slug } })),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    return {
        props: {
            article: getArticles().items.find((article: any) => article.slug === context.params.slug) || null,
            showGenericSiteHeader: false
        }
    }
}

export default ArticlePage;
