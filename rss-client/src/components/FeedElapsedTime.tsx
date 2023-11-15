import { useEffect, useState } from 'react';

interface RSSFeedItemProps {
   date: string;
}

const FeedElapsedTime = ({ date }: RSSFeedItemProps) => {
   const pubDate = new Date(date);
   const [timeDifference, setTimeDifference] = useState({
      seconds: { value: 0, ceil: 59 },
      minutes: { value: 0, ceil: 59 },
      hours: { value: 0, ceil: 23 },
      days: { value: 0, ceil: 29 },
      months: { value: 0, ceil: 11 },
      years: { value: 0, ceil: 0 },
   });

   useEffect(() => {
      // Function to calculate the time difference in days, hours, minutes, and seconds
      const calculateTimeDifference = () => {
         const currentTime = new Date();
         const differenceInSeconds = Math.floor((currentTime.getTime() - pubDate.getTime()) / 1000);

         const seconds = differenceInSeconds % 60;
         const minutes = Math.floor((differenceInSeconds % 3600) / 60);
         const hours = Math.floor((differenceInSeconds % (24 * 3600)) / 3600);
         const days = Math.floor(differenceInSeconds / (24 * 3600));
         const months = Math.floor(differenceInSeconds / (30 * 24 * 3600));
         const years = Math.floor(differenceInSeconds / (12 * 30 * 24 * 3600));

         setTimeDifference({
            seconds: { value: seconds, ceil: 59 },
            minutes: { value: minutes, ceil: 59 },
            hours: { value: hours, ceil: 23 },
            days: { value: days, ceil: 29 },
            months: { value: months, ceil: 11 },
            years: { value: years, ceil: 0 },
         });
      };

      // Call the function initially
      calculateTimeDifference();

      // Update the time difference every second
      const intervalId = setInterval(calculateTimeDifference, 1000);

      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
   }, []);

   const renderTimeDifference = () => {
      if (timeDifference.years.value !== 0) {
         return (
            <p>
               {timeDifference.years.value} {'years ago'}
            </p>
         );
      } else if (timeDifference.months.value !== 0) {
         return (
            <p>
               {timeDifference.months.value} {'months ago'}
            </p>
         );
      } else if (timeDifference.days.value !== 0) {
         return (
            <p>
               {timeDifference.days.value} {'days ago'}
            </p>
         );
      } else if (timeDifference.hours.value !== 0) {
         return (
            <p>
               {timeDifference.hours.value} {'hours ago'}
            </p>
         );
      } else if (timeDifference.minutes.value !== 0) {
         return (
            <p>
               {timeDifference.minutes.value} {'minutes ago'}
            </p>
         );
      } else if (timeDifference.seconds.value !== 0) {
         return (
            <p>
               {timeDifference.seconds.value} {'seconds ago'}
            </p>
         );
      }
   };
   return (
      <div
         className="bg-gray-200 w-fit
      px-12 py-2 text-sm text-center text-black font-bold rounded-full my-5"
      >
         {renderTimeDifference()}
      </div>
   );
};

export default FeedElapsedTime;
