/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                glow: {
                    '0%, 100%': {
                        boxShadow: '0 0 0px rgba(255, 0, 0, 0)',
                    },
                    '50%': {
                        boxShadow: '0 0 15px 5px rgba(255, 0, 0, 0.6)',
                    },
                },
            },
            animation: {
                'glow': 'glow 2s infinite ease-in-out',
            },
        },
    },
    plugins: [],
}
