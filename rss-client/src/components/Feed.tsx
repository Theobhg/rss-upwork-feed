import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import { RSSFeedItem } from '../interfaces/rss-feed-item';

import FeedItem from './FeedItem';

const Feed: FC = () => {
   const [articles, setArticles] = useState<RSSFeedItem[]>([]);

   const getArticles: () => Promise<void> = async () => {
      try {
         const response = await axios.get('http://localhost:3333');

         setArticles(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      const socket = io('http://localhost:3333');
      getArticles();

      socket.on('feed-update', (updatedItems: RSSFeedItem[]) => {
         setArticles(updatedItems);
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   return (
      <div>
         <ul className="p-16">
            {articles.map(article => (
               <FeedItem article={article} key={article.guid} />
            ))}
         </ul>
      </div>
   );
};

export default Feed;
