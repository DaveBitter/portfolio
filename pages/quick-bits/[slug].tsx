// Libs
import { GetStaticProps } from 'next';

// Uitls
import { getQuickBits } from 'static/utils/getContent';

// Components
import Index from '../articles/[slug]';

export const getStaticPaths = async () => {
    return {
        paths: getQuickBits().items.map((quickBit: any) => ({ params: { slug: quickBit.slug } })),
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    return {
        props: {
            article: getQuickBits().items.find((quickBit: any) => quickBit.slug === context.params.slug) || null,
            relatedArticles: getQuickBits().items.filter((quickBit: any) => quickBit.slug !== context.params.slug),
            showGenericSiteHeader: false
        }
    }
}

export default Index
