// Libs
import React from 'react';

// Utils

// Resources

// Components

// Interface
interface IProps {
    children: any,
    title: string
}

// Component
const SiteHeader = ({ children, title, ...attributes }: IProps) => {
    return <header className='site-header grid' {...attributes}>
        <div className='site-header__content g2'>
            {title && <h1>{title}</h1>}
            {children}
        </div>
    </header>;
};

// Props
SiteHeader.defaultProps = {};

export default SiteHeader;
