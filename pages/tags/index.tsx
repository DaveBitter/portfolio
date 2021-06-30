// Libs
import React from 'react';
import { GetStaticProps } from 'next'

// Utils
import query from '../../src/static/js/utils/api/query';
import { ArticleInterface } from '../../src/static/js/utils/Interfaces/Interfaces';
import { ArticleTypeType } from '../../src/static/js/utils/Interfaces/Types';
import generateOGImage from '../../src/static/js/utils/generateOGImage';

// Resources

// Components
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    items: ArticleInterface[],
    type: ArticleTypeType
}

// Component
const Tags = ({ items, type }: IProps) => {
    return <div className='grid'>
        <div className='g2'>
            <ArticleTeasers type={type} articles={items} />
        </div>
    </div>;
};

export const getStaticProps: GetStaticProps = async () => {
    const { copy, headings } = await query('/content/ui');
    const { articles } = await query('/content/articles');
    const { quickBits } = await query('/content/quick-bits');

    const ogImage = await generateOGImage('/tags_index', { title: headings.latestArticlesAndTags, image: '/img/articles.jpg' });

    return {
        props: {
            items: [...articles, ...quickBits],
            pageTitle: headings.latestArticlesAndTags || null,
            pageCopy: copy.articlesAndTagsLead || null,
            pageImage: ogImage || null,
            src: '/img/articles.jpg',
            alt: '',
            type: 'articles'
        }
    };
};

// Props
Tags.defaultProps = {};

export default Tags;
