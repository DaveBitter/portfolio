// Libs
import React from 'react';

// Utils

// Resources

// Components
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';

// Interface
interface IProps {
    articles: any
}

// Component
const ArticleTeasers = ({ articles, ...attributes }: IProps) => {
    return <ul className='article-teasers' {...attributes}>
        {[...articles, ...articles].map((article: any, index: number) => <li key={index} className='article-teasers__item'>
            <ArticleTeaser {...article} />
        </li>)}
    </ul>
};

// Props
ArticleTeasers.defaultProps = {
    articles: []
};

export default ArticleTeasers;
