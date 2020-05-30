/**
 * Gulpfile - Gulp-dev theme
 * (Mimi Maldonado)
 */

/**
 * Table of Content
 * 
 * 1) Variable Settings
 * 2) Task Settings
 * 3) Default Settings
 */

/**
 * ======= 1) Variable Setting ============================ 
 */
 // ** Gulp Dependencies
 const gulp = require("gulp"),
 order = require("gulp-order"),
 sass = require("gulp-sass"),
 sourcemaps = require('gulp-sourcemaps'),
 postcss = require('gulp-postcss'),
 cleanCSS = require("gulp-clean-css"),
 image = require('gulp-image'),
 jshint = require('gulp-jshint'),
 browserSync = require("browser-sync").create(),
 header = require("gulp-header"),
 rename = require("gulp-rename"),	
 // Prepare and optimize code etc
 autoprefixer = require('autoprefixer'),
// **No longer use uglify (and pump combination) due to no compatibility for (latest) ES6.
// **instead we use the latest version of gulp-minify
// let uglify = require("gulp-uglify");
// let pump = require("pump");
 jsminify = require("gulp-minify");
 concat = require("gulp-concat");
 imagemin = require("gulp-imagemin");
 sequence = require("run-sequence");
 php = require("gulp-connect-php");


// **WP specific theme folder
let themename = 'undercovers', // ** CHANGE THIS VAR TO YOUR THEME
 // Name of working theme folder
 theme_dir = '../' + themename + '/',
 theme_assets_dir = theme_dir + 'assets/';
 scss = theme_assets_dir + 'scss/',
 css = theme_assets_dir + 'css/',
 js = theme_assets_dir + 'js/',
 img = theme_assets_dir + 'img/',
 vendor = theme_assets_dir + 'vendor/',
 languages = theme_dir + 'languages/',
 theme_proxy = 'http://localhost:90/' + themename; // ** CHANGE THIS VAR TO YOUR server


/**
* ======= 2) Task Setting ============================ 
*/

/**
* Header banner auto-insertion
* (It does generate each time you run and does not override,
* so You need to run it at the very end at the production build.)
*/
// Set the banner content using data from package.json
let pkg = require("./package.json");
let banner = [
 "/**",
 " * <%= pkg.name %> -  <%= pkg.description %>",
 " * @version v<%= pkg.version %>",
 " * @copyright " + new Date().getFullYear() + "<%= pkg.author %>",
 " * @link (<%= pkg.homepage %>)",
 " * @icense <%= pkg.license %>",
 " */",
 ""
].join("\n");
// DO NOT RUN this until the project is ready to be shiped to production.
// And run only once
gulp.task("header", [], function() {
 gulp
   .src(js + "*.js")
   .pipe(header(banner, { pkg: pkg }))
   .pipe(gulp.dest(js));
});

/**
* Vendor file absorption from node_modules
*/
// Copy third party libraries from /node_modules into /vendor
gulp.task("vendor", function() {
 // Bootstrap
 gulp
   .src([
     "./node_modules/bootstrap/dist/**/*",
     "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
     "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
   ])
   .pipe(gulp.dest(vendor + "bootstrap"));

 // Font Awesome
 gulp
   .src([
     "./node_modules/font-awesome/**/*",
     "!./node_modules/font-awesome/{less,less/*}",
     "!./node_modules/font-awesome/{scss,sass/*}",
     "!./node_modules/font-awesome/.*",
     "!./node_modules/font-awesome/*.{txt,json,md}"
   ])
   .pipe(gulp.dest(vendor + "font-awesome"));

 // jQuery
 gulp
   .src([
     "./node_modules/jquery/dist/*",
     "!./node_modules/jquery/dist/core.js"
   ])
   .pipe(gulp.dest(vendor + "jquery"));

 // jQuery Easing
 gulp
   .src(["./node_modules/jquery.easing/*.js"])
   .pipe(gulp.dest(vendor + "jquery-easing"));

 // Simple Line Icons
 gulp
   .src(["./node_modules/simple-line-icons/fonts/**"])
   .pipe(gulp.dest(vendor + "simple-line-icons/fonts"));

 gulp
   .src(["./node_modules/simple-line-icons/css/**"])
   .pipe(gulp.dest(vendor + "simple-line-icons/css"));
});

/**
* CSS SCRIPT
*/
// Compile SCSS
gulp.task("css:compile", function() {
 return gulp
   .src(scss + "style.scss") //.src(theme_dir + "sass/**/style.scss")
   .pipe(
     sass
       .sync({
         outputStyle: "expanded"
       })
       .on("error", sass.logError)
   )
   .pipe(gulp.dest(css));
});

// Compile SCSS frontpage-only
gulp.task("css:compile_fp", function() {
 return gulp
   .src(scss + "style-frontpage-only.scss") //.src(theme_dir + "sass/**/style.scss")
   .pipe(
     sass
       .sync({
         outputStyle: "expanded"
       })
       .on("error", sass.logError)
   )
   .pipe(gulp.dest(css));
});
// Compile SCSS WPAdmin page
gulp.task("css:compile_wpadmin", function() {
 return gulp
   .src(scss + "style-admin.scss") //.src(theme_dir + "sass/**/style.scss")
   .pipe(
     sass
       .sync({
         outputStyle: "expanded"
       })
       .on("error", sass.logError)
   )
   .pipe(gulp.dest(css));
});
// Compile ALL SCSS files
gulp.task("css_compile_all", ["css:compile", "css:compile_fp", "css:compile_wpadmin"]);

// Minify CSS
gulp.task("css:minify", ["css:compile"], function() {
 return gulp
   .src([theme_dir + "css/style.css", "!" + theme_dir + "css/style.min.css"])
   .pipe(cleanCSS())
   .pipe(
     rename({
       suffix: ".min"
     })
   )
   .pipe(gulp.dest(theme_dir + "css"))
   .pipe(browserSync.stream());
});

// Minify CSS frontpage-only
gulp.task("css:minify_fp", ["css:compile_fp"], function() {
 return gulp
   .src([
     theme_dir + "css/style-frontpage-only.css",
     "!" + theme_dir + "css/style-frontpage-only.min.css"
   ])
   .pipe(cleanCSS())
   .pipe(
     rename({
       suffix: ".min"
     })
   )
   .pipe(gulp.dest(theme_dir + "css"))
   .pipe(browserSync.stream());
});

// Minify CSS WPAdmin page
gulp.task("css:minify_wpadmin", ["css:compile_wpadmin"], function() {
 return gulp
   .src([theme_dir + "css/style-admin.css", "!" + theme_dir + "css/style-admin.min.css"])
   .pipe(cleanCSS())
   .pipe(
     rename({
       suffix: ".min"
     })
   )
   .pipe(gulp.dest(theme_dir + "css"))
   .pipe(browserSync.stream());
});
// CSS combined
gulp.task("css", ["css:minify", "css:minify_fp", "css:minify_wpadmin"]);


/**
* JS SCRIPT
*/
// // Copy main scripts to frontpage-only folder
// gulp.task("js:copy_to_fp", function() {
//   return gulp
//     .src([js + "pre-js/*.js"])
//     .pipe(gulp.dest(js + "pre-js/frontpage-only"))
//     .pipe(browserSync.stream());
// });

// Concatnate frontpage-only only JavaScript
gulp.task("js:concat_fp", function() {
 return gulp
   .src([js + "pre-js/**/*.js"])
   .pipe(
     order([
       // js + "pre-js/01_pace.min.js",
       // js + "pre-js/02_html5.js",
       // js + "pre-js/02_slick.js",
       // js + "pre-js/04_custom.js",
       // js + "pre-js/05_navigation.js",
       // js + "pre-js/06_gmap_style.js",
       // js + "pre-js/06_map-script.js",
       // js + "pre-js/07_main.js",
       // js + "pre-js/08_main-frontpage.js",
       js + "pre-js/01_*.js",
       js + "pre-js/02_*.js",
       js + "pre-js/*.js",
       js + "pre-js/frontpage-only/*.js"
     ])
   )
   .pipe(concat(themename + "-script-frontpage.js"))
   .pipe(gulp.dest(js))
   .pipe(browserSync.stream());
});

// Minify all the concatnated frontpage scripts
// gulp.task("js:minify_fp", ["js:copy_to_fp", "js:concat_fp"], function() {
gulp.task("js:minify_fp", ["js:concat_fp"], function() {
 return gulp
   .src([js + themename + "-script-frontpage.js"])
   .pipe(
     jsminify({
       // Reference: https://www.npmjs.com/package/gulp-minify
       ext: {
         // src: "-debug.js",
         min: ".min.js"
       },
       // exclude: ['tasks'],
       ignoreFiles: ["-min.js"]
     })
   )
   .pipe(gulp.dest(js + "build"))
   .pipe(browserSync.stream());
});


// Concatnate Main JavaScript
gulp.task("js:concat", function() {
 return gulp
   .src([js + "pre-js/*.js"])
   .pipe(
   order([
     // js + "pre-js/02_html5.js",
     // js + "pre-js/04_custom.js",
     // js + "pre-js/05_navigation.js",
     // js + "pre-js/07_main.js",
     js + "pre-js/01_*.js",
     js + "pre-js/02_*.js",
     js + "pre-js/*.js"
   ])
   )
   .pipe(concat(themename + "-script.js"))
   .pipe(gulp.dest(js))
   .pipe(browserSync.stream());
 });
 
gulp.task("js:minify", ["js:concat"], function() {
 return gulp
   .src([js +themename + "-script.js"])
   .pipe(
     jsminify({
       // Reference: https://www.npmjs.com/package/gulp-minify
       ext: {
         // src: "-debug.js",
         min: ".min.js"
       },
       // exclude: ['tasks'],
       ignoreFiles: ["-min.js"]
     })
   )
   .pipe(gulp.dest(js + "build"))
   .pipe(browserSync.stream());
});
/* // THIS ONLY WORKS IN LEGACY JS AND NOW NO LONGER WORKS in the use of (latest currently) ES6, such as the use of let, even with the use of pump (which is a error handling workaround uglify added).
// Minify JavaScript
gulp.task("js:minify", ["js:concat"], function(cb) {
 pump(
   [
     gulp.src([
       js + "gc-script.js",
       "!" + js + "*.min.js"
     ]),
     uglify(),
     rename({
       suffix: ".min"
     }),
     gulp.dest(js),
     browserSync.stream()
   ],
   cb
 );
});
*/
// JS
gulp.task("js", ["js:minify", "js:minify_fp"]);

/**
* Server Setting and Browser Syncing SCRIPT
*/

// Configure the browserSync task for JS work
gulp.task("browserSync", function() {
 browserSync.init({
   open: 'external',
       // server: {
       //     baseDir: "../../../../"
       // },
   proxy: theme_proxy,
   port: "100"
 });
});

// // Configure the connect-php for php
// // MAKE SURE TO TURN ON MAMP/XAMPP before running this.
// gulp.task("php", function() {
//   php.server({ base: "./", port: 8012, keepalive: true });
// });

// // Configure the browerSync for php.
// // BUT THIS WONT WORK WITH MAMP/XAMPP server... So instead MAKE SURE TO TURN ON MAMP/XAMPP
// gulp.task("browserSyncPHP", ["php"], function() {
//   browserSync.init({
//     proxy: "127.0.0.1:8010",
//     port: 8888,
//     open: true,
//     notify: false
//   });
// });


/**
* ======= 3) Default/Build Setting ============================ 
*/

/**
* DEFAULT SCRIPT
*/

// Prepare task
gulp.task("prepare", ["vendor", "css", "js"]);

gulp.task("dev:sequence", sequence(["css", "js"], "browserSync"));
// Dev task
gulp.task("dev", ["dev:sequence"], function() {
 gulp.watch(scss + "**/*.scss", ["css"]);
 gulp.watch(js + "pre-js/**/*.js", ["js"]);
 gulp.watch(theme_dir + '**/*').on('change', browserSync.reload);
});

// Build task
gulp.task("build", ["css", "js", "vendor"]);
// gulp.task("build", ["css", "js", "vendor", "php"]);


// Build task
gulp.task("default", ["css", "js", "browserSync"], function() {
 gulp.watch(scss + "*.scss", ["css"]);
 gulp.watch(js + "pre-js/*.js", ["js"]);
 gulp.watch(js + "pre-js/*/*.js", ["js"]);
 gulp.watch(theme_dir + '**/*').on('change', browserSync.reload);
 // gulp.watch(theme_dir + "*.php", browserSync.reload);
 // gulp.watch(theme_dir + "*.html", browserSync.reload);
 });
