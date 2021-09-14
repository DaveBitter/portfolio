// Libs
import { GetStaticProps } from 'next';

// Uitls
import query from '../../src/static/js/utils/api/query';
import getOGImage from '../../src/static/js/utils/getOGImage';
import { ArticleInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Components
import Index from '../articles/[slug]';

export const getStaticPaths = async () => {
    const { fridayTips } = await query('/content/friday-tips');

    return {
        paths: fridayTips.map((fridayTip: ArticleInterface) => ({ params: { slug: fridayTip.slug } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { headings } = await query('/content/ui');
    const { fridayTips } = await query('/content/friday-tips');

    const articleData = fridayTips.find((fridayTip: ArticleInterface) => context && context.params ? fridayTip.slug === context.params.slug : false);

    const ogImage = await getOGImage(`/friday-tips_${articleData.slug}`, { title: articleData.title, image: articleData.teaserImage, date: articleData.date });

    return {
        props: {
            pageImage: ogImage || null,
            article: articleData || null,
            relatedArticles: fridayTips.filter((fridayTip: ArticleInterface) => context && context.params ? fridayTip.slug !== context.params.slug : false),
            showGenericSiteHeader: false,
            type: 'friday-tips',
            headings
        }
    };
};

export default Index;
