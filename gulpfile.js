/*eslint-disable*/
var gulp = require("gulp"),
	$ = require('gulp-load-plugins')(),
	browserify = require("browserify"),
	watchify = require("watchify"),
	babelify = require("babelify"),
	rimraf = require("rimraf"),
	source = require("vinyl-source-stream"),
	browserSync = require("browser-sync"),
	_ = require("lodash"),
	es = require("event-stream"),
	bundler,
	reload = browserSync.reload,
	config = {
		entryFile: "./src/main.js",
		outputDir: "./dist/",
		outputFile: "bundle.js"
	};
gulp.task("lint", function() {
	gulp.src(["src/**/**", "!*src/**/*.json"])
		.pipe($.eslint({
			rules: {
				"strict": 0
			},
			envs: ["browser"]
		}))
		.pipe($.eslint.format("./node_modules/eslint-friendly-formatter", process.stderr));
});
gulp.task("clean", function() {
	rimraf.sync(config.outputDir);
});
gulp.task("build", ["clean"], function() {
	return bundle();
});
gulp.task("default", ["build"], function() {
	process.exit(0);
});
gulp.task("release", ["build", "compress"], function() {
	process.exit(0);
});
gulp.task('compress', ["build"], function() {
  return gulp.src(config.outputDir + config.outputFile)
    .pipe($.uglify())
    .pipe($.rename({
     	extname: '.min.js'
   	}))
    .pipe(gulp.dest("dist"));
});
gulp.task("watch", ["build"], function() {
	browserSync({
		server: {
			baseDir: config.outputDir
		}
	});
	getBundler().on("update", function() {
		gulp.start("build");
	});
});
gulp.task("serve", function() {
	browserSync({
		server: {
			baseDir: config.outputDir
		}
	});
});

function getBundler() {
	if (!bundler) {
		bundler = watchify(browserify(config.entryFile, _.extend({
			debug: true,
			standalone: "BuoyData"
		}, watchify.args)));
	}
	return bundler;
}

function bundle() {
	return getBundler()
		.transform(babelify)
		.bundle()
		.on('error', $.util.log)
		.pipe(source(config.outputFile))
		.pipe($.buffer())
		.pipe($.replace(/@@compiled/ig, (new Date()).toString()))
		.pipe(gulp.dest(config.outputDir));
		// .pipe(reload({
		// 	stream: true
		// }));
}
