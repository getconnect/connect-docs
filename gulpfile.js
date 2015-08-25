var gulp = require('gulp'),
	gutil = require('gulp-util'),
	fs = require('fs'),
	path = require('path'),
	markdown = require('gulp-markdown'),
	handlebars = require('gulp-compile-handlebars'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	tap = require('gulp-tap'),
	rimraf = require('gulp-rimraf'),
	runSequence = require('run-sequence'),
	Stream = require('merge-stream'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	flatten = require('flatten'),
	concat= require('gulp-concat'),
	menuBuilder = require('./lib/menu-builder.js'),
	codeTabifier = require('./lib/code-tabifier.js'),
	ghPages = require('gulp-gh-pages'),
	spellcheck = require('./lib/spellcheck.js');

/**
 * Removes a module from the cache
 */
require.uncache = function (moduleName) {
    // Run over the cache looking for the files
    // loaded by the specified module name
    require.searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });

    // Remove cached paths to the module.
    // Thanks to @bentael for pointing this out.
    Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};

/**
 * Runs over the cache to search for all the cached
 * files
 */
require.searchCache = function (moduleName, callback) {
    // Resolve the module identified by the specified name
    var mod = require.resolve(moduleName);

    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // Recursively go over the results
        (function run(mod) {
            // Go over each of the module's children and
            // run over it
            mod.children.forEach(function (child) {
                run(child);
            });

            // Call the specified callback providing the
            // found module
            callback(mod);
        })(mod);
    }
};

var source = {
	docs: 'docs/',
	templates: './templates/',
	styles: './assets/styles/',
	images: './assets/images/',
	scripts: './assets/scripts/'
}

var dest = {
	dist: './dist/',
	images: './dist/images/',
	styles: './dist/styles/',
	scripts: './dist/scripts/'
};

function buildIndex(languages) {
	var templateData = {
		languages: languages
	},
	opts = {
		batch: [source.templates]
	};
	
	return gulp.src(source.templates + '/index.hbs')
		.pipe(handlebars(templateData, opts))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(dest.dist));
}

function getLanguageStructure(lang) {
	return  flatten(lang.structure)
		.map(function(path) {
			return source.docs + path;
		});
}

function buildDocs(languages, lang) {
	var structure = getLanguageStructure(lang),
		data = {
			title: lang.title,
			languages: languages
		},
		opts = {
			batch: [source.templates]
		};

	return gulp.src(structure)
		.pipe(concat('all.md'))
        .pipe(markdown())
		.pipe(tap(function(file, t) {
			var html = String(file.contents);
			
			data.content = codeTabifier.tabifyCode(html, lang.allowedLanguages);
			data.menu = menuBuilder.buildMenuFromHtml(html);
			
			file.contents = fs.readFileSync(source.templates + 'doc.hbs');
	    }))
		.pipe(handlebars(data, opts))
		.pipe(rename(lang.env + '.html'))
		.pipe(gulp.dest(dest.dist));
}

gulp.task('clean', function() {
	return gulp.src(dest.dist)
		.pipe(rimraf());
})

gulp.task('build:fonts', function() {
	gulp.src('./node_modules/ionicons/fonts/*.*')
		.pipe(gulp.dest(dest.dist + 'fonts'));
});

gulp.task('build:styles', function() {
	gulp.src(source.styles + 'all.less')
		.pipe(less())
		.pipe(minifyCss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(dest.dist + 'styles'));
});

gulp.task('build:scripts', function() {
	var scripts = [
		source.scripts + 'docs.js',
		'./node_modules/bootstrap/dist/js/bootstrap.js',
		'./node_modules/jquery/dist/jquery.js',
		'./node_modules/svg-injector/svg-injector.js',
		'./bower_components/highlightjs/highlight.pack.js',
		source.scripts + 'analytics.js'
	];

	return gulp.src(scripts)
		.pipe(uglify())
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest(dest.scripts));
});

gulp.task('build:images', function() {
	return gulp.src(source.images + '**/*.*')
		.pipe(gulp.dest(dest.images));
});

gulp.task('build:docs', function() {
	require.uncache('./languages.js');
	var languages = require('./languages.js');
	
	var stream = new Stream();
	stream.add(buildIndex(languages));

	languages.forEach(function(lang) {
		stream.add(buildDocs(languages, lang));
	})

	return stream;
});

gulp.task('spellcheck', function() {
	var ignore = fs.readFileSync('.spellcheckignore').toString().split(/\r?\n/);
	
	return gulp.src(source.docs + '**/*.md')
		.pipe(spellcheck({ ignore: ignore }))
		.on('misspelling', function (misspelling) {
			gutil.log(gutil.colors.yellow(misspelling.file.path + ": " + misspelling.word + " is misspelt"));
		});
});

gulp.task('watch', ['serve'], function () {
	gulp.watch([source.templates + '**/*.hbs', source.docs + '**/*.md', 'languages.js'], ['reload:docs'])
		.on('error', gutil.log);
	gulp.watch([source.styles + '**/*.less'], ['reload:styles']);
	gulp.watch([source.scripts + '**/*.js'], ['reload:scripts']);
	gulp.watch([source.images + '**/*.*'], ['reload:images']);
});

gulp.task('serve', ['build:all'], function() {
	connect.server({
		root: dest.dist,
    	livereload: true
	});
});

gulp.task('reload:docs', ['build:docs'], function() {
	gulp.src(source.docs)
		.pipe(connect.reload());
});
gulp.task('reload:styles', ['build:styles'], function() {
	gulp.src(source.styles)
		.pipe(connect.reload());
});
gulp.task('reload:scripts', ['build:scripts'], function() {
	gulp.src(source.scripts)
		.pipe(connect.reload());
});
gulp.task('reload:images', ['build:images'], function() {
	gulp.src(source.images)
		.pipe(connect.reload());
});

gulp.task('build:all', function(cb) {
	runSequence('clean', ['build:images', 'build:fonts', 'build:styles', 'build:scripts', 'spellcheck'], ['build:docs'], cb);
});

gulp.task('deploy', ['build:all'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['serve', 'watch']);
