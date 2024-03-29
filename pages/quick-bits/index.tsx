// Libs
import { GetStaticProps } from 'next';

// Utils
import query from '../../src/static/js/utils/api/query';
import getOGImage from '../../src/static/js/utils/getOGImage';

// Components
import Index from '../articles/index';

export const getStaticProps: GetStaticProps = async () => {
    const { copy, headings } = await query('/content/ui');
    const { quickBits } = await query('/content/quick-bits');

    const ogImage = await getOGImage('/quick-bits', { title: headings.latestQuickBits, image: '/img/articles.jpg' });

    return {
        props: {
            items: quickBits,
            pageTitle: headings.latestQuickBits || null,
            pageImage: ogImage || null,
            pageCopy: copy.quickBitsLead || null,
            src: '/img/articles.jpg',
            alt: '',
            type: 'quick-bits'
        }
    };
};

export default Index;
