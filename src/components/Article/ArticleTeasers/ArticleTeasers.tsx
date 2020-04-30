// Libs
import React from 'react';
import { useRouter } from "next/router";

// Utils
import { ArticleInterface } from 'static/utils/Interfaces/Interfaces';

// Resources

// Components
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import Card from '../../Card/Card';

// Interface
interface IProps {
    articles: any
}

// Helpers
const getLinkProps = ({ slug }: ArticleInterface) => {
    const router = useRouter();

    switch (router && router.route) {
        case '/quick-bits':
            return {
                href: `/quick-bits/[slug]?slug=${slug}`,
                as: `/quick-bits/${slug}`
            };
        default:
            return {
                href: `/articles/[slug]?slug=${slug}`,
                as: `/articles/${slug}`
            };
    }
}

// Component
const ArticleTeasers = ({ articles, ...attributes }: IProps) => {

    return <ul className='article-teasers' {...attributes}>
        {articles.map((article: any, index: number) => <li key={index} className='article-teasers__item' data-reveal-in-view>
            <Card>
                <ArticleTeaser {...article} {...getLinkProps(article)} />
            </Card>
        </li>)}
    </ul>
};

// Props
ArticleTeasers.defaultProps = {
    articles: []
};

export default ArticleTeasers;
