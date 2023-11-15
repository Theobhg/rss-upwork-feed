import { useState } from 'react';

interface IFormProps {
   onSubmit: (data: FormData) => void;
   onClear: () => void;
}

interface FormData {
   wordSearch: string;
   experienceLevel: [entry: boolean, intermediate: boolean, expert: boolean];
}

const FilterForm = ({ onSubmit, onClear }: IFormProps) => {
   const [formData, setFormData] = useState<FormData>({
      wordSearch: '',
      experienceLevel: [false, false, false],
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
      setFormData({ wordSearch: '', experienceLevel: [false, false, false] });
   };
   return <form action=""></form>;
};

export default FilterForm;
