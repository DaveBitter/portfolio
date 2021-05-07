// Utils
import { getTags } from '../../../../src/static/js/utils/getContent';

export default async (req, res) => {
    const tags = getTags();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ tags }));
};
