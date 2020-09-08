// Libs
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';


// Utils
import { getCopy, getArticles, getQuickBits, getDictionary, getTags } from '../../src/static/js/utils/getContent';
import { ArticleInterface, TagInterface } from 'static/js/utils/Interfaces/Interfaces';

// Resources

// Components
import ArticleTeasers from 'components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    activeTag: string
}

// Component
const Tags = ({ activeTag }: IProps) => {
    const dictionary = getDictionary();

    const articleItems = getArticles()
        .filter((article: ArticleInterface) => article.tags.find((tag: TagInterface) => tag.key === activeTag))
    const quickBitsItems = getQuickBits()
        .filter((quickBit: ArticleInterface) => quickBit.tags.find((tag: TagInterface) => tag.key === activeTag))

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

        {quickBitsItems && !!quickBitsItems.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{dictionary.quickBits}</h2>
            </div>

            <div className='g2'>
                <ArticleTeasers type='quick-bits' articles={quickBitsItems} />
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
    return {
        paths: Object.keys(getTags()).map((tag: string) => ({ params: { tag } })),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const copy = getCopy();
    const tags = getTags();

    const tag = context.params && context.params.tag;

    const tagLabel = context.params && context.params.tag && tag ? tags[Array.isArray(tag) ? tag[0] : tag] : null;

    return {
        props: {
            title: tagLabel || tag,
            copy: '',
            src: '/img/articles.jpg',
            alt: '',
            pageDescription: copy.pageDescription || null,
            activeTag: tag
        }
    }
}
// Props
Tags.defaultProps = {};

export default Tags;
