// Libs
import { GetStaticProps } from 'next';

// Utils
import { getHeadings, getCopy, getQuickBits } from '../../src/static/js/utils/getContent';

// Components
import Index from '../articles/index';

export const getStaticProps: GetStaticProps = async (context: any) => {
    const headings = getHeadings();
    const copy = getCopy();
    const quickBits = getQuickBits()

    return {
        props: {
            items: quickBits.items,
            title: headings.latestQuickBits || null,
            copy: copy.quickBitsLead || null,
            src: '/img/articles.jpg',
            alt: '',
            type: 'quick-bits'
        }
    }
}

export default Index
