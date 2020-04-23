// Libs
import { getDictionary, getArticles } from './getContent';

// Test constants

// Test scenarios
describe('getContent', () => {
    it('should return object for getDictionary', () => {
        expect(typeof getDictionary()).toBe('object');
    });

    it(`should return mapped object with type object with key 'foo' to be 'bar' for getDictionary`, () => {
        expect(getDictionary().foo).toBe('bar');
    });

    it('should return array with type object for getArticles', () => {
        expect(typeof getArticles()).toBe('object');
    });

    it('should return article in items property array', () => {
        const [article] = getArticles().items

        expect(article).toBeDefined();
    });
});
