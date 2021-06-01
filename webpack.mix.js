const mix = require('laravel-mix');

require('mix-tailwindcss');


mix.js('resources/js/auth.js', 'public/js/auth.js').
    sass('resources/sass/auth.scss', 'public/css/auth-style.css')
    .tailwind('./tailwind.config.js');