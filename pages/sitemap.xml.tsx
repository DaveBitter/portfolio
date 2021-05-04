// Libs
import { readdirSync, statSync } from 'fs';
import path from 'path';

// Utils
import formatDate from '../src/static/js/utils/formatDate';
import { ArticleInterface } from '../src/static/js/utils/Interfaces/Interfaces';
import { getArticles, getQuickBits, getTags } from '../src/static/js/utils/getContent';

// Helpers
const getItemFromPath = (path: string, pathPrefix = '') => ({ loc: `${pathPrefix}${path}`, updatedAt: new Date() });

const getDirectories = (src: string) => readdirSync(src)
    .map(file => path.join(src, file))
    .filter(path => statSync(path).isDirectory());

const getDirectoriesRecursive = (src: string): any => [
    src,
    ...getDirectories(src).map(getDirectoriesRecursive).flat(Infinity)
];

const getEntries = (src: string) => {
    const items = [...getDirectoriesRecursive(src)]
        .filter(path => !['pages/error'].includes(path))
        .map(path => path.replace('pages/', ''))
        .map(path => path.replace('./', ''))
        .map(path => getItemFromPath(path));

    getArticles().forEach((article: ArticleInterface) => {
        items.push(getItemFromPath(article.slug, 'articles/'));
    });

    getQuickBits().forEach((quickBit: ArticleInterface) => {
        items.push(getItemFromPath(quickBit.slug, 'quick-bits/'));
    });

    Object.keys(getTags()).forEach((tag: string) => items.push(getItemFromPath(tag, 'tags/')));

    return items;
};

const SiteMapXML = () => {
    const pages = getEntries('./pages/');

    return `<?xml version='1.0' encoding='UTF-8'?>
    <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
    ${(pages || []).map(({ loc, updatedAt }) => `<url>
        <loc>https://www.davebitter.com/${loc}</loc>
        <lastmod>${formatDate(`${updatedAt}`, {}, 'en')}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>`)
        }
</urlset>`;
};


// Response
SiteMapXML.getInitialProps = ({ res }: any) => {
    res.setHeader('Content-Type', 'text/xml');
    res.write(SiteMapXML());
    res.end();
    return {};
};

export default SiteMapXML;
