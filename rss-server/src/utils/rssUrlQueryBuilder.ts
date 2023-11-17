import { IFeedFilterFormData } from '../interfaces/rss-filter-form-data';

export const buildRssUrlFilterQueries = (formData: IFeedFilterFormData): string => {
   if (formData) {
      const formDataValues = Object.values(formData);
      return formDataValues.map(value => `${value.urlPrefix}${value.query}`).join('&');
   } else {
      return '';
   }
};
