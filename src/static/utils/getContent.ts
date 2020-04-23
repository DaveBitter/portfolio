// @ts-ignore
import { attributes as dictionary } from '../../../content/general/dictionary.md';

export const getDictionary = () => dictionary.items.reduce((acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }), {});
