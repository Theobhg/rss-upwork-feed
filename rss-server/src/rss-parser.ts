import RSSParser from 'rss-parser';
import { RSSFeed, RSSFeedItem } from './interfaces/rss-feed';
import getNewFeedItems from './utils/feedControl';

const articles: RSSFeedItem[] = [];

const parser: RSSParser = new RSSParser();

const parse = async (url: string) => {
   try {
      const feed = (await parser.parseURL(url)) as RSSFeed;

      // Compare updated feed items list with previous articles list and check if they differ. If so returns the feed list with new items.
      const newArticles = getNewFeedItems(feed.items, articles);

      // If there are new items in the feed then update the articles list else do nothing
      if (newArticles.length > 0) {
         articles.length = 0;
         articles.push(...newArticles);
      }
   } catch (error) {
      console.error('Error parsing the RSS feed:', error);
   }
};

export { articles, parse };
