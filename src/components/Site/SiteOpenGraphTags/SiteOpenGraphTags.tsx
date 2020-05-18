// Libs
import React from 'react';
import Head from 'next/head';

// Utils
import { ArticleInterface } from '../../../static/js/utils/Interfaces/Interfaces';
import { getHeadings, getCopy } from '../../../static/js/utils/getContent';

// Components

// Resources

// Interface
interface IProps {
    article?: ArticleInterface,
    pageTitle: string,
    pageDescription: string,
    pageImage: string
}

// Component
const getOpenGraphData = ({ article, pageTitle, pageDescription, pageImage }: IProps) => {
    let openGraphData = {
        title: pageTitle,
        description: pageDescription,
        keywords: 'dave, bitter, dave bitter, front-end, frontend, developer, engineer, designer, front-end developer, front-end engineer, front-end-designer',
        siteName: 'Dave Bitter',
        locale: 'en',
        type: 'website',
        url: 'davebitter.com',
        image: pageImage || undefined,
        author: 'Dave Bitter',
        publisher: 'Dave Bitter',
        twitterSite: 'https://twitter.com/dave_bitter',
        twitterCreator: 'https://twitter.com/dave_bitter'
    };

    if (article) {
        const { title, intro, teaserImage } = article;

        openGraphData = {
            ...openGraphData,
            title: title,
            description: intro,
            type: 'article',
            ...(teaserImage ? { image: teaserImage } : {}),
        };
    }

    return openGraphData;
};

const SiteOpenGraphTags = ({ article, pageTitle, pageDescription, pageImage }: IProps) => {
    const { title, description, keywords, siteName, locale, type, url, image, author, publisher, twitterSite, twitterCreator } = getOpenGraphData({ article, pageTitle, pageDescription, pageImage });

    return (
        <Head>
            {image && <meta property='og:image' content={image} />}
            {title && <meta property='og:title' content={title} />}
            {description && <meta property='og:description' content={description} />}
            {siteName && <meta property='og:site_name' content={siteName} />}
            {locale && <meta property='og:locale' content={locale} />}
            {type && <meta property='og:type' content={type} />}
            {url && <meta property='og:url' content={url} />}
            {author && <meta property='article:author' content={author} />}
            {publisher && <meta property='article:publisher' content={publisher} />}
            {keywords && <meta name='keywords' content={keywords} />}

            {description && <meta name='twitter:card' content={description} />}
            {twitterSite && <meta name='twitter:site' content={twitterSite} />}
            {twitterCreator && <meta name='twitter:creator' content={twitterCreator} />}
        </Head>
    );
};

// Props
SiteOpenGraphTags.defaultProps = {
    pageTitle: getHeadings().greeting,
    pageDescription: getCopy().greetingIntro,
    pageImage: '/img/dave.jpg'
};

export default SiteOpenGraphTags;
