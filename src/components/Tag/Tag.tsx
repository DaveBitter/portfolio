// Libs
import React from 'react';
import Link from 'next/link';
import { TagInterface } from 'static/js/utils/Interfaces/Interfaces';

// Utils

// Resources

// Components

// Interface
interface IProps {
    tag: TagInterface
}

// Component
const Wrapper = ({ children, alignment = 'left', ...attributes }: { children: any, alignment?: 'left' | 'right' | undefined }) => {
    return <div className='tag-wrapper' data-alignment={alignment} {...attributes} data-reveal-in-view>
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
const Tag = ({ children }: { children: any }) => {
    return <>
        {children}
    </>;
};

// Props
Tag.defaultProps = {};

Tag.Wrapper = Wrapper;
Tag.Item = Item;

export default Tag;
