/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'mlb-blue': '#002D72',
                'mlb-red': '#D50032',
                'mlb-light-blue': '#005A9C',
                'mlb-gray': '#666666',
                'mlb-light-gray': '#F5F5F5'
            },
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif'],
            }
        },
    },
    plugins: [],
}