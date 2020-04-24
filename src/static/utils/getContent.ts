// @ts-ignore
import dictionary from '../../../content/general/dictionary.md';
// @ts-ignore
import articles from '../../../content/articles/articles.md';

// Next.js and Storybook json loaders don't seem to work the same. Import could therfor be parsed and unparsed JSON
const parseJSONMD = (_: string | object) => typeof _ === 'string' ? JSON.parse(_) : _

export const getDictionary = () => parseJSONMD(dictionary).attributes.items.reduce((acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }), {});

export const getArticles = () => parseJSONMD(articles).attributes;
