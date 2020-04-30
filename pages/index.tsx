// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import { getHeadings, getCopy, getArticles } from 'static/utils/getContent';

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
                <h2 className='text-colored h1'>{headings.elevatorPitch}</h2>
                <p className='copy copy--jumbo'>{copy.elevatorPitch}</p>
            </div>
        </div>

        <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1'>{headings.latestArticles}</h2>
                <ArticleTeasers articles={getArticles().items.slice(0, 3)} />
            </div>
        </div>
    </>;
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const headings = getHeadings();

    return { props: { title: headings.greeting || null } }
}
// Props
Home.defaultProps = {};

export default Home;
