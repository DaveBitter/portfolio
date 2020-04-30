// Libs
import { getArticles, getCopy, getDictionary, getHeadings, getQuickBits } from './getContent';

// Test constants

// Test scenarios
describe('getContent', () => {
    it('should return array with type object for getArticles', () => {
        expect(typeof getArticles()).toBe('object');
    });

    it('should return article in items property array', () => {
        const [article] = getArticles().items

        expect(article).toBeDefined();
    });

    it('should return object for getCopy', () => {
        expect(typeof getCopy()).toBe('object');
    });

    it(`should return mapped object with type object with key 'foo' to be 'bar' for getCopy`, () => {
        expect(getCopy().foo).toBe('bar');
    });

    it('should return object for getDictionary', () => {
        expect(typeof getDictionary()).toBe('object');
    });

    it(`should return mapped object with type object with key 'foo' to be 'bar' for getDictionary`, () => {
        expect(getDictionary().foo).toBe('bar');
    });

    it('should return object for getHeadings', () => {
        expect(typeof getHeadings()).toBe('object');
    });

    it(`should return mapped object with type object with key 'foo' to be 'bar' for getHeadings`, () => {
        expect(getHeadings().foo).toBe('bar');
    });

    it('should return array with type object for getQuickBits', () => {
        expect(typeof getQuickBits()).toBe('object');
    });

    it('should return quick bit in items property array', () => {
        const [quickBit] = getQuickBits().items

        expect(quickBit).toBeDefined();
    });
});
