const convertYoutubeDataToFridayTip = ({ contentDetails, snippet }: any) => ({
    body: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${snippet.resourceId.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    date: contentDetails.videoPublishedAt,
    slug: snippet.title.split('|')[0].trim().replace(/\s+/g, '-').toLowerCase(),
    tags: [],
    intro: snippet.description
        .replace(': Dave Bitter, front-end developer at Frontmen, shows', ', I show'),
    teaserCopy: snippet.description
        .replace(': Dave Bitter, front-end developer at Frontmen, shows', ', I show'),
    teaserImage: '/img/friday-tips.jpg',
    title: snippet.title.replace('#', '')
});

export default convertYoutubeDataToFridayTip;