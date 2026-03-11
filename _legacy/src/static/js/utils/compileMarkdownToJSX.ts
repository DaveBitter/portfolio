import marked from 'marked';

const compileMarkdownToJSX = (markdown: string = '') => marked(markdown.replace(/ __/g, '__'));

export default compileMarkdownToJSX;
