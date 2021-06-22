import { getArticles, getCopy, getDictionary, getEducation, getFridayTips, getHeadings, getQuickBits, getTags, getWorkExperience } from "../getContent";

const fetchFromLocalMarkdown = (path: string) => {
    switch (path) {
        case '/content/articles':
            return { articles: getArticles() };
        case '/content/quick-bits':
            return { quickBits: getQuickBits() };
        case '/content/friday-tips':
            return { fridayTips: getFridayTips() };
        case '/content/tags':
            return { tags: getTags() };
        case '/content/ui':
            return { dictionary: getDictionary(), copy: getCopy(), headings: getHeadings() };
        case '/content/work-and-education':
            return { workExperience: getWorkExperience(), education: getEducation() };
        default:
            return {};
    }
};

let baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://davebitter.com`;

export default async (path: string) => await fetch(`${baseUrl}/api${path}`).then((res) => res.json()).catch(() => fetchFromLocalMarkdown(path));
