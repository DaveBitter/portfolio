// Libs
import { GetStaticProps } from 'next';

// Uitls
import query from 'static/js/utils/api/query';
import { ArticleInterface } from 'static/js/utils/Interfaces/Interfaces';

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

    return {
        props: {
            article: fridayTips.find((fridayTip: ArticleInterface) => context && context.params ? fridayTip.slug === context.params.slug : false) || null,
            relatedArticles: fridayTips.filter((fridayTip: ArticleInterface) => context && context.params ? fridayTip.slug !== context.params.slug : false),
            showGenericSiteHeader: false,
            type: 'friday-tips',
            headings
        }
    };
};

export default Index;
