// Libs
import React from 'react';
import Head from 'next/head';

// Utils
import { ArticleInterface } from '../../../static/js/utils/Interfaces/Interfaces';

// Resources

// Components

// Interface
interface IProps {
    article?: ArticleInterface,
    pageTitle: string,
    pageDescription: string
}

// Component
const SiteMeta = ({ article, pageTitle, pageDescription }: IProps) => {
    const title = `Dave Bitter | ${article ? article.title : pageTitle}`;
    const description = article ? article.intro : pageDescription;

    return <Head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta http-equiv='content-language' content='en' />
        <meta name='viewport' id='viewporttag' content='width=device-width, user-scalable=no, initial-scale=1' />

        <link rel='apple-touch-icon' sizes='57x57' href='/img/favicons/apple-icon-57x57.png' />
        <link rel='apple-touch-icon' sizes='60x60' href='/img/favicons/apple-icon-60x60.png' />
        <link rel='apple-touch-icon' sizes='72x72' href='/img/favicons/apple-icon-72x72.png' />
        <link rel='apple-touch-icon' sizes='76x76' href='/img/favicons/apple-icon-76x76.png' />
        <link rel='apple-touch-icon' sizes='114x114' href='/img/favicons/apple-icon-114x114.png' />
        <link rel='apple-touch-icon' sizes='120x120' href='/img/favicons/apple-icon-120x120.png' />
        <link rel='apple-touch-icon' sizes='144x144' href='/img/favicons/apple-icon-144x144.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/img/favicons/apple-icon-152x152.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/img/favicons/apple-icon-180x180.png' />
        <link rel='icon' type='image/png' sizes='192x192' href='/img/favicons/android-icon-192x192.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/img/favicons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/img/favicons/favicon-96x96.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/img/favicons/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />

        <meta name='msapplication-TileColor' content='#222222' />
        <meta name='msapplication-TileImage' content='/img/favicons/ms-icon-144x144.png' />

        <meta name='theme-color' content='#222222'></meta>

        <title>{title}</title>
        <meta name='description' content={description} />
    </Head>
};

// Props
SiteMeta.defaultProps = {};

export default SiteMeta;
