// Libs
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';


// Utils
import { getCopy, getArticles, getQuickBits, getDictionary, getTags } from '../../src/static/js/utils/getContent';

// Resources

// Components
import ArticleTeasers from 'components/Article/ArticleTeasers/ArticleTeasers';
import { ArticleInterface, TagInterface } from 'static/js/utils/Interfaces/Interfaces';

// Interface
interface IProps {
    activeTag: string
}

// Component
const Tags = ({ activeTag }: IProps) => {
    const dictionary = getDictionary();

    const articleItems = getArticles()
        // @ts-ignore
        .filter((article: ArticleInterface) => (article.tags || []).find((tag: TagInterface) => tag.key === activeTag))
    const quickBitsItems = getQuickBits()
        // @ts-ignore
        .filter((quickBit: ArticleInterface) => (quickBit.tags || []).find((tag: TagInterface) => tag.key === activeTag))

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

export const getStaticProps: GetStaticProps = async (context: any) => {
    const copy = getCopy();
    const tags = getTags();

    const tagLabel = tags[context.params.tag];

    return {
        props: {
            title: context.params.tag ? tagLabel || context.params.tag : null,
            copy: '',
            src: '/img/articles.jpg',
            alt: '',
            pageDescription: copy.pageDescription || null,
            activeTag: context.params.tag
        }
    }
}
// Props
Tags.defaultProps = {};

export default Tags;
