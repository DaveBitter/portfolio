// Libs
import React, { useMemo } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";

// Utils
import query from "../src/static/js/utils/api/query";
import convertTalkToArticleTeaser from "../src/static/js/utils/convertTalkToArticleTeaser";
import {
  ArticleInterface,
  ContentObjectInterface,
} from "../src/static/js/utils/Interfaces/Interfaces";
import getOGImage from "../src/static/js/utils/getOGImage";

// Resources

// Components
import ArticleTeasers from "../src/components/Article/ArticleTeasers/ArticleTeasers";
import ResumePitch from "../src/components/Resume/ResumePitch/ResumePitch";

// Interface
interface IProps {
  dictionary: ContentObjectInterface;
  copy: ContentObjectInterface;
  headings: ContentObjectInterface;
  articleTeaserItems: ArticleInterface[];
  quickBitTeaserItems: ArticleInterface[];
  talkTeaserItems: ArticleInterface[];
  fridayTipTeaserItems: ArticleInterface[];
  hasMoreArticles: boolean;
  hasMoreQuickBits: boolean;
  hasMoreTalks: boolean;
  hasMoreFridayTips: boolean;
}

// Component
const Home = ({
  dictionary,
  copy,
  headings,
  articleTeaserItems,
  quickBitTeaserItems,
  talkTeaserItems,
  fridayTipTeaserItems,
  hasMoreArticles,
  hasMoreQuickBits,
  hasMoreTalks,
  hasMoreFridayTips,
}: IProps) => {
  const items = useMemo(
    () =>
      [
        ...articleTeaserItems,
        ...quickBitTeaserItems,
        ...talkTeaserItems,
        ...fridayTipTeaserItems,
      ]
        .sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .reverse()
        .splice(0, 12),
    [
      articleTeaserItems,
      quickBitTeaserItems,
      talkTeaserItems,
      fridayTipTeaserItems,
    ]
  );

  return (
    <>
      <div className="grid">
        <div className="g4">
          <h2 className="text-colored h1" data-reveal-in-view>
            {headings.elevatorPitch}
          </h2>
          <ResumePitch />
        </div>
      </div>

      <div className="grid">
        <div className="g2">
          <h2 className="text-colored h1" data-reveal-in-view>
            {headings.latestItems}
          </h2>
          <p className="h4" data-reveal-in-view>
            {copy.latestLead}
          </p>
          <ArticleTeasers type="articles" articles={items} />
        </div>

        <div className="g2 button-link-grid">
          {hasMoreTalks && (
            <Link href="/talks">
              <a className="button-link" data-reveal-in-view>
                {dictionary.viewAllTalks}
              </a>
            </Link>
          )}

          {hasMoreArticles && (
            <Link href="/articles">
              <a className="button-link" data-reveal-in-view>
                {dictionary.viewAllArticles}
              </a>
            </Link>
          )}

          {hasMoreQuickBits && (
            <Link href="/quick-bits">
              <a className="button-link" data-reveal-in-view>
                {dictionary.viewAllQuickBits}
              </a>
            </Link>
          )}

          {hasMoreFridayTips && (
            <Link href="/friday-tips">
              <a className="button-link" data-reveal-in-view>
                {dictionary.viewAllFridayTips}
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { copy, headings, dictionary } = await query("/content/ui");
  const { articles } = await query("/content/articles");
  const { quickBits } = await query("/content/quick-bits");
  const { fridayTips } = await query("/content/friday-tips");
  const { talks } = await query("/content/talks");

  const hasMoreArticles = articles.length > 4;
  const hasMoreQuickBits = quickBits.length > 4;
  const hasMoreTalks = talks.length > 4;
  const hasMoreFridayTips = fridayTips.length > 4;

  const articleTeaserItems = articles.slice(0, 4);
  const quickBitTeaserItems = quickBits.slice(0, 4);
  const talkTeaserItems = talks.map(convertTalkToArticleTeaser).slice(0, 4);
  const fridayTipTeaserItems = fridayTips.slice(0, 4);

  const ogImage = await getOGImage("/index", {});

  return {
    props: {
      pageTitle: headings.greeting || null,
      pageCopy: copy.greetingIntro || null,
      pageDescription: copy.pageDescription || null,
      pageImage: ogImage || null,
      src: "/img/dave.jpg",
      useFancyImageBlock: false,
      copy,
      headings,
      dictionary,
      articleTeaserItems,
      quickBitTeaserItems,
      talkTeaserItems,
      fridayTipTeaserItems,
      hasMoreArticles,
      hasMoreQuickBits,
      hasMoreTalks,
      hasMoreFridayTips,
    },
  };
};

// Props
Home.defaultProps = {};

export default Home;
