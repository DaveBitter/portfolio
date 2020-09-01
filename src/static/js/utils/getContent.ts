// @ts-ignore
import articles from '../../../../content/articles/articles.md';
// @ts-ignore
import copy from '../../../../content/general/copy.md';
// @ts-ignore
import dictionary from '../../../../content/general/dictionary.md';
// @ts-ignore
import headings from '../../../../content/general/headings.md';
// @ts-ignore
import tags from '../../../../content/general/tags.md';
// @ts-ignore
import quickBits from '../../../../content/articles/quickBits.md';
import { ArticleInterface, TagInterface } from './Interfaces/Interfaces';

// Next.js and Storybook json loaders don't seem to work the same. Import could therfor be parsed and unparsed JSON
const parseJSONMD = (_: string | object) => typeof _ === 'string' ? JSON.parse(_) : _
const convertToKeyValue = (arr: any) => arr.reduce((acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }), {});
const populateTags = (tagsToPopulate: string[] = []) => tagsToPopulate
    .map((tagToPopulate: string | TagInterface) =>
        parseJSONMD(tags).attributes.items
            .find((tag: TagInterface) => tag.key === tagToPopulate) || null)
    .filter((tag: TagInterface) => tag !== null)

// @ts-ignore
export const getArticles = () => parseJSONMD(articles).attributes.items.map((article: ArticleInterface) => ({ ...article, tags: populateTags(article.tags) }));

export const getCopy = () => convertToKeyValue(parseJSONMD(copy).attributes.items);

export const getDictionary = () => convertToKeyValue(parseJSONMD(dictionary).attributes.items)

export const getHeadings = () => convertToKeyValue(parseJSONMD(headings).attributes.items);

export const getTags = () => convertToKeyValue(parseJSONMD(tags).attributes.items);

// @ts-ignore
export const getQuickBits = () => parseJSONMD(quickBits).attributes.items.map((quickBit: ArticleInterface) => ({ ...quickBit, tags: populateTags(quickBit.tags) }));
