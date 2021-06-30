import { GetStaticProps } from 'next';
import generateOGImage from '../src/static/js/utils/generateOGImage';
import query from '../src/static/js/utils/api/query';
import ErrorPage from './error/[status]';

export const getStaticProps: GetStaticProps = async () => {
    const { copy } = await query('/content/ui');
    const status = '404';

    const ogImage = await generateOGImage('/error', {});

    return {
        props: {
            pageTitle: `${copy.ahhh} ${status}`,
            pageCopy: copy.daveScrewedUp || null,
            pageImage: ogImage || null,
            src: '/img/articles.jpg',
            alt: '',
            pageDescription: copy.daveScrewedUp || null,
            status
        }
    };
};

export default ErrorPage;
