// Libs
import React from 'react';
import Link from 'next/link';

// Utils
import { getDictionary } from '../../../static/utils/getContent';
import { ArticleInterface } from '../../../static/utils/Interfaces/Interfaces';
import formatDate from '../../../static/utils/formatDate';

// Resources

// Components

// Component
const ArticleTeaser = ({ body, date, intro, slug, teaserCopy, teaserImage, title, ...attributes }: ArticleInterface) => {
    const dictionary = getDictionary();

    return <div className='article-teaser' {...attributes}>
        <header className='article-teaser__header g0'>
            <h1 className='article-teaser__title h4'>{title}</h1>
            <time className='article-teaser__date' dateTime={date}>{formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })}</time>

            <div className='article-teaser__hero'>
                <img className='article-teaser__hero-image' src={teaserImage} alt={teaserImage} />
            </div>
        </header>

        <p className='article-teaser__copy'>{teaserCopy}</p>

        <Link href={`/articles/[slug]?slug=${slug}`} as={`/articles/${slug}`}>
            <a className='article-teaser__link'>{dictionary.read} {title}</a>
        </Link>
    </div>;
};

// Props
ArticleTeaser.defaultProps = {};

export default ArticleTeaser;
