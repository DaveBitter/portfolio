// Libs
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';


// Utils
import { getHeadings, getCopy, getArticles, getQuickBits, getDictionary } from '../src/static/js/utils/getContent';

// Resources

// Components
import ArticleTeasers from '../src/components/Article/ArticleTeasers/ArticleTeasers';
import ResumePitch from '../src/components/Resume/ResumePitch/ResumePitch';
import { ArticleInterface, ContentObjectInterface } from '../src/static/js/utils/Interfaces/Interfaces';

// Interface
interface IProps {
    dictionary: ContentObjectInterface,
    copy: ContentObjectInterface,
    headings: ContentObjectInterface,
    articleTeaserItems: ArticleInterface[],
    quickBitTeaserItems: ArticleInterface[],
}

// Component
const Home = ({ dictionary, copy, headings, articleTeaserItems, quickBitTeaserItems }: IProps) => {
    return <>
        <div className='grid'>
            <div className='g4'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.elevatorPitch}</h2>
                <ResumePitch />
            </div>
        </div>

        <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.latestArticles}</h2>
                <p className='h4' data-reveal-in-view>{copy.articlesLead}</p>
                <ArticleTeasers type='articles' articles={articleTeaserItems} />
            </div>

            {getArticles().length > 3 && <div className='g8'>
                <Link href='/articles'>
                    <a className='button-link' data-reveal-in-view>{dictionary.viewAllArticles}</a>
                </Link>
            </div>}
        </div>

        <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.latestQuickBits}</h2>
                <p className='h4' data-reveal-in-view>{copy.quickBitsLead}</p>
                <ArticleTeasers type='quick-bits' articles={quickBitTeaserItems} />
            </div>

            {getQuickBits().length > 3 && <div className='g8'>
                <Link href='/quick-bits'>
                    <a className='button-link' data-reveal-in-view>{dictionary.viewAllQuickBits}</a>
                </Link>
            </div>}
        </div>
    </>;
};

export const getStaticProps: GetStaticProps = async () => {
    const copy = getCopy();
    const headings = getHeadings();
    const dictionary = getDictionary();

    const articleTeaserItems = getArticles().slice(0, 3);
    const quickBitTeaserItems = getQuickBits().slice(0, 3);

    return {
        props: {
            pageTitle: headings.greeting || null,
            pageCopy: copy.greetingIntro || null,
            pageDescription: copy.pageDescription || null,
            pageImage: '/img/dave.jpg',
            src: '/img/dave-flipped.jpg',
            copy,
            headings,
            dictionary,
            articleTeaserItems,
            quickBitTeaserItems
        }
    };
};

// Props
Home.defaultProps = {};

export default Home;
