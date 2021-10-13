// Libs
import convertTalkToArticleTeaser from "./convertTalkToArticleTeaser";
import { TalkInterface } from "./Interfaces/Interfaces";

// Test constants
const mockTalk: TalkInterface = {
    body: 'This is a mock talk',
    title: 'Mock talk',
    teaserCopy: 'This is a mock talk',
    teaserImage: 'This is a mock talk',
    slug: 'mock-talk',
    tags: [],
    date: '2020-01-20T00:00:00.000Z',
    type: 'meetup',
    city: 'Amsterdam',
    countryCode: 'NL'
};

const mockFormattedTalk = {
    slug: 'mock-talk',
    date: '2020-01-20T00:00:00.000Z',
    title: 'Mock talk',
    teaserCopy: 'This is a mock talk',
    teaserImage: 'This is a mock talk',
    tags: []
};

// Test scenarios
describe('convertTalkToArticleTeaser', () => {
    it(`should return the publish date as the friday tip date`, () => {
        expect(convertTalkToArticleTeaser(mockTalk).date).toBe(mockFormattedTalk.date);
    });

    it(`should return the formatted title as the friday tip slug`, () => {
        expect(convertTalkToArticleTeaser(mockTalk).slug).toBe(mockFormattedTalk.slug);
    });

    it(`should return an empty array of tags as the friday tip tags`, () => {
        expect(JSON.stringify(convertTalkToArticleTeaser(mockTalk).tags)).toBe('[]');
    });

    it(`should return the formatted description as the friday tip teaserCopy`, () => {
        expect(convertTalkToArticleTeaser(mockTalk).teaserCopy).toBe(mockFormattedTalk.teaserCopy);
    });

    it(`should return the default friday tips poster as the friday tip teaserImage`, () => {
        expect(convertTalkToArticleTeaser(mockTalk).teaserImage).toBe(mockFormattedTalk.teaserImage);
    });

    it(`should return the formatted title as the friday tip title`, () => {
        expect(convertTalkToArticleTeaser(mockTalk).title).toBe(mockFormattedTalk.title);
    });
});
