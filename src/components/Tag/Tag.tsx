// Libs
import React from 'react';
import Link from 'next/link';
import { TagInterface } from 'static/js/utils/Interfaces/Interfaces';

// Utils

// Resources

// Components

// Interface
interface IProps {
    tag: TagInterface,
}

// Component
const Wrapper = ({ children, alignment = 'left', scrollable = false, ...attributes }: { children: JSX.Element[] | JSX.Element | string | number, alignment?: 'left' | 'right' | undefined, scrollable?: boolean }) => {
    return <div className='tag-wrapper' data-alignment={alignment} data-scrollable={scrollable} {...attributes} data-reveal-in-view>
        {children}
    </div>;
};

const Item = ({ tag, ...attributes }: IProps) => {
    return <div className='tag' {...attributes}>
        <Link href={`/tags/${tag.key}`}>
            <a className='tag__link'>{tag.value}</a>
        </Link>
    </div>;
};

// Component
const Tag = ({ children }: { children: JSX.Element[] | JSX.Element | string | number }) => {
    return <>
        {children}
    </>;
};

// Props
Tag.defaultProps = {};

Tag.Wrapper = Wrapper;
Tag.Item = Item;

export default Tag;
