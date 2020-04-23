// Libs
import React from 'react';
import Link from 'next/link';

// Utils
import { getDictionary } from '../../../static/utils/getContent';

// Resources

// Components

// Interface
interface IProps {
    body: string,
    date: string,
    intro: string,
    slug: string,
    teaserCopy: string,
    teaserImage: string,
    title: string,
}

// Component
const ArticleTeaser = ({ body, date, intro, slug, teaserCopy, teaserImage, title, ...attributes }: IProps) => {
    const dictionary = getDictionary();

    return <div className='article-teaser' {...attributes}>
        <h2 className='article-teaser__title'>{title}</h2>
        <time className='article-teaser__date'>{date}</time>
        <p className='article-teaser__copy'>{teaserCopy}</p>
        <img className='article-teaser__image' src={teaserImage} alt={teaserImage} />
        <Link href={`/articles/[slug]?slug=${slug}`} as={`/articles/${slug}`}>
            <a className='article-teaser__link'>{dictionary.read} {title}</a>
        </Link>
    </div>;
};

// Props
ArticleTeaser.defaultProps = {};

export default ArticleTeaser;
