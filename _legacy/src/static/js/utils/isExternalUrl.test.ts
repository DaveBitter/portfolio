// Libs
import isExternalUrl from './isExternalUrl';

// Test constants
const url = 'url.com';

// Test scenarios
describe('isExternalUrl', () => {
    it('should return true if url starts with http ', () => {
        expect(isExternalUrl(`http://${url}`)).toBe(true);
    });

    it('should return true if url starts with https ', () => {
        expect(isExternalUrl(`https://${url}`)).toBe(true);
    });

    it('should return true if url does not start with http or https ', () => {
        expect(isExternalUrl(url)).toBe(true);
    });

    it('should return false if url starts with / ', () => {
        expect(isExternalUrl(`/${url}`)).toBe(true);
    });
});
