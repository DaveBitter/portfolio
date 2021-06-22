// Libs
import { GetStaticProps } from 'next';

// Utils
import query from 'static/js/utils/api/query';

// Components
import Index from '../articles/index';

export const getStaticProps: GetStaticProps = async () => {
    const { copy, headings } = await query('/content/ui');
    const { fridayTips } = await query('/content/friday-tips');

    return {
        props: {
            items: fridayTips,
            pageTitle: headings.latestFridayTips || null,
            pageCopy: copy.fridayTipsLead || null,
            src: '/img/friday-tips.jpg',
            alt: '',
            type: 'friday-tips'
        }
    };
};

export default Index;
