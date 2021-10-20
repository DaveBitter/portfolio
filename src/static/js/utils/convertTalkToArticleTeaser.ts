import { ArticleInterface, TalkInterface } from './Interfaces/Interfaces';

const convertTalkToArticleTeaser = ({ title, summary, slug, teaserCopy, teaserImage, date, tags, event = 'meetup', city, countryCode, type }: TalkInterface): ArticleInterface => ({ title, slug, teaserCopy, teaserImage, date, tags, event, city, countryCode, type, body: summary, intro: teaserCopy, as: '', href: '' });

export default convertTalkToArticleTeaser;