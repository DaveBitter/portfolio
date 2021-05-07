// Utils
import { NextApiRequest, NextApiResponse } from 'next';
import { getQuickBits } from 'static/js/utils/getContent';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const quickBits = getQuickBits();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ quickBits }));
};
