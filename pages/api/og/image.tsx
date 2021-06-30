// Utils
import { NextApiRequest, NextApiResponse } from 'next';
import generateQueryString from '../../../src/static/js/utils/generateQueryString';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { title, date, image } = req.query;
    const { buffer } = await fetch(`https://davebitter.com/.netlify/functions/og-image${generateQueryString({ title, date, image })}`).then(res => res.json());

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ buffer }));
};
