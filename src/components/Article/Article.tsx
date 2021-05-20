// Libs
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js'

// Utils
import { ArticleInterface, TagInterface } from '../../static/js/utils/Interfaces/Interfaces';
import formatDate from '../../static/js/utils/formatDate';
import ArticleElementEnricher from '../../static/js/utils/ArticleElementEnricher';
import compileMarkdownToJSX from '../../static/js/utils/compileMarkdownToJSX';

// Resources

// Components
import Tag from '../Tag/Tag';
import Share from '../Share/Share';

// Component
const Article = ({ body, date, intro, tags: articleTags, slug, teaserCopy, teaserImage, title, ...attributes }: ArticleInterface) => {
    const articleContent = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        new ArticleElementEnricher(articleContent.current, null);
        hljs.initHighlighting();
    }, [title]);

    // NOTE: TS made me do it :/
    const tags = [...(articleTags || [])];

    return <article className='article grid' {...attributes}>
        <header className='article__header g0'>
            <div className='grid'>
                <div className='g2'>
                    <h1 className='article__title' data-reveal-in-view>{title}</h1>
                    <time className='article__date' dateTime={date} data-reveal-in-view>{formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                    {tags && !!tags.length && <Tag.Wrapper alignment='right'>
                        {tags.map((tag: TagInterface) => <Tag.Item key={tag.key} tag={tag} />)}
                    </Tag.Wrapper>}
                </div>
            </div>
            <div className='article__hero' data-reveal-in-view>
                <Image className='article__hero-image' src={teaserImage} alt={teaserImage} layout='fill' loading='lazy' />
            </div>
        </header>
        <section className='g6'>
            <p className='article__intro' data-reveal-in-view><strong>{intro}</strong></p>
            {body && <div className='article__body' dangerouslySetInnerHTML={{ __html: compileMarkdownToJSX(body) }} ref={articleContent} data-reveal-in-view />}
        </section>
        <Share />
    </article>;
};

// Props
Article.defaultProps = {};

export default Article;
