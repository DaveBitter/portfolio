// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import { getHeadings, getCopy, getArticles, getQuickBits } from '../src/static/js/utils/getContent';

// Resources

// Components
import ArticleTeasers from 'components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps { }

// Component
const Home = ({ }: IProps) => {
    const copy = getCopy();
    const headings = getHeadings()

    return <>
        <div className='grid'>
            <div className='g6'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.elevatorPitch}</h2>
                <p className='copy copy--jumbo' data-reveal-in-view>{copy.elevatorPitch}</p>
            </div>
        </div>

        <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.latestArticles}</h2>
                <ArticleTeasers articles={getArticles().items.slice(0, 3)} />
            </div>
        </div>

        <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.latestQuickBits}</h2>
                <ArticleTeasers articles={getQuickBits().items.slice(0, 3)} />
            </div>
        </div>
    </>;
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const headings = getHeadings();
    const copy = getCopy();

    return {
        props: {
            title: headings.greeting || null,
            copy: copy.greetingIntro || null,
            src: '/img/dave.jpg'
        }
    }
}
// Props
Home.defaultProps = {};

export default Home;
