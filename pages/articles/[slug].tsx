// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import { getArticles, getHeadings } from '../../src/static/js/utils/getContent';
import { ArticleInterface, TagInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Resources

// Components
import Article from '../../src/components/Article/Article';
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';
import Tag from 'components/Tag/Tag';

// Interface
interface IProps {
    article: ArticleInterface,
    relatedArticles: any,
    type: string
}

// Component
const ArticlePage = ({ article, relatedArticles, type }: IProps) => {
    const headings = getHeadings();

    // NOTE: TS made me do it :/
    const tags = [...(article.tags || [])];

    return <>
        <Article {...article} />

        {!!relatedArticles.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.readOn}</h2>
                {tags && !!tags.length && <Tag.Wrapper alignment='left'>
                    {tags.map((tag: TagInterface) => <Tag.Item key={tag.key} tag={tag} />)}
                </Tag.Wrapper>}
                <ArticleTeasers type={type} articles={relatedArticles} />
            </div>
        </div>}
    </>;
};

// Props
Article.defaultProps = {};

export const getStaticPaths = async () => {
    return {
        paths: getArticles().map((article: any) => ({ params: { slug: article.slug } })),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    return {
        props: {
            article: getArticles().find((article: any) => article.slug === context.params.slug) || null,
            relatedArticles: getArticles().filter((article: any) => article.slug !== context.params.slug).splice(0, 3),
            showGenericSiteHeader: false,
            type: 'articles'
        }
    }
}

export default ArticlePage;
