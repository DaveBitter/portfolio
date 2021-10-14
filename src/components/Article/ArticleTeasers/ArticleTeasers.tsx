// Libs
import React from 'react';

// Utils
import { ArticleInterface, TagInterface } from '../../../static/js/utils/Interfaces/Interfaces';
import { ArticleTypeType } from '../../../static/js/utils/Interfaces/Types';
import { getTags } from '../../../static/js/utils/getContent';

// Resources

// Components
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import Card from '../../Card/Card';
import Tag from '../../Tag/Tag';

// Interface
interface IProps {
    articles: ArticleInterface[],
    tags: TagInterface[],
    type: ArticleTypeType
}

// Helpers

// Component
const ArticleTeasers = ({ articles, tags, type, ...attributes }: IProps) => {
    return <>
        {type !== 'friday-tips' && tags && !!tags.length && <Tag.Wrapper scrollable={true}>
            {tags.map((tag: TagInterface) => <Tag.Item key={tag.key} tag={tag} />)}
        </Tag.Wrapper>}

        <ul className='article-teasers' {...attributes}>
            {articles.map((article: ArticleInterface, index: number) => <li key={index} className='article-teasers__item' data-reveal-in-view>
                <Card>
                    <ArticleTeaser {...article} href={`/${article.type}/[slug]?slug=${article.slug}`} as={`/${article.type}/${article.slug}`} />
                </Card>
            </li>)}
        </ul>
    </>;
};

// Props
ArticleTeasers.defaultProps = {
    articles: [],
    tags: Object.entries(getTags()).map(([key, value]) => ({ key, value })),
    type: 'articles'
};

export default ArticleTeasers;
