// Libs
import { GetStaticProps } from 'next';

// Utils
import query from '../../src/static/js/utils/api/query';

// Components
import Index from '../articles/index';

export const getStaticProps: GetStaticProps = async () => {
    const { copy, headings } = await query('/content/ui');
    const { quickBits } = await query('/content/quick-bits');

    return {
        props: {
            items: quickBits,
            pageTitle: headings.latestQuickBits || null,
            pageCopy: copy.quickBitsLead || null,
            src: '/img/articles.jpg',
            alt: '',
            type: 'quick-bits'
        }
    };
};

export default Index;
