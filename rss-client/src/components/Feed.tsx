import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import htmlReactParse from 'html-react-parser';
import { RSSFeedItem } from '../interfaces/rss-feed-item';

const Feed: FC = () => {
  const [articles, setArticles] = useState<RSSFeedItem[]>([]);

  console.log(articles);
  const getArticles: () => Promise<void> = async () => {
    try {
      const response = await axios.get('http://localhost:3333');

      setArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <ul>
        {articles.map(({ title, link, content, guid }) => (
          <li key={guid}>
            <div className="md:container md:mx-auto mb-4 ">
              <h1 className="text-xl font-bold">{title}</h1>
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
    </div>
  );
};

export default Feed;
