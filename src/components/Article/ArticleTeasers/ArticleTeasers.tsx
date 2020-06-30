// Libs
import React from 'react';

// Utils

// Resources

// Components
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import Card from '../../Card/Card';

// Interface
interface IProps {
    articles: any,
    type: string
}

// Helpers

// Component
const ArticleTeasers = ({ articles, type, ...attributes }: IProps) => {

    return <ul className='article-teasers' {...attributes}>
        {articles.map((article: any, index: number) => <li key={index} className='article-teasers__item' data-reveal-in-view>
            <Card>
                <ArticleTeaser {...article} type={type} href={`/${type}/[slug]?slug=${article.slug}`} as={`/${type}/${article.slug}`} />
            </Card>
        </li>)}
    </ul>
};

// Props
ArticleTeasers.defaultProps = {
    articles: [],
    type: 'articles'
};

export default ArticleTeasers;
