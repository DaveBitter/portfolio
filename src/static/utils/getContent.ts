// @ts-ignore
import dictionary from '../../../content/general/dictionary.md';
// @ts-ignore
import articles from '../../../content/articles/articles.md';

export const getDictionary = () => dictionary.attributes.items.reduce((acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }), {});

export const getArticles = () => articles.attributes;
