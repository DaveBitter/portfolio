// Libs
import compileMarkdownToJSX from './compileMarkdownToJSX';

// Test constants
const mockMarkdown = `# Mock markdown`
// Test scenarios
describe('compileMarkdownToJSX', () => {
    it('should return formatted JSX for mock markdown', () => {
        expect(compileMarkdownToJSX(mockMarkdown).includes('<h1 id="mock-markdown">Mock markdown</h1>')).toBe(true);
    });
});
