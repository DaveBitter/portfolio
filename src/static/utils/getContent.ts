// @ts-ignore
import { attributes as dictionary } from '../../../content/dictionary.md';

export const getDictionary = () => dictionary.labels.reduce((acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }), {});
