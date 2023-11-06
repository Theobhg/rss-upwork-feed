import RSSParser from 'rss-parser';
import { RSSFeed, RSSFeedItem } from './interfaces/rss-feed';

const articles: RSSFeedItem[] = [];

const parser: RSSParser = new RSSParser();

const redditFeedUrl = 'https://www.reddit.com/.rss';
const netflixTechBlogUrl = 'https://netflixtechblog.com/feed';
const upworkFeedUrl = 'https://www.upwork.com/ab/feed/jobs/rss?q=shopify';

const parse = async (url: string) => {
  try {
    const feed = (await parser.parseURL(url)) as RSSFeed;
    console.log(feed.title);

    articles.length = 0;
    feed.items.forEach((item: RSSFeedItem) => {
      articles.push(item);
    });
  } catch (error) {
    console.error('Error parsing the RSS feed:', error);
  }
};

setInterval(() => {
  parse(netflixTechBlogUrl);
}, 10000);

export default articles;
