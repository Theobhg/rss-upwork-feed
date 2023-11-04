import RSSParser from 'rss-parser';
import { articles } from './articleData';

// const redditFeedUrl = 'https://www.reddit.com/.rss';
const netflixTechBlogUrl = 'https://netflixtechblog.com/feed';

const parser: RSSParser = new RSSParser();

export const parse = async (url: string) => {
  const feed = await parser.parseURL(url);

  feed.items.forEach(item => {
    articles.push({ item });
  });
};

parse(netflixTechBlogUrl);
