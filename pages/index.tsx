// Libs
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';


// Utils
import { getHeadings, getCopy, getArticles, getQuickBits, getDictionary } from '../src/static/js/utils/getContent';

// Resources

// Components
import ArticleTeasers from '../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps { }

// Component
const Home = ({ }: IProps) => {
    const copy = getCopy();
    const headings = getHeadings()
    const dictionary = getDictionary();


    const articleTeaserItems = getArticles().slice(0, 3);
    const quickBitsTeaserItems = getQuickBits().slice(0, 3);

    return <>
        <div className='grid'>
            <div className='g6'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.elevatorPitch}</h2>
                <p className='copy copy--jumbo' data-reveal-in-view>{copy.elevatorPitch}</p>
                <Link href='/resume#elevator-pitch'>
                    <a className='button-link' data-reveal-in-view>{dictionary.viewResume}</a>
                </Link>
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
                <ArticleTeasers type='quick-bits' articles={quickBitsTeaserItems} />
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
    const headings = getHeadings();
    const copy = getCopy();

    return {
        props: {
            title: headings.greeting || null,
            copy: copy.greetingIntro || null,
            pageDescription: copy.pageDescription || null,
            pageImage: '/img/dave.jpg',
            src: '/img/dave-flipped.jpg'
        }
    }
}
// Props
Home.defaultProps = {};

export default Home;
