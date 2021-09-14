// Libs
import { GetStaticProps } from 'next';

// Utils
import query from '../../src/static/js/utils/api/query';
import convertTalkToArticleTeaser from '../../src/static/js/utils/convertTalkToArticleTeaser';
import getOGImage from '../../src/static/js/utils/getOGImage';

// Component
import Index from '../articles/index';

export const getStaticProps: GetStaticProps = async () => {
    const { copy, headings } = await query('/content/ui');
    const { talks } = await query('/content/talks');

    const ogImage = await getOGImage('/talks', { title: headings.latestTalks, image: '/img/talks.jpg' });

    return {
        props: {
            items: talks.map(convertTalkToArticleTeaser),
            pageTitle: headings.latestTalks || null,
            pageImage: ogImage || null,
            pageCopy: copy.talksLead || null,
            src: '/img/talks.jpg',
            alt: '',
            type: 'talks'
        }
    };
};

export default Index;
