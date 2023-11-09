import RSSParser from 'rss-parser';
import { RSSFeed, RSSFeedItem } from './interfaces/rss-feed';

const articles: RSSFeedItem[] = [];

const parser: RSSParser = new RSSParser();

const parse = async (url: string) => {
  try {
    const feed = (await parser.parseURL(url)) as RSSFeed;

    articles.length = 0;
    feed.items.forEach((item: RSSFeedItem) => {
      articles.push(item);
    });
  } catch (error) {
    console.error('Error parsing the RSS feed:', error);
  }
};

export { articles, parse };
