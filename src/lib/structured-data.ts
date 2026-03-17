import type { Article, Education, WorkExperience } from "./content";

const SITE_URL = "https://www.davebitter.com";
const SITE_NAME = "Dave Bitter";
const PERSON_NAME = "Dave Bitter";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_IMAGE = `${SITE_URL}/img/dave.webp`;
const PERSON_DESCRIPTION =
  "Senior Front-end Consultant, Developer Advocate, Google Developer Expert for Web, and Engineering Manager based in Amsterdam.";
const SOCIAL_URLS = [
  "https://github.com/DaveBitter",
  "https://www.linkedin.com/in/davebitter/",
  "https://x.com/Dave_Bitter",
  "https://www.instagram.com/davebitter/",
];

interface Crumb {
  name: string;
  path: string;
}

interface ListItemInput {
  name: string;
  path: string;
}

interface CollectionPageInput {
  path: string;
  title: string;
  description: string;
  items: ListItemInput[];
}

interface DetailPageInput {
  article: Article;
  path: string;
  imagePath?: string;
  breadcrumbParent: Crumb;
}

interface ResumePageInput {
  path: string;
  description: string;
  workExperience: WorkExperience[];
  education: Education[];
}

interface WebPageInput {
  path: string;
  title: string;
  description: string;
}

function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function toIsoDate(date: string): string {
  return new Date(date).toISOString();
}

function toTypeLabel(type: Article["type"]): string {
  switch (type) {
    case "articles":
      return "Articles";
    case "quick-bits":
      return "Quick Bits";
    case "talks":
      return "Talks";
    case "friday-tips":
      return "Friday Tips";
  }
}

function toArticleSchemaType(type: Article["type"]): string {
  switch (type) {
    case "articles":
      return "BlogPosting";
    case "quick-bits":
      return "TechArticle";
    case "talks":
      return "CreativeWork";
    case "friday-tips":
      return "BlogPosting";
  }
}

function buildBreadcrumbList(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: toAbsoluteUrl(crumb.path),
    })),
  };
}

function buildItemList(items: ListItemInput[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: toAbsoluteUrl(item.path),
      name: item.name,
    })),
  };
}

function buildBasePage({ path, title, description }: WebPageInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: toAbsoluteUrl(path),
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  };
}

function buildPerson() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    url: SITE_URL,
    image: PERSON_IMAGE,
    description: PERSON_DESCRIPTION,
    email: "mailto:dave.bitter@iodigital.com",
    jobTitle: "Senior Front-end Consultant",
    knowsAbout: [
      "Front-end development",
      "React",
      "Next.js",
      "TypeScript",
      "Developer advocacy",
      "Engineering management",
      "Artificial intelligence",
    ],
    homeLocation: {
      "@type": "Place",
      name: "Amsterdam, NL",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amsterdam",
        addressCountry: "NL",
      },
    },
    sameAs: SOCIAL_URLS,
  };
}

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Front-end consultant, developer advocate, and engineering manager who writes about web development, speaks at conferences, and occasionally makes things that work.",
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      buildPerson(),
    ],
  };
}

export function buildHomePageJsonLd({
  description,
  latestItems,
}: {
  description: string;
  latestItems: Article[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildBasePage({
          path: "/",
          title: SITE_NAME,
          description,
        }),
        mainEntity: buildItemList(
          latestItems.map((item) => ({
            name: item.title,
            path: `/${item.type}/${item.slug}`,
          }))
        ),
      },
    ],
  };
}

export function buildCollectionPageJsonLd({
  path,
  title,
  description,
  items,
}: CollectionPageInput) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildBasePage({ path, title, description }),
        "@type": "CollectionPage",
        mainEntity: buildItemList(items),
      },
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: title, path },
      ]),
    ],
  };
}

export function buildArticlePageJsonLd({
  article,
  path,
  imagePath,
  breadcrumbParent,
}: DetailPageInput) {
  const url = toAbsoluteUrl(path);
  const image = imagePath ?? article.teaserImage;
  const schemaType = toArticleSchemaType(article.type);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": schemaType,
        headline: article.title,
        name: article.title,
        description: article.teaserCopy,
        datePublished: toIsoDate(article.date),
        dateModified: toIsoDate(article.date),
        url,
        mainEntityOfPage: url,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        image: toAbsoluteUrl(image),
        keywords: article.tags,
        inLanguage: "en",
        articleSection: toTypeLabel(article.type),
        about: article.tags?.map((tag) => ({
          "@type": "Thing",
          name: tag,
        })),
        ...(article.intro ? { abstract: article.intro } : {}),
        ...(article.event
          ? {
              isPartOf: {
                "@type": "Event",
                name: article.event,
                location: article.city
                  ? {
                      "@type": "Place",
                      name: article.city,
                      address: {
                        "@type": "PostalAddress",
                        addressLocality: article.city,
                        ...(article.countryCode
                          ? { addressCountry: article.countryCode }
                          : {}),
                      },
                    }
                  : undefined,
              },
            }
          : {}),
      },
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        breadcrumbParent,
        { name: article.title, path },
      ]),
    ],
  };
}

export function buildVideoPageJsonLd({
  article,
  path,
}: {
  article: Article;
  path: string;
}) {
  if (!article.youtubeVideoId) {
    return buildArticlePageJsonLd({
      article,
      path,
      imagePath: article.teaserImage,
      breadcrumbParent: { name: "Friday Tips", path: "/friday-tips" },
    });
  }

  const url = toAbsoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoObject",
        name: article.title,
        description: article.teaserCopy,
        uploadDate: toIsoDate(article.date),
        embedUrl: `https://www.youtube.com/embed/${article.youtubeVideoId}`,
        contentUrl: `https://www.youtube.com/watch?v=${article.youtubeVideoId}`,
        thumbnailUrl: [toAbsoluteUrl(article.teaserImage)],
        url,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
      },
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Friday Tips", path: "/friday-tips" },
        { name: article.title, path },
      ]),
    ],
  };
}

export function buildResumePageJsonLd({
  path,
  description,
  workExperience,
  education,
}: ResumePageInput) {
  const currentWork = workExperience.find((entry) => entry.present);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildBasePage({
          path,
          title: "Resume",
          description,
        }),
        "@type": "ProfilePage",
        mainEntity: {
          ...buildPerson(),
          description,
          worksFor: currentWork
            ? {
                "@type": "Organization",
                name: currentWork.company,
                url: currentWork.companyWebsite,
              }
            : undefined,
          hasOccupation: workExperience.flatMap((entry) =>
            entry.roles.map((role) => ({
              "@type": "Occupation",
              name: role.role,
              occupationLocation: {
                "@type": "City",
                name: entry.city,
              },
              estimatedSalary: undefined,
            }))
          ),
          alumniOf: education.map((entry) => ({
            "@type": "EducationalOrganization",
            name: entry.institute,
            url: entry.instituteWebsite,
          })),
        },
      },
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Resume", path },
      ]),
    ],
  };
}
