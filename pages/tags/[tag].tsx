// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import query from '../../src/static/js/utils/api/query';
import { ArticleInterface, ContentObjectInterface, TagInterface, TalkInterface } from '../../src/static/js/utils/Interfaces/Interfaces';
import getOGImage from '../../src/static/js/utils/getOGImage';
import convertTalkToArticleTeaser from 'static/js/utils/convertTalkToArticleTeaser';

// Resources

// Components
import ArticleTeasers from '../../src/components/Article/ArticleTeasers/ArticleTeasers';

// Interface
interface IProps {
    dictionary: ContentObjectInterface,
    articleTeaserItems: ArticleInterface[],
    quickBitTeaserItems: ArticleInterface[],
    talkTeaserItems: ArticleInterface[],
}

// Component
const Tags = ({ dictionary, articleTeaserItems, quickBitTeaserItems, talkTeaserItems }: IProps) => {
    return <>
        {articleTeaserItems && !!articleTeaserItems.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{dictionary.articles}</h2>
            </div>

            <div className='g2'>
                <ArticleTeasers type='articles' articles={articleTeaserItems} />
            </div>
        </div>}

        {quickBitTeaserItems && !!quickBitTeaserItems.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{dictionary.quickBits}</h2>
            </div>

            <div className='g2'>
                <ArticleTeasers type='quick-bits' articles={quickBitTeaserItems} />
            </div>
        </div>}

        {talkTeaserItems && !!talkTeaserItems.length && <div className='grid'>
            <div className='g2'>
                <h2 className='text-colored h1' data-reveal-in-view>{dictionary.talks}</h2>
            </div>

            <div className='g2'>
                <ArticleTeasers type='talks' articles={talkTeaserItems} />
            </div>
        </div>}
    </>;
};

export const getStaticPaths = async () => {
    const { tags } = await query('/content/tags');

    return {
        paths: Object.keys(tags).map((tag: string) => ({ params: { tag } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const activeTag = context.params && context.params.tag;

    const { copy, dictionary } = await query('/content/ui');
    const { tags } = await query('/content/tags');

    const { articles } = await query('/content/articles');
    const { quickBits } = await query('/content/quick-bits');
    const { talks } = await query('/content/talks');

    const articleTeaserItems = articles
        .filter((article: ArticleInterface) => article.tags.find((tag: TagInterface) => tag.key === activeTag));
    const quickBitTeaserItems = quickBits
        .filter((quickBit: ArticleInterface) => quickBit.tags.find((tag: TagInterface) => tag.key === activeTag));
    const talkTeaserItems = talks
        .map(convertTalkToArticleTeaser)
        .filter((talk: TalkInterface) => talk.tags.find((tag: TagInterface) => tag.key === activeTag));
    const tagLabel = context.params && context.params.tag && activeTag ? tags[Array.isArray(activeTag) ? activeTag[0] : activeTag] : null;

    const ogImage = await getOGImage(`/tags_${activeTag}`, { title: tagLabel || activeTag, image: `/img/tags/${activeTag}.jpg` });

    return {
        props: {
            pageTitle: tagLabel || activeTag,
            pageCopy: copy.tagLead.replace('{{tag}}', tagLabel || activeTag),
            pageImage: ogImage || null,
            src: `/img/tags/${activeTag}.jpg`,
            alt: '',
            pageDescription: copy.pageDescription || null,
            dictionary,
            copy,
            tags,
            articleTeaserItems,
            quickBitTeaserItems,
            talkTeaserItems
        }
    };
};

// Props
Tags.defaultProps = {};

export default Tags;
