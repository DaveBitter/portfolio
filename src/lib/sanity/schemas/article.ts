const article = {
  name: "article",
  type: "document",
  title: "Article",
  fields: [
    { name: "title", type: "string", title: "Title" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
    },
    { name: "date", type: "datetime", title: "Date" },
    {
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          { title: "Articles", value: "articles" },
          { title: "Quick Bits", value: "quick-bits" },
          { title: "Talks", value: "talks" },
          { title: "Friday Tips", value: "friday-tips" },
        ],
      },
    },
    { name: "teaser", type: "text", title: "Teaser" },
    { name: "intro", type: "text", title: "Intro" },
    {
      name: "body",
      type: "array",
      title: "Body",
      of: [{ type: "block" }],
    },
    { name: "heroImage", type: "image", title: "Hero Image" },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
    },
    { name: "event", type: "string", title: "Event" },
    { name: "city", type: "string", title: "City" },
    { name: "countryCode", type: "string", title: "Country Code" },
  ],
} as const;

export default article;
