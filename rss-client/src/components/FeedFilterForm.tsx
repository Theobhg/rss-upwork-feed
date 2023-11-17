import { useState } from 'react';

import { IFeedFilterFormData, IFeedFilterFormProps } from '../interfaces/feed-filter-form';

const FeedFilterForm = ({ onSubmit }: IFeedFilterFormProps) => {
   const [feedFilterFormData, setFeedFilterFormData] = useState<IFeedFilterFormData>({
      searchTitle: { query: '', urlPrefix: 'q=' },
      contractorTier: { query: '0', urlPrefix: 'contractor_tier=' },
      itemsPerPage: { query: '0%3B10', urlPrefix: 'paging=' },
      sortBy: { query: 'recency', urlPrefix: 'sort=' },
   });

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFeedFilterFormData(prevState => ({
         ...prevState,
         [name]: {
            ...prevState[name],
            query: value,
         },
      }));
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(feedFilterFormData);
   };

   return (
      <form
         className="mx-48 flex justify-start items-center content-center h-full"
         onSubmit={e => handleSubmit(e)}
      >
         <div className="h-11">
            {/* <label>
               Experience level:
               <input
                  className="p-2 rounded-md w-20 mx-6"
                  name="contractorTier"
                  type="checkbox"
                  value={feedFilterFormData.contractorTier.query}
                  onChange={e => handleInputChange(e)}
               />
               <input
                  className="p-2 rounded-md w-20 mx-6"
                  name="contractorTier"
                  type="checkbox"
                  value={feedFilterFormData.contractorTier.query}
                  onChange={e => handleInputChange(e)}
               />
            </label> */}

            <input
               className="h-full rounded-l-full pl-5"
               name="searchTitle"
               type="text"
               placeholder="search for..."
               value={feedFilterFormData.searchTitle.query}
               onChange={e => handleInputChange(e)}
            />
            <button
               className="bg-primary h-full px-6 text-white rounded-r-full shadow-md active:shadow-sm"
               title="submit"
               type="submit"
            >
               Search
            </button>
         </div>
      </form>
   );
};

export default FeedFilterForm;
