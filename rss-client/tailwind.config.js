/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#108A00', // Upwork Green
         },
      },
   },
   plugins: [],
};
