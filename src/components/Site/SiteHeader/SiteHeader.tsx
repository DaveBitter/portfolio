// Libs
import React from 'react';

// Utils
import { getDictionary } from '../../../static/utils/getContent';

// Resources

// Components
import FancyImageBlock from '../../FancyImageBlock/FancyImageBlock';

// Interface
interface IProps {
    children?: any,
    title: string,
    showGenericSiteHeader?: boolean,
    src: string,
    alt: string
}

// Component
const SiteHeader = ({ children, title, src, alt, showGenericSiteHeader, ...attributes }: IProps) => {
    return <header className='site-header grid' {...attributes} data-has-generic-site-header={showGenericSiteHeader}>
        <div className='site-header__content g2' >
            {showGenericSiteHeader && <div className='site-header__heading-wrapper' data-reveal-in-view>
                {title && <h1 className='site-header__heading' data-reveal-in-view>{title}</h1>}
                <FancyImageBlock src={src} alt={alt} />
            </div>}
            {children}
        </div>
    </header>;
};

// Props
const dictionary = getDictionary();

SiteHeader.defaultProps = {
    src: '/img/dave.jpg',
    alt: dictionary.daveBitter,
    showGenericSiteHeader: true
};

export default SiteHeader;
