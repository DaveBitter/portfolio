// Libs
import ArticleElementEnricher from './ArticleElementEnricher';
import { getArticles } from './getContent';
import compileMarkdownToJSX from './compileMarkdownToJSX';
jest.mock('./ArticleElementEnricher');

// Test constants
const mockArticles = getArticles().items

const mockArticleElement = document.createElement('div');
mockArticleElement.innerHTML = compileMarkdownToJSX(mockArticles[0].body)

// Test scenarios
describe('ArticleElementEnricher', () => {
    it('should initialise class without throwing errors', () => {
        new ArticleElementEnricher(mockArticleElement, {});
        expect(ArticleElementEnricher).toHaveBeenCalledTimes(1);
    });
});
