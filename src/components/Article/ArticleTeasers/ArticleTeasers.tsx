// Libs
import React from 'react';

// Utils
import { ArticleInterface } from 'static/js/utils/Interfaces/Interfaces';

// Resources

// Components
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import Card from '../../Card/Card';
import { ArticleTypeType } from 'static/js/utils/Interfaces/Types';

// Interface
interface IProps {
    articles: ArticleInterface[],
    type: ArticleTypeType
}

// Helpers

// Component
const ArticleTeasers = ({ articles, type, ...attributes }: IProps) => {

    return <ul className='article-teasers' {...attributes}>
        {articles.map((article: ArticleInterface, index: number) => <li key={index} className='article-teasers__item' data-reveal-in-view>
            <Card>
                <ArticleTeaser {...article} href={`/${type}/[slug]?slug=${article.slug}`} as={`/${type}/${article.slug}`} />
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
