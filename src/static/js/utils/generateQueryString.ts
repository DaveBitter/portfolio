const generateQueryString = (query: { [key: string]: string | string[] | number | undefined | null }) => encodeURI(Object.keys(query)
    .reduce((acc, cur, index) => query[cur] ? `${acc}${index === 0 ? '' : '&'}${cur}=${query[cur]}` : acc, '?'));

export default generateQueryString;