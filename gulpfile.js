const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
// const image = require('gulp-image');
// Иначе ошибка
// Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: C:\Users\Виктория\Desktop\Git_Rep\git\weblayout-advanced\08_css-grid\node_modules\gulp-image\index.js
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();


const styles = () => {
  return src('css/style.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('index.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('img/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: 'sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'js/*.js'
  ])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify({
    toplevel: true
  }).on('error', notify.onError()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

// const images = () => {
//   return src([
//     'img/*.jpg',
//     'img/*.png',
//     'img/*.svg',
//     'img/*.jpeg',
//   ])
//   .pipe(image())
//   .pipe(dest('dist/images'))
// }

watch('index.html', htmlMinify);
watch('css/style.css', styles);
watch('img/*.svg', svgSprites);
watch('js/*.js', scripts)

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
// exports.images = images;
exports.default = series(htmlMinify, scripts, styles, svgSprites, watchFiles)
