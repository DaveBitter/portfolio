// Libs
import React, { useEffect, useRef } from 'react';

// Utils
import { ArticleInterface } from '../../../src/static/utils/Interfaces/Interfaces';
import formatDate from '../../static/utils/formatDate';
import ArticleElementEnricher from '../../static/utils/ArticleElementEnricher';
import compileMarkdownToJSX from '../../../src/static/utils/compileMarkdownToJSX';

// Resources

// Components

// Component
const Article = ({ body, date, intro, slug, teaserCopy, teaserImage, title, ...attributes }: ArticleInterface) => {
    const articleContent = useRef<any>(null);
    useEffect(() => {
        new ArticleElementEnricher(articleContent.current, null);
    }, []);

    return <article className='article grid' {...attributes}>
        <header className='article__header g0'>
            <div className='grid'>
                <div className='g2'>
                    <h1 className='article__title'>{title}</h1>
                    <time className='article__date' dateTime={date}>{formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                </div>
            </div>
            <div className='article__hero'>
                <img className='article__hero-image' src={teaserImage} alt={teaserImage} />
            </div>
        </header>
        <section className='g6'>
            <p className='article__intro'><strong>{intro}</strong></p>
            <div className='article__body' dangerouslySetInnerHTML={{ __html: compileMarkdownToJSX(body) }} ref={articleContent} />
        </section>
    </article>;
};

// Props
Article.defaultProps = {};

export default Article;
