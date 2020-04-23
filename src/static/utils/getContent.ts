// @ts-ignore
import { attributes as dictionary } from '../../../content/general/dictionary.md';
// @ts-ignore
import { attributes as articles } from '../../../content/articles/articles.md';

export const getDictionary = () => dictionary.items.reduce((acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }), {});

export const getArticles = () => articles;
