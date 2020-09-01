// Libs
import { GetStaticProps } from 'next';

// Uitls
import { getQuickBits } from '../../src/static/js/utils/getContent';

// Components
import Index from '../articles/[slug]';

export const getStaticPaths = async () => {
    return {
        paths: getQuickBits().map((quickBit: any) => ({ params: { slug: quickBit.slug } })),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    return {
        props: {
            article: getQuickBits().find((quickBit: any) => quickBit.slug === context.params.slug) || null,
            relatedArticles: getQuickBits().filter((quickBit: any) => quickBit.slug !== context.params.slug),
            showGenericSiteHeader: false,
            type: 'quick-bits'
        }
    }
}

export default Index
