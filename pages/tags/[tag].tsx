// Libs
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';


// Utils
import { getArticles, getQuickBits } from '../../src/static/js/utils/getContent';
import query from '../../src/static/js/utils/api/query';
import { ArticleInterface, ContentObjectInterface, TagInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Resources

// Components
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    dictionary: ContentObjectInterface,
    articleItems: ArticleInterface[],
    quickBitItems: ArticleInterface[],
}

// Component
const Tags = ({ dictionary, articleItems, quickBitItems }: IProps) => {
    return <>
        {articleItems && !!articleItems.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{dictionary.articles}</h2>
            </div>

            <div className='g2'>
                <ArticleTeasers type='articles' articles={articleItems} />
            </div>

            {getArticles().length > 3 && <div className='g8'>
                <Link href='/articles'>
                    <a className='button-link' data-reveal-in-view>{dictionary.viewAllArticles}</a>
                </Link>
            </div>}
        </div>}

        {quickBitItems && !!quickBitItems.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{dictionary.quickBits}</h2>
            </div>

            <div className='g2'>
                <ArticleTeasers type='quick-bits' articles={quickBitItems} />
            </div>

            {getQuickBits().length > 3 && <div className='g8'>
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

    const articleItems = getArticles()
        .filter((article: ArticleInterface) => article.tags.find((tag: TagInterface) => tag.key === activeTag));
    const quickBitItems = getQuickBits()
        .filter((quickBit: ArticleInterface) => quickBit.tags.find((tag: TagInterface) => tag.key === activeTag));


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
            articleItems,
            quickBitItems,
        }
    };
};

// Props
Tags.defaultProps = {};

export default Tags;
