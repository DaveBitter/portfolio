// Libs
import React from 'react';

// Utils

// Resources

// Components
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import Card from '../../Card/Card';

// Interface
interface IProps {
    articles: any
}

// Component
const ArticleTeasers = ({ articles, ...attributes }: IProps) => {
    return <ul className='article-teasers' {...attributes}>
        {articles.map((article: any, index: number) => <li key={index} className='article-teasers__item'>
            <Card>
                <ArticleTeaser {...article} />
            </Card>
        </li>)}
    </ul>
};

// Props
ArticleTeasers.defaultProps = {
    articles: []
};

export default ArticleTeasers;
