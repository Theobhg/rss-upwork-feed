import { RSSFeedItem } from '../interfaces/rss-feed';

const getFeedItemsGuidSet = (feedItems: RSSFeedItem[]): Set<string> => {
   return new Set<string>(feedItems.map(feedItem => feedItem.guid));
};

const isFeedItemsChanged = (
   updatedFeedItems: RSSFeedItem[],
   previousFeedItemsGuidsSet: Set<string>
): boolean => {
   return updatedFeedItems.some(
      updatedFeedItem => !previousFeedItemsGuidsSet.has(updatedFeedItem.guid)
   );
};

const isFeedItemNew = (
   updatedFeedItem: RSSFeedItem,
   previousFeedItemsGuidsSet: Set<string>
): boolean => {
   return !previousFeedItemsGuidsSet.has(updatedFeedItem.guid);
};

const getNewFeedItems = (updatedFeedItems: RSSFeedItem[], previousFeedItems: RSSFeedItem[]) => {
   const previousFeedItemsGuidsSet = getFeedItemsGuidSet(previousFeedItems);

   if (isFeedItemsChanged(updatedFeedItems, previousFeedItemsGuidsSet)) {
      updatedFeedItems.forEach(updatedFeedItem => {
         if (isFeedItemNew(updatedFeedItem, previousFeedItemsGuidsSet)) {
            updatedFeedItem.isNew = true;
         } else {
            updatedFeedItem.isNew = false;
         }
      });
      return updatedFeedItems;
   }
   return [];
};

export default getNewFeedItems;
