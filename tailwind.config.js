const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
            rotate: {
                moins90: "-90deg",
            },
            margin: {
                moins4: "-4rem",
            },
            zIndex: {
                1: "1",
                moins1: "-1",
            },
            width: {
                125: "12.5%",
                150: "15%",
                160: "16%",
                175: "17.5%",
                225: "22.5%",
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
