import { GetStaticProps } from 'next';
import { getCopy } from '../src/static/js/utils/getContent';
import ErrorPage from './error/[status]';

export const getStaticProps: GetStaticProps = async () => {
    const copy = getCopy();
    const status = '404';

    return {
        props: {
            pageTitle: `${copy.ahhh} ${status}`,
            pageCopy: copy.daveScrewedUp,
            src: '/img/articles.jpg',
            alt: '',
            pageDescription: copy.daveScrewedUp,
            status
        }
    };
};

export default ErrorPage;
