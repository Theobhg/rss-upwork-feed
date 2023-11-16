import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import htmlReactParse from 'html-react-parser';
import { io } from 'socket.io-client';
import { RSSFeedItem } from '../interfaces/rss-feed-item';
import LoadSpinner from './LoadSpinner';

// Accessing environment variables from the.env file with Vite's import.meta.env;
const viteMetaEnv = import.meta.env;

const Feed: FC = () => {
   const [articles, setArticles] = useState<RSSFeedItem[]>([]);

   const [isLoading, setIsLoading] = useState<boolean>(true);

   const getArticles: () => Promise<void> = async () => {
      try {
         const response = await axios.get(viteMetaEnv.VITE_SERVER_URL);

         setArticles(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      const socket = io(viteMetaEnv.VITE_SERVER_URL);

      getArticles();

      socket.on('feed-update', (updatedItems: RSSFeedItem[]) => {
         setArticles(updatedItems);

         if (isLoading) {
            setIsLoading(false);
         }
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   return (
      <div>
         {isLoading ? (
            <LoadSpinner />
         ) : (
            <ul className="p-16">
               {articles.map(({ title, link, content, guid }) => (
                  <li key={guid} className="border border-gray-300 py-8 mb-8 rounded-lg shadow-sm">
                     <div className="md:container md:mx-auto mb-4">
                        <h1 className="text-2xl font-bold mb-2">{title}</h1>
                        <div>{htmlReactParse(content)}</div>
                        <div>
                           <a href={link} target="_blank">
                              link
                           </a>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default Feed;
