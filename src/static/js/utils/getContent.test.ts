// Libs
import { getArticles, getCopy, getDictionary, getEducation, getHeadings, getQuickBits, getWorkExperience } from './getContent';

// Test constants

// Test scenarios
describe('getContent', () => {
    it('should return array with type object for getArticles', () => {
        expect(typeof getArticles()).toBe('object');
    });

    it('should return article in items property array', () => {
        const [article] = getArticles()

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
        const [quickBit] = getQuickBits()

        expect(quickBit).toBeDefined();
    });

    it('should return workExperience in items property array', () => {
        const [workExperience] = getWorkExperience()

        expect(workExperience).toBeDefined();
    });

    it('should return education in items property array', () => {
        const [education] = getEducation()

        expect(education).toBeDefined();
    });
});
