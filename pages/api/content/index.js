// Utils
import { getDictionary, getCopy, getHeadings } from '../../../src/static/js/utils/getContent';

export default async (req, res) => {
    const dictionary = getDictionary();
    const copy = getCopy();
    const headings = getHeadings();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ dictionary, copy, headings }));
};
