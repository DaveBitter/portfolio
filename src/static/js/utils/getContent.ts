import articles from '../../../../content/articles/articles.md';
import copy from '../../../../content/general/copy.md';
import dictionary from '../../../../content/general/dictionary.md';
import headings from '../../../../content/general/headings.md';
import tags from '../../../../content/general/tags.md';
import quickBits from '../../../../content/articles/quickBits.md';
import workExperience from '../../../../content/resume/workExperience.md';
import education from '../../../../content/resume/education.md';
import talks from '../../../../content/speaking/talks.md';
import { ArticleInterface, TagInterface, TalkInterface } from './Interfaces/Interfaces';

// Next.js and Storybook json loaders don't seem to work the same. Import could therfor be parsed and unparsed JSON
const parseJSONMD = (_: string | object) => typeof _ === 'string' ? JSON.parse(_) : _
const convertToKeyValue = (arr: any) => arr.reduce((acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }), {});
const populateTags = (tagsToPopulate: TagInterface[] = []) => tagsToPopulate
    .map((tagToPopulate: TagInterface | string) =>
        parseJSONMD(tags).attributes.items
            .find((tag: TagInterface) => tag.key === tagToPopulate) || null)
    .filter((tag: TagInterface) => tag !== null)

export const getArticles = () => parseJSONMD(articles).attributes.items.map((article: ArticleInterface) => ({ ...article, tags: populateTags(article.tags) }));

export const getCopy = () => convertToKeyValue(parseJSONMD(copy).attributes.items);

export const getDictionary = () => convertToKeyValue(parseJSONMD(dictionary).attributes.items)

export const getHeadings = () => convertToKeyValue(parseJSONMD(headings).attributes.items);

export const getTags = () => convertToKeyValue(parseJSONMD(tags).attributes.items);

export const getQuickBits = () => parseJSONMD(quickBits).attributes.items.map((quickBit: ArticleInterface) => ({ ...quickBit, tags: populateTags(quickBit.tags) }));

export const getFridayTips = () => [];

export const getWorkExperience = () => parseJSONMD(workExperience).attributes.items;

export const getEducation = () => parseJSONMD(education).attributes.items;

export const getTalks = () => parseJSONMD(talks).attributes.items.map((talk: TalkInterface) => ({ ...talk, tags: populateTags(talk.tags) }));
