// Libs
import React from 'react';

// Utils
import { getCopy } from '../../../static/js/utils/getContent';
import Socials from '../../Socials/Socials';

// Resources

// Components

// Interface
interface IProps { }

// Component
const SiteFooter = ({ ...attributes }: IProps) => {
    const copy = getCopy();

    return <footer className='site-footer grid' {...attributes}>
        <div className='g4'>
            <h2 data-reveal-in-view>{copy.reachedEnd}</h2>
            <h3 data-reveal-in-view>{copy.getInTouch}:</h3>
        </div>

        <div className='g6'>
            <Socials theme='dark' />
        </div>
    </footer>;
};

// Props
SiteFooter.defaultProps = {};

export default SiteFooter;
