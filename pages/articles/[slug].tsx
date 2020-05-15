// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles, getHeadings } from '../../src/static/utils/getContent';
import { ArticleInterface } from 'static/utils/Interfaces/Interfaces';

// Resources

// Components
import Article from '../../src/components/Article/Article';
import ArticleTeasers from 'components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    article: ArticleInterface,
    relatedArticles: any
}

// Component
const ArticlePage = ({ article, relatedArticles, }: IProps) => {
    const headings = getHeadings();

    return <>
        <Article {...article} />

        {!!relatedArticles.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.readOn}</h2>
                <ArticleTeasers articles={relatedArticles} />
            </div>
        </div>}
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
            relatedArticles: getArticles().items.filter((article: any) => article.slug !== context.params.slug),
            showGenericSiteHeader: false
        }
    }
}

export default ArticlePage;
