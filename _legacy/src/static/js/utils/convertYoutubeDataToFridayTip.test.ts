// Libs
import convertYoutubeDataToFridayTip from './convertYoutubeDataToFridayTip';

// Test constants
const mockYoutubeVideo = {
    kind: "youtube#playlistItem",
    etag: "u81FdtRUw9htF4plwO539LDQJL4",
    id: "UExzRVM2NmxnY0tIRDlvUm55TjNQRXZ5VGpXWEpGNElnVC41NkI0NEY2RDEwNTU3Q0M2",
    snippet: {
        publishedAt: "2021-06-10T20:45:32Z",
        channelId: "UCNhy3hGzwMfbtX3Ei8Htcpg",
        title: "GitHub profile README | Friday Tips #0",
        description: "In this first episode of Friday Tips: Dave Bitter, front-end developer at Frontmen, shows you how to create a GitHub Profile README to give personality to your GitHub profile.",
        thumbnails: {
            default: {
                url: "https://i.ytimg.com/vi/ewtT4NJX6NA/default.jpg",
                width: 120,
                height: 90
            },
            medium: {
                url: "https://i.ytimg.com/vi/ewtT4NJX6NA/mqdefault.jpg",
                width: 320,
                height: 180
            },
            high: {
                url: "https://i.ytimg.com/vi/ewtT4NJX6NA/hqdefault.jpg",
                width: 480,
                height: 360
            }
        },
        channelTitle: "Frontmen - Frontend Experts",
        playlistId: "PLsES66lgcKHD9oRnyN3PEvyTjWXJF4IgT",
        position: 0,
        resourceId: {
            kind: "youtube#video",
            videoId: "ewtT4NJX6NA"
        },
        videoOwnerChannelTitle: "Frontmen - Frontend Experts",
        videoOwnerChannelId: "UCNhy3hGzwMfbtX3Ei8Htcpg"
    },
    contentDetails: {
        videoId: "ewtT4NJX6NA",
        videoPublishedAt: "2021-06-11T10:00:31Z"
    }
};

const mockFormattedFridayTip = {
    body: "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ewtT4NJX6NA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
    date: "2021-06-11T10:00:31Z",
    slug: "github-profile-readme",
    tags: [],
    intro: "In this first episode of Friday Tips, I show you how to create a GitHub Profile README to give personality to your GitHub profile.",
    teaserCopy: "In this first episode of Friday Tips, I show you how to create a GitHub Profile README to give personality to your GitHub profile.",
    teaserImage: "/img/friday-tips.jpg",
    title: "GitHub profile README | Friday Tips 0"
};

// Test scenarios
describe('convertYoutubeDataToFridayTip', () => {
    it(`should return the embed iframe as the friday tip body`, () => {
        expect(convertYoutubeDataToFridayTip(mockYoutubeVideo).body).toBe(mockFormattedFridayTip.body);
    });

    it(`should return the publish date as the friday tip date`, () => {
        expect(convertYoutubeDataToFridayTip(mockYoutubeVideo).date).toBe(mockFormattedFridayTip.date);
    });

    it(`should return the formatted title as the friday tip slug`, () => {
        expect(convertYoutubeDataToFridayTip(mockYoutubeVideo).slug).toBe(mockFormattedFridayTip.slug);
    });

    it(`should return an empty array of tags as the friday tip tags`, () => {
        expect(JSON.stringify(convertYoutubeDataToFridayTip(mockYoutubeVideo).tags)).toBe('[]');
    });

    it(`should return the formatted description as the friday tip intro`, () => {
        expect(convertYoutubeDataToFridayTip(mockYoutubeVideo).intro).toBe(mockFormattedFridayTip.intro);
    });

    it(`should return the formatted description as the friday tip teaserCopy`, () => {
        expect(convertYoutubeDataToFridayTip(mockYoutubeVideo).teaserCopy).toBe(mockFormattedFridayTip.teaserCopy);
    });

    it(`should return the default friday tips poster as the friday tip teaserImage`, () => {
        expect(convertYoutubeDataToFridayTip(mockYoutubeVideo).teaserImage).toBe(mockFormattedFridayTip.teaserImage);
    });

    it(`should return the formatted title as the friday tip title`, () => {
        expect(convertYoutubeDataToFridayTip(mockYoutubeVideo).title).toBe(mockFormattedFridayTip.title);
    });
});
