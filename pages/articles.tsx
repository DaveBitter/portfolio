// Libs
import React from 'react';

// Utils
import { getArticles } from '../src/static/utils/getContent';

// Resources

// Components
import ArticleTeasers from '../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps { }

// Component
const Articles = ({ }: IProps) => {
    return <>
        <h1>Articles</h1>
        <ArticleTeasers articles={getArticles().items} />
    </>;
};

// Props
Articles.defaultProps = {};

export default Articles;
