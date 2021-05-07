// Libs
import { GetStaticProps } from 'next';

// Uitls
import query from '../../src/static/js/utils/api/query';
import { ArticleInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Components
import Index from '../articles/[slug]';

export const getStaticPaths = async () => {
    const { quickBits } = await query('/content/quick-bits');

    return {
        paths: quickBits.map((quickBit: ArticleInterface) => ({ params: { slug: quickBit.slug } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { headings } = await query('/content/ui');
    const { quickBits } = await query('/content/quick-bits');

    return {
        props: {
            article: quickBits.find((quickBit: ArticleInterface) => context && context.params ? quickBit.slug === context.params.slug : false) || null,
            relatedArticles: quickBits.filter((quickBit: ArticleInterface) => context && context.params ? quickBit.slug !== context.params.slug : false),
            showGenericSiteHeader: false,
            type: 'quick-bits',
            headings
        }
    };
};

export default Index;
