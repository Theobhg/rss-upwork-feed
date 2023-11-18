import { RSSFeedItem } from '../interfaces/rss-feed';

const getFeedItemsGuidsSet = (feedItems: RSSFeedItem[]) => {
   return new Set<string>(feedItems.map(feedItem => feedItem.guid));
};

const isFeedItemsChanged = (
   updatedFeedItems: RSSFeedItem[],
   previousFeedItemsGuidsSet: Set<string>
) => {
   return updatedFeedItems.some(updtFeedItem => !previousFeedItemsGuidsSet.has(updtFeedItem.guid));
};

const newFeedItems = (updatedFeedItems: RSSFeedItem[], previousFeedItems: RSSFeedItem[]) => {
   const previousFeedItemsGuidsSet = getFeedItemsGuidsSet(previousFeedItems);

   if (isFeedItemsChanged(updatedFeedItems, previousFeedItemsGuidsSet)) {
      updatedFeedItems.forEach(updtFeedItem => {
         if (!previousFeedItemsGuidsSet.has(updtFeedItem.guid)) {
            updtFeedItem.isNew = true;
         } else {
            updtFeedItem.isNew = false;
         }
      });

      previousFeedItems.length = 0;
      updatedFeedItems.forEach(updtFeedItem => {
         previousFeedItems.push(updtFeedItem);
      });
   }
};

export { getFeedItemsGuidsSet, isFeedItemsChanged, newFeedItems };
