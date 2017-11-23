let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/angular/main.js', 'public/js').
    js(['resources/assets/js/angular/controllers/navController.js',
        'resources/assets/js/angular/controllers/appController.js',
        'resources/assets/js/angular/controllers/dialogueController.js',
        'resources/assets/js/angular/controllers/intentController.js',
        'resources/assets/js/angular/controllers/intentTrainController.js',
    ], 'public/js/controllers.js').
    js('resources/assets/js/app.js', 'public/js').
    js(['resources/assets/js/dashboard.js'],'public/js').
    js(['resources/assets/js/diagram.js'],'public/js').
    sass('resources/assets/sass/app.scss', 'public/css');
