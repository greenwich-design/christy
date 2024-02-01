// webpack.mix.js
let mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const TerserPlugin = require('terser-webpack-plugin');
const cssnano = require('cssnano');

mix.js('src/js/app.js', 'assets')
    .js('src/js/splide-config.js', 'assets')
    .js('src/js/lazy-load.js', 'assets')
    .js('src/js/template-heritage.js', 'assets')
    .js('src/js/main-product.js', 'assets')
    .js('src/js/bundle-app.js', 'assets')
    .sass('src/scss/app.scss', 'assets')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.config.js'), cssnano()],
    })
    /*
.webpackConfig({
plugins: [
new TerserPlugin({
terserOptions: {
format: {
comments: false,
},
},
extractComments: false,
}),
],
});*/