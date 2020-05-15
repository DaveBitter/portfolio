// Libs
import formatDate from './formatDate';

// Test constants
const mockDate = '2020-01-20T00:00:00.000Z'
const mockFormat = { day: 'numeric', month: 'long', year: 'numeric' };

// Test scenarios
describe('formatDate', () => {
    it(`should return 1/20/2020 for ${mockDate} without the mock format configuration`, () => {
        expect(formatDate(mockDate, {}, 'en')).toBe('1/20/2020');
    });

    it(`should return 20 for ${mockDate} with the mock format configuration`, () => {
        expect(formatDate(mockDate, mockFormat, 'en')).toBe('January 20, 2020');
    });
});
