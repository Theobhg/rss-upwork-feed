import { useState, useEffect, FC } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

import { IFeedItem } from '../interfaces/feed-item';
import { IFeedFilterFormData } from '../interfaces/feed-filter-form';

import LoadSpinner from './LoadSpinner';
import FeedItem from './FeedItem';
import FeedFilterForm from './FeedFilterForm';

// Accessing environment variables from the.env file with Vite's import.meta.env;
const viteMetaEnv = import.meta.env;

const Feed: FC = () => {
   const [articles, setArticles] = useState<IFeedItem[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const filterArticles = async (formData: IFeedFilterFormData): Promise<void> => {
      setIsLoading(true);
      try {
         await axios.post(`${viteMetaEnv.VITE_SERVER_URL}/rss-filter`, formData, {
            headers: { 'Content-Type': 'application/json' },
         });
      } catch (error) {
         console.log(error);
      }
   };

   const getArticles = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get(`${viteMetaEnv.VITE_SERVER_URL}`);

         setArticles(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      const socket = io(viteMetaEnv.VITE_SERVER_URL);

      getArticles();

      socket.on('feed-update', (updatedItems: IFeedItem[]) => {
         setArticles(updatedItems);
         setIsLoading(false);
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   return (
      <div>
         <div className="sticky top-0 bg-slate-300 h-36 w-full">
            {<FeedFilterForm onSubmit={filterArticles} />}
         </div>
         {isLoading ? (
            <LoadSpinner />
         ) : (
            <>
               <ul className="p-16">
                  {articles.map(article => (
                     <FeedItem article={article} key={article.guid} />
                  ))}
               </ul>
            </>
         )}
      </div>
   );
};

export default Feed;
