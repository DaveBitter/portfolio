// Libs
import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js'

// Utils
import { ArticleInterface, TagInterface } from '../../static/js/utils/Interfaces/Interfaces';
import formatDate from '../../static/js/utils/formatDate';
import ArticleElementEnricher from '../../static/js/utils/ArticleElementEnricher';
import compileMarkdownToJSX from '../../static/js/utils/compileMarkdownToJSX';
import { ArticleTypeType } from '../../static/js/utils/Interfaces/Types';
import { getDictionary } from '../../static/js/utils/getContent';
// Resources

// Components
import Tag from '../Tag/Tag';
import Share from '../Share/Share';

// Interface
interface IProps {
    articleType: ArticleTypeType
}

// Component
const Article = ({ articleType, body, date, intro, city, countryCode, event, tags: articleTags, teaserImage, title, ...attributes }: ArticleInterface & IProps) => {
    const dictionary = getDictionary();

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
                    <time className='article__date' dateTime={date} data-reveal-in-view>{formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })} {event && city && countryCode && <small>{`, ${dictionary[event]} | ${city} (${countryCode})`}</small>}</time>
                    {tags && !!tags.length && <Tag.Wrapper alignment='right'>
                        {tags.map((tag: TagInterface) => <Tag.Item key={tag.key} tag={tag} />)}
                    </Tag.Wrapper>}
                </div>
            </div>
            <div className='article__hero' data-reveal-in-view>
                <img className='article__hero-image' src={teaserImage} alt={teaserImage} loading='lazy' />
            </div>
        </header>
        <section className='g6'>
            {articleType !== 'talks' && <p className='article__intro' data-reveal-in-view><strong>{intro}</strong></p>}
            {body && <div className='article__body' dangerouslySetInnerHTML={{ __html: compileMarkdownToJSX(body) }} ref={articleContent} data-reveal-in-view />}
        </section>
        <Share />
    </article>;
};

// Props
Article.defaultProps = {};

export default Article;
