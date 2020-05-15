import marked from 'marked';

export default (markdown: string) => marked(markdown.replace(/ __/g, '__'));
