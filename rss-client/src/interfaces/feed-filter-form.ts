type RSSUrlQueryPrefixes = 'q=' | 'contractor_tier=' | 'paging=' | 'sort=';

export interface IRSSUrlQuery {
   urlPrefix: RSSUrlQueryPrefixes;
   query: string;
}

export interface IFeedFilterFormData {
   [key: string]: IRSSUrlQuery; // Example: [experienceLevel]: {urlPrefix: 'contractor_tier=', query: '1'}
}

export interface IFeedFilterFormProps {
   onSubmit: (data: IFeedFilterFormData) => Promise<void>;
}
