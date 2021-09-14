// Utils
import { NextApiRequest, NextApiResponse } from 'next';
import { getTalks } from 'static/js/utils/getContent';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const talks = getTalks();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ talks }));
};
