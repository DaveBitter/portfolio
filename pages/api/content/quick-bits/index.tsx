// Utils
import { getQuickBits } from 'static/js/utils/getContent';

export default async (req, res) => {
    const quickBits = getQuickBits();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ quickBits }));
};
