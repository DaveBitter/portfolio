// Libs
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';


// Utils
import query from '../../src/static/js/utils/api/query';
import { ArticleInterface, ContentObjectInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Resources

// Components
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    dictionary: ContentObjectInterface,
    articleTeaserItems: ArticleInterface[],
    quickBitTeaserItems: ArticleInterface[],
    hasMoreArticles: boolean,
    hasMoreQuickBits: boolean
}

// Component
const Tags = ({ dictionary, articleTeaserItems, quickBitTeaserItems, hasMoreArticles, hasMoreQuickBits }: IProps) => {
    return <>
        {articleTeaserItems && !!articleTeaserItems.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{dictionary.articles}</h2>
            </div>

            <div className='g2'>
                <ArticleTeasers type='articles' articles={articleTeaserItems} />
            </div>

            {hasMoreArticles && <div className='g8'>
                <Link href='/articles'>
                    <a className='button-link' data-reveal-in-view>{dictionary.viewAllArticles}</a>
                </Link>
            </div>}
        </div>}

        {quickBitTeaserItems && !!quickBitTeaserItems.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{dictionary.quickBits}</h2>
            </div>

            <div className='g2'>
                <ArticleTeasers type='quick-bits' articles={quickBitTeaserItems} />
            </div>

            {hasMoreQuickBits && <div className='g8'>
                <Link href='/quick-bits'>
                    <a className='button-link' data-reveal-in-view>{dictionary.viewAllQuickBits}</a>
                </Link>
            </div>}
        </div>}
    </>;
};

export const getStaticPaths = async () => {
    const { tags } = await query('/content/tags');

    return {
        paths: Object.keys(tags).map((tag: string) => ({ params: { tag } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const activeTag = context.params && context.params.tag;

    const { copy, dictionary } = await query('/content/ui');
    const { tags } = await query('/content/tags');

    const { articles } = await query('/content/articles');
    const { quickBits } = await query('/content/quick-bits');

    const hasMoreArticles = articles.length > 3;
    const hasMoreQuickBits = quickBits.length > 3;

    const articleTeaserItems = articles.slice(0, 3);
    const quickBitTeaserItems = quickBits.slice(0, 3);
    const tagLabel = context.params && context.params.tag && activeTag ? tags[Array.isArray(activeTag) ? activeTag[0] : activeTag] : null;

    return {
        props: {
            pageTitle: tagLabel || activeTag,
            pageCopy: copy.tagLead.replace('{{tag}}', tagLabel || activeTag),
            src: `/img/tags/${activeTag}.jpg`,
            alt: '',
            pageDescription: copy.pageDescription || null,
            dictionary,
            copy,
            tags,
            articleTeaserItems,
            quickBitTeaserItems,
            hasMoreArticles,
            hasMoreQuickBits
        }
    };
};

// Props
Tags.defaultProps = {};

export default Tags;
