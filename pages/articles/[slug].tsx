// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import query from '../../src/static/js/utils/api/query';
import { ArticleInterface, ContentObjectInterface } from '../../src/static/js/utils/Interfaces/Interfaces';
import { ArticleTypeType } from '../../src/static/js/utils/Interfaces/Types';
import getOGImage from '../../src/static/js/utils/getOGImage';

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
        <Article {...article} type={type} />

        {!!relatedArticles.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{type === 'friday-tips' ? headings.watchMore : headings.readOn}</h2>
                <ArticleTeasers type={type} articles={relatedArticles} />
            </div>
        </div>}
    </>;
};

// Props
Article.defaultProps = {};

export const getStaticPaths = async () => {
    const { articles } = await query('/content/articles');

    return {
        paths: articles.map((article: ArticleInterface) => ({ params: { slug: article.slug } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { headings } = await query('/content/ui');
    const { articles } = await query('/content/articles');

    const articleData = articles.find((article: ArticleInterface) => context && context.params ? article.slug === context.params.slug : false);

    const ogImage = await getOGImage(`/articles_${articleData.slug}`, { title: articleData.title, image: articleData.teaserImage, date: articleData.date });

    return {
        props: {
            pageImage: ogImage || null,
            article: articleData || null,
            relatedArticles: articles.filter((article: ArticleInterface) => article.slug !== context && context.params ? context.params.slug : false).splice(0, 3),
            showGenericSiteHeader: false,
            type: 'articles',
            headings
        }
    };
};

export default ArticlePage;
