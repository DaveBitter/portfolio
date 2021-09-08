// Utils
import { NextApiRequest, NextApiResponse } from 'next';
import convertYoutubeDataToFridayTip from 'static/js/utils/convertYoutubeDataToFridayTip';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const baseURL = "https://www.googleapis.com/youtube/v3/";
    const playlistId = "AIzaSyA2cTY2EnBIr4iSGrIkCZAqzL85UDwhnqI";

    const { items } = await fetch(`${baseURL}playlistItems?maxResults=50&part=snippet,contentDetails&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`)
        .then(res => res.json())
        .catch(err => console.error(err));

    const fridayTips = items
        .filter(({ snippet }: any) => snippet.title !== 'Private video')
        .map(convertYoutubeDataToFridayTip);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ fridayTips }));
};
