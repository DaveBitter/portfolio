// Utils
import { NextApiRequest, NextApiResponse } from 'next';
import { getFridayTips } from 'static/js/utils/getContent';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const fridayTips = getFridayTips();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ fridayTips }));
};
