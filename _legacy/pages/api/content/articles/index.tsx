// Utils
import { NextApiRequest, NextApiResponse } from 'next';
import { getArticles } from '../../../../src/static/js/utils/getContent';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const articles = getArticles();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ articles }));
};
