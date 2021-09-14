// Libs
import { GetStaticProps } from 'next';

// Utils
import query from '../../src/static/js/utils/api/query';
import getOGImage from '../../src/static/js/utils/getOGImage';

// Components
import Index from '../articles/index';

export const getStaticProps: GetStaticProps = async () => {
    const { copy, headings } = await query('/content/ui');
    const { fridayTips } = await query('/content/friday-tips');

    const ogImage = await getOGImage('/friday-tips', { title: headings.latestFridayTips, image: '/img/friday-tips.jpg' });

    return {
        props: {
            items: fridayTips,
            pageTitle: headings.latestFridayTips || null,
            pageImage: ogImage || null,
            pageCopy: copy.fridayTipsLead || null,
            src: '/img/friday-tips.jpg',
            alt: '',
            type: 'friday-tips'
        }
    };
};

export default Index;
