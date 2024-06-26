// Libs
import React from "react";
import Head from "next/head";

// Utils
import { ArticleInterface } from "../../../static/js/utils/Interfaces/Interfaces";
import { getHeadings, getCopy } from "../../../static/js/utils/getContent";

// Components

// Resources

// Interface
interface IProps {
  article?: ArticleInterface;
  pageTitle: string;
  pageDescription: string;
  pageImage: string;
}

// Component
const getOpenGraphData = ({
  article,
  pageTitle,
  pageDescription,
  pageImage,
}: IProps) => {
  let openGraphData = {
    title: pageTitle,
    description: pageDescription,
    keywords:
      "dave, bitter, dave bitter, front-end, frontend, developer, engineer, designer, front-end developer, senior front-end developer, front-end engineer, front-end designer",
    siteName: "Dave Bitter",
    locale: "en",
    type: "website",
    url: "davebitter.com",
    image: pageImage || undefined,
    author: "Dave Bitter",
    publisher: "Dave Bitter",
    twitterCard: "summary_large_image",
    twitterSite: "@dave_bitter",
    twitterCreator: "@dave_bitter",
  };

  if (article) {
    const { title, intro } = article;

    openGraphData = {
      ...openGraphData,
      title: title,
      description: intro,
      type: "article",
    };
  }

  return openGraphData;
};

const SiteOpenGraphTags = ({
  article,
  pageTitle,
  pageDescription,
  pageImage,
}: IProps) => {
  const {
    title,
    description,
    keywords,
    siteName,
    locale,
    type,
    url,
    image,
    author,
    publisher,
    twitterCard,
    twitterSite,
    twitterCreator,
  } = getOpenGraphData({ article, pageTitle, pageDescription, pageImage });

  return (
    <Head>
      {image && (
        <meta
          property="og:image"
          content={`https://www.davebitter.com${image}`}
        />
      )}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {locale && <meta property="og:locale" content={locale} />}
      {type && <meta property="og:type" content={type} />}
      {url && <meta property="og:url" content={url} />}
      {author && <meta property="article:author" content={author} />}
      {publisher && <meta property="article:publisher" content={publisher} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && (
        <meta name="twitter:creator" content={twitterCreator} />
      )}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && (
        <meta
          name="twitter:image"
          content={`https://www.davebitter.com${image}`}
        />
      )}
    </Head>
  );
};

// Props
SiteOpenGraphTags.defaultProps = {
  pageTitle: getHeadings().greeting,
  pageDescription: getCopy().greetingIntro,
  pageImage: "/img/dave.png",
};

export default SiteOpenGraphTags;
