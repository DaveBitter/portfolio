// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles, getHeadings } from '../../src/static/js/utils/getContent';
import { ArticleInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Resources

// Components
import Article from '../../src/components/Article/Article';
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    article: ArticleInterface,
    relatedArticles: any,
    type: string
}

// Component
const ArticlePage = ({ article, relatedArticles, type }: IProps) => {
    const headings = getHeadings();

    return <>
        <Article {...article} />

        {!!relatedArticles.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.readOn}</h2>
                <ArticleTeasers type={type} articles={relatedArticles} />
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
            relatedArticles: getArticles().items.filter((article: any) => article.slug !== context.params.slug).splice(0, 3),
            showGenericSiteHeader: false,
            type: 'articles'
        }
    }
}

export default ArticlePage;
