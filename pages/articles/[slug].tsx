// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles } from '../../src/static/js/utils/getContent';
import query from '../../src/static/js/utils/api/query';
import { ArticleInterface, ContentObjectInterface } from '../../src/static/js/utils/Interfaces/Interfaces';
import { ArticleTypeType } from '../../src/static/js/utils/Interfaces/Types';

// Resources

// Components
import Article from '../../src/components/Article/Article';
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    headings: ContentObjectInterface,
    article: ArticleInterface,
    relatedArticles: ArticleInterface[],
    type: ArticleTypeType
}

// Component
const ArticlePage = ({ headings, article, relatedArticles, type }: IProps) => {
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
        paths: getArticles().map((article: ArticleInterface) => ({ params: { slug: article.slug } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { headings } = await query('/content');
    return {
        props: {
            article: getArticles().find((article: ArticleInterface) => context && context.params ? article.slug === context.params.slug : false) || null,
            relatedArticles: getArticles().filter((article: ArticleInterface) => article.slug !== context && context.params ? context.params.slug : false).splice(0, 3),
            showGenericSiteHeader: false,
            type: 'articles',
            headings
        }
    };
};

export default ArticlePage;
