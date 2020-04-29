// Libs
import React from 'react';

// Utils
import { getDictionary } from 'static/utils/getContent';

// Resources

// Components
import FancyImageBlock from 'components/FancyImageBlock/FancyImageBlock';

// Interface
interface IProps { }

// Component
const Home = ({ }: IProps) => {
    const dictionary = getDictionary();

    return <div className='grid'>
        <div className='g2'>
            <FancyImageBlock src='/img/dave.jpg' alt={dictionary.daveBitter} />
        </div>
    </div>;
};

// Props
Home.defaultProps = {};

export default Home;
