import { GetStaticProps } from 'next';
import query from '../src/static/js/utils/api/query';
import ErrorPage from './error/[status]';

export const getStaticProps: GetStaticProps = async () => {
    const { copy } = await query('/content/ui');
    const status = '404';

    return {
        props: {
            pageTitle: `${copy.ahhh} ${status}`,
            pageCopy: copy.daveScrewedUp || null,
            src: '/img/articles.jpg',
            alt: '',
            pageDescription: copy.daveScrewedUp || null,
            status
        }
    };
};

export default ErrorPage;
