// import { getArticles, getCopy, getDictionary, getEducation, getHeadings, getQuickBits, getTags, getWorkExperience } from "../getContent";

// const fetchFromLocalMarkdown = (path: string) => {
//     switch (path) {
//         case '/content/articles':
//             return { articles: getArticles() };
//         case '/content/quick-bits':
//             return { quickBits: getQuickBits() };
//         case '/content/tags':
//             return { tags: getTags() };
//         case '/content/ui':
//             return { dictionary: getDictionary(), copy: getCopy(), headings: getHeadings() };
//         case '/content/work-and-education':
//             return { workExperience: getWorkExperience(), education: getEducation() };
//         default:
//             return {};
//     }
// };

const fetchFromLocalMarkdown = (path: string) => {
    switch (path) {
        case '/content/articles':
            return { articles: [] };
        case '/content/quick-bits':
            return { quickBits: [] };
        case '/content/tags':
            return { tags: {} };
        case '/content/ui':
            return { dictionary: {}, copy: {}, headings: {} };
        case '/content/work-and-education':
            return { workExperience: [], education: [] };
        default:
            return {};
    }
};

let baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://davebsitter.com`;

export default async (path: string) => await fetch(`${baseUrl}/api${path}`).then((res) => res.json()).catch(() => fetchFromLocalMarkdown(path));
