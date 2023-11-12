import HTMLReactParser from 'html-react-parser';

import { RSSFeedItem } from '../interfaces/rss-feed-item';

const FeedItem = ({ article }: { article: RSSFeedItem }) => {
   const { title, link, content, guid } = article;

   // Spliting the title into two parts to apply separate styling (green Upwork and black title)
   const upworkTitle = title.slice(-'Upwork'.length);
   const normalTitle = title.slice(0, -'Upwork'.length);

   return (
      <li key={guid} className="border border-gray-300 py-8 mb-8 rounded-lg shadow-sm">
         <div className="md:container md:mx-auto mb-4">
            <h1>{title}</h1>
            <h1 className="text-2xl font-bold mb-2">
               {normalTitle}
               <span className="text-2xl font-bold mb-2 text-primary">{upworkTitle}</span>
            </h1>
            <div>{HTMLReactParser(content)}</div>
            <div>
               <a href={link} target="_blank">
                  link
               </a>
            </div>
         </div>
      </li>
   );
};

export default FeedItem;
