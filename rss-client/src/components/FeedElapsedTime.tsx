import { intervalToDuration, formatDuration } from 'date-fns';

interface RSSFeedItemProps {
   date: string | Date;
}

const FeedElapsedTime = ({ date }: RSSFeedItemProps) => {
   const pubDate = typeof date === 'string' ? new Date(date) : date;

   const timeElapsed = intervalToDuration({ start: pubDate, end: new Date() });

   const renderTimeDifference = () => {
      return <p>{formatDuration(timeElapsed)}</p>;
   };

   return (
      <div
         className=" w-fit
      text-sm text-center text-gray-400 font-bold"
      >
         {renderTimeDifference()}
      </div>
   );
};

export default FeedElapsedTime;
