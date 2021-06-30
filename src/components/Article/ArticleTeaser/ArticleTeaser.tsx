// Libs
import React from 'react';
import Link from 'next/link';

// Utils
import { getDictionary } from '../../../static/js/utils/getContent';
import { ArticleInterface, TagInterface } from '../../../static/js/utils/Interfaces/Interfaces';
import formatDate from '../../../static/js/utils/formatDate';

// Resources

// Components
import Tag from '../../Tag/Tag';

// Component
const ArticleTeaser = ({ date, tags: articleTags, teaserCopy, teaserImage, title, as, href, ...attributes }: ArticleInterface) => {
    const dictionary = getDictionary();

    // NOTE: TS made me do it :/
    const tags = [...(articleTags || [])];

    return <div className='article-teaser' {...attributes}>
        <header className='article-teaser__header g0'>
            <h3 className='article-teaser__title h4'>{title}</h3>
            <time className='article-teaser__date' dateTime={date}>{formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })}</time>

            <div className='article-teaser__hero'>
                <img className='article-teaser__hero-image' src={teaserImage} alt={teaserImage} loading='lazy' />
            </div>
        </header>

        <p className='article-teaser__copy copy copy--large'>{teaserCopy}</p>

        {tags && !!tags.length && <Tag.Wrapper>
            {tags.map((tag: TagInterface) => <Tag.Item key={tag.key} tag={tag} />)}
        </Tag.Wrapper>}
        <Link href={href} as={as}>
            <a className='article-teaser__link'>{dictionary.read} {title}</a>
        </Link>
    </div>;
};

// Props
ArticleTeaser.defaultProps = {};

export default ArticleTeaser;
