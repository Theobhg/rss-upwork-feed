import RSSParser from 'rss-parser';
import { RSSFeed, RSSFeedItem } from './interfaces/rss-feed';
import { newFeedItems } from './utils/feedControl';

const articles: RSSFeedItem[] = [];

const parser: RSSParser = new RSSParser();

const parse = async (url: string) => {
   try {
      const feed = (await parser.parseURL(url)) as RSSFeed;

      feed.items = newFeedItems(feed.items, articles);
   } catch (error) {
      console.error('Error parsing the RSS feed:', error);
   }
};

export { articles, parse };
