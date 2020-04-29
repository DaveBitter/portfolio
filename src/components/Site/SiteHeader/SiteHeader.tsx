// Libs
import React from 'react';

// Utils
import { getDictionary } from 'static/utils/getContent';

// Resources

// Components
import FancyImageBlock from 'components/FancyImageBlock/FancyImageBlock';

// Interface
interface IProps {
    children?: any,
    title: string,
    showGenericSiteHeader?: boolean
}

// Component
const SiteHeader = ({ children, title, showGenericSiteHeader, ...attributes }: IProps) => {
    const dictionary = getDictionary();
    return <header className='site-header grid' {...attributes}>
        <div className='site-header__content g2'>
            {showGenericSiteHeader && <div className='site-header__heading-wrapper'>
                {title && <h1 className='site-header__heading'>{title}</h1>}
                <FancyImageBlock src='/img/dave.jpg' alt={dictionary.daveBitter} />
            </div>}
            {children}
        </div>
    </header>;
};

// Props
SiteHeader.defaultProps = {
    showGenericSiteHeader: true
};

export default SiteHeader;
