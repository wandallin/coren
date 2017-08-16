const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const watch = require('gulp-watch');
const file = require('gulp-file');

const index = `
// collectors
exports.HeadCollector = require('./server/collectors/head-collector');
exports.ReduxCollector = require('./server/collectors/redux-collector');
exports.RoutesCollector = require('./server/collectors/routes-collector');
exports.ScriptCollector = require('./server/collectors/script-collector');
exports.StyleCollector = require('./server/collectors/style-collector');

// client
exports.collector = require('./client/collector-hoc');
`;

const argv = require('yargs').argv;
const path = require('path');
gulp.task('build:example', () => {
  const exampleName = argv.example;
  const absolutePath = dest => path.resolve(__dirname, `examples/apps/${exampleName}/node_modules/coren/${dest}`);
  gulp.src(['server/*', 'server/**/*'])
    .pipe(babel())
    .pipe(gulp.dest(absolutePath('lib/server')));
  gulp.src('bin/*')
    .pipe(babel())
    .pipe(gulp.dest(absolutePath('lib/bin')));
  gulp.src('client/*')
    .pipe(babel())
    .pipe(gulp.dest(absolutePath('lib/client')));
  gulp.src('shared/*')
    .pipe(babel())
    .pipe(gulp.dest(absolutePath('lib/shared')));
  file('index.js', index)
    .pipe(gulp.dest(absolutePath('lib')));
});

gulp.task('build', ['index'], () => {
  gulp.src(['server/*', 'server/**/*'])
    .pipe(babel())
    .pipe(gulp.dest('lib/server'));
  gulp.src('bin/*')
    .pipe(babel())
    .pipe(gulp.dest('lib/bin'));
  gulp.src('client/*')
    .pipe(babel())
    .pipe(gulp.dest('lib/client'));
  gulp.src('shared/*')
    .pipe(babel())
    .pipe(gulp.dest('lib/shared'));
});

gulp.task('build:watch', ['index'], () => {
  gulp.src(['server/*', 'server/**/*'])
    .pipe(watch(['server/*', 'server/**/*']))
    .pipe(babel())
    .pipe(gulp.dest('lib/server'));
  gulp.src('bin/*')
    .pipe(watch('bin/*'))
    .pipe(babel())
    .pipe(gulp.dest('lib/bin'));
  gulp.src('client/*')
    .pipe(watch('client/*'))
    .pipe(babel())
    .pipe(gulp.dest('lib/client'));
  gulp.src('shared/*')
    .pipe(watch('shared/*'))
    .pipe(babel())
    .pipe(gulp.dest('lib/shared'));
});

gulp.task('index', () => {
  file('index.js', index)
    .pipe(gulp.dest('lib'));
  })
