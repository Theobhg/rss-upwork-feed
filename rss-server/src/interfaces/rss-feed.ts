export interface RSSFeed {
  description: string;
  feedUrl: string;
  generator: string;
  image: RSSFeedImage;
  items: RSSFeedItem[];
  lastBuildDate: string;
  link: string;
  paginationLinks: RSSFeedPaginationLinks;
  title: string;
  webMaster: string;
}

export interface RSSFeedItem {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  'content:encoded': string;
  guid: string;
  categories: string[];
  isoDate: string;
  'content:encodedSnippet': string;
  'dc:creator': string;
}

interface RSSFeedImage {
  link: string;
  url: string;
  title: string;
}

interface RSSFeedPaginationLinks {
  self: string;
}
