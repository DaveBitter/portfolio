// Libs
import React from 'react';

// Utils

// Resources

// Components

// Interface
interface IProps {
    body: string,
    date: string,
    intro: string,
    teaserCopy: string,
    teaserImage: string,
    title: string,
}

// Component
const ArticleTeaser = ({ body, date, intro, teaserCopy, teaserImage, title, ...attributes }: IProps) => {
    return <div className='article-teaser' {...attributes}>
        <h2 className='article__teaser__title'>{title}</h2>
        <time>{date}</time>
        <p className='article__teaser__copy'>{teaserCopy}</p>
        <img src={teaserImage} />
    </div>;
};

// Props
ArticleTeaser.defaultProps = {};

export default ArticleTeaser;
