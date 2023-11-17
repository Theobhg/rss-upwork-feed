import HTMLReactParser from 'html-react-parser';

import { IFeedItem } from '../interfaces/feed-item';

import sliceSubstringBetweenStartAndEnd from '../utils/sliceSubstringBetweenStartAndEnd';

const FeedItem = ({ article }: { article: IFeedItem }) => {
   const { title, link, content, guid } = article;

   // Spliting the title into two parts to apply separate styling (green Upwork and black title)
   const upworkTitle = title.slice(-'Upwork'.length);
   const normalTitle = title.slice(0, -'Upwork'.length);

   // Extrating anchor tag element from content
   /* Method 1: Targets especifically the last portion of the ancor element including the title "click to apply" and 
   works it's way back to the anchor's opening tag */
   const contentAnchorElement = sliceSubstringBetweenStartAndEnd(
      content,
      '<a href=',
      '>click to apply</a>'
   );
   /* Method 2: Simpler approach but if content contains other anchor tags, it will target the first one in ascending 
   index order. Plus it assumes that the "click to apply" anchor element spans to the last index of the content */
   // const contentAnchorElementIndexStart = content.indexOf('<a href=');
   // const contentAnchorElement = content.slice(contentAnchorElementIndexStart);

   // Removing anchor element from content
   const updatetedContent = content.replace(contentAnchorElement, '');

   return (
      <li key={guid} className="border border-gray-300 py-8 mb-8 rounded-lg shadow-sm">
         <div className="md:container md:mx-auto mb-4">
            <span className="flex">
               <h1 className="text-2xl font-bold mb-2">{normalTitle}</h1>
               <h1 className="text-2xl font-bold mb-2 text-primary">&nbsp;{upworkTitle}</h1>
            </span>
            <div>{HTMLReactParser(updatetedContent)}</div>
            <div className="mt-5">
               <a
                  href={link}
                  target="_blank"
                  className="hover:underline underline-offset-4 text-primary"
               >
                  See Project
               </a>
            </div>
         </div>
      </li>
   );
};

export default FeedItem;
