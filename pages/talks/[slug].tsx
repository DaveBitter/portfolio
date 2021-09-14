// Libs
import { GetStaticProps } from 'next';
import convertTalkToArticleTeaser from 'static/js/utils/convertTalkToArticleTeaser';

// Uitls
import query from '../../src/static/js/utils/api/query';
import getOGImage from '../../src/static/js/utils/getOGImage';
import { ArticleInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Components
import Index from '../articles/[slug]';

export const getStaticPaths = async () => {
    const { talks } = await query('/content/talks');

    return {
        paths: talks.map((talk: ArticleInterface) => ({ params: { slug: talk.slug } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { headings } = await query('/content/ui');
    const { talks } = await query('/content/talks');

    const articleData = convertTalkToArticleTeaser(talks.find((talk: ArticleInterface) => context && context.params ? talk.slug === context.params.slug : false));

    const ogImage = await getOGImage(`/talks_${articleData.slug}`, { title: articleData.title, image: articleData.teaserImage, date: articleData.date });

    return {
        props: {
            pageImage: ogImage || null,
            article: articleData || null,
            relatedArticles: talks.filter((talk: ArticleInterface) => context && context.params ? talk.slug !== context.params.slug : false),
            showGenericSiteHeader: false,
            type: 'talks',
            headings
        }
    };
};

export default Index;
