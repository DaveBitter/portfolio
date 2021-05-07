// Utils
import { getArticles } from 'static/js/utils/getContent';

export default async (req, res) => {
    const articles = getArticles();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ articles }));
};
