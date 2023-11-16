import { useState } from 'react';

interface IFormProps {
   onSubmit: (data: FormData) => void;
   onClear: () => void;
}

interface FormData {
   wordSearch: string; //&q={wordSearch}
   // experienceLevel?: [entry: 1, intermediate: 2, expert: 3]; //&contractor_tier={experienceLevel}
}

// https://www.upwork.com/ab/feed/jobs/rss?q=shopify&sort=recency&paging=0%3B10
// https://www.upwork.com/ab/feed/jobs/rss?q=shopify&sort=recency&contractor_tier=1&paging=0%3B10

const FilterForm = ({ onSubmit, onClear }: IFormProps) => {
   const [formData, setFormData] = useState<FormData>({
      wordSearch: '',
      // experienceLevel: [false, false, false],
   });

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(formData);
   };

   const handleClear = () => {
      onClear();
      setFormData({ wordSearch: '' });
   };
   return (
      <form className="flex-1">
         <label>
            <input name="search-word" type="text" placeholder="search" />
         </label>
         <button
            className="bg-primary py-3 px-8 text-white rounded-full shadow-md active:shadow-sm"
            title="submit"
            type="submit"
         >
            Search
         </button>
      </form>
   );
};

export default FilterForm;
