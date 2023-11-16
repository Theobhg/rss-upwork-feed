import HTMLReactParser from 'html-react-parser';

import { RSSFeedItem } from '../interfaces/rss-feed-item';
import splitStringInHalf from '../utils/splitStringInHalf';

const FeedItem = ({ article }: { article: RSSFeedItem }) => {
   const { title, link, content } = article;

   // Splits the title into two hlaves to apply separate styling
   const splitTitle = splitStringInHalf(title, 'Upwork');

   return (
      <li className="border border-gray-300 py-8 mb-8 rounded-lg shadow-sm">
         <div className="md:container md:mx-auto mb-4">
            <h1 className="text-2xl font-bold mb-2">
               {HTMLReactParser(splitTitle.firstHalf)}
               <span className="text-2xl font-bold mb-2 text-primary">
                  {HTMLReactParser(splitTitle.secondHalf)}
               </span>
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
