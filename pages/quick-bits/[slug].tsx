// Libs
import { GetStaticProps } from 'next';

// Uitls
import { getHeadings, getQuickBits } from '../../src/static/js/utils/getContent';
import { ArticleInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Components
import Index from '../articles/[slug]';

export const getStaticPaths = async () => {
    return {
        paths: getQuickBits().map((quickBit: ArticleInterface) => ({ params: { slug: quickBit.slug } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const headings = getHeadings();

    return {
        props: {
            article: getQuickBits().find((quickBit: ArticleInterface) => context && context.params ? quickBit.slug === context.params.slug : false) || null,
            relatedArticles: getQuickBits().filter((quickBit: ArticleInterface) => context && context.params ? quickBit.slug !== context.params.slug : false),
            showGenericSiteHeader: false,
            type: 'quick-bits',
            headings
        }
    };
};

export default Index;
