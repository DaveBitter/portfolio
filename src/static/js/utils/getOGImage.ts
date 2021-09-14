import fs from 'fs';

import query from './api/query';
import generateQueryString from './generateQueryString';
import { OGImageRequestInterface } from "./Interfaces/Interfaces";

const getOGImage = async (path: string, { title = 'davebitter.com', date, image }: OGImageRequestInterface) => {
    if (process.env.NODE_ENV === 'development') {
        return path;
    }

    const ogImageDir = './public/img/_generated';
    const imagePath = `${ogImageDir}${path}.jpeg`;

    try {
        if (fs.existsSync(imagePath)) {
            return `/img/_generated${path}.jpeg`;
        }
    } catch (err) {
        console.error(err);
        return image;
    }

    const { buffer } = await query(`/og/image${generateQueryString({ title, date, image })}`);

    if (buffer) {
        let base64data = buffer.toString('base64');

        fs.mkdirSync(ogImageDir, { recursive: true });
        fs.writeFileSync(imagePath, base64data, 'base64');

        return `/img/_generated${path}.jpeg`;
    } else {
        return image;
    }
};

export default getOGImage;