// Libs
import generateQueryString from './generateQueryString';

// Test constants
const mockQuery = {
    a: 'first',
    b: 'second',
    c: 'third'
};

// Test scenarios
describe('generateQueryString', () => {
    it(`should return the correct query string for the test query`, () => {
        expect(generateQueryString(mockQuery)).toBe('?a=first&b=second&c=third');
    });

    it(`should not add a key for falsey values`, () => {
        expect(generateQueryString({ ...mockQuery, d: undefined })).toBe('?a=first&b=second&c=third');
    });
});
