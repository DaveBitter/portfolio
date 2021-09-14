import { ArticleInterface, TalkInterface } from './Interfaces/Interfaces';

const convertTalkToArticleTeaser = ({ title, summary, slug, teaserCopy, teaserImage, date, tags }: TalkInterface): ArticleInterface => ({ title, slug, teaserCopy, teaserImage, date, tags, body: summary, intro: teaserCopy, as: '', href: '' });

export default convertTalkToArticleTeaser;