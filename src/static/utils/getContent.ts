// @ts-ignore
import articles from '../../../content/articles/articles.md';
// @ts-ignore
import copy from '../../../content/general/copy.md';
// @ts-ignore
import dictionary from '../../../content/general/dictionary.md';
// @ts-ignore
import headings from '../../../content/general/headings.md';
// @ts-ignore
import quickBits from '../../../content/articles/quickBits.md';

// Next.js and Storybook json loaders don't seem to work the same. Import could therfor be parsed and unparsed JSON
const parseJSONMD = (_: string | object) => typeof _ === 'string' ? JSON.parse(_) : _
const convertToKeyValue = (arr: any) => arr.reduce((acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }), {});

export const getArticles = () => parseJSONMD(articles).attributes;

export const getCopy = () => convertToKeyValue(parseJSONMD(copy).attributes.items);

export const getDictionary = () => convertToKeyValue(parseJSONMD(dictionary).attributes.items)

export const getHeadings = () => convertToKeyValue(parseJSONMD(headings).attributes.items);

export const getQuickBits = () => parseJSONMD(quickBits).attributes;
