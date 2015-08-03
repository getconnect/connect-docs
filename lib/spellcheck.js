/*
 * gulp-spellcheck
 *
 * Copyright(c) 2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

var util        = require('util');
var through     = require('through2');
var aspell      = require('aspell');
var gutil       = require('gulp-util');
var PLUGIN_NAME = 'gulp-spellcheck';

module.exports = function (options) {

    options = options || {};
    options.replacement = options.replacement || '%s (suggestions: %s)';

    options.language = (options.language)? util.format('--lang=%s', options.language) : '';

    aspell.args.push(options.language);
    
    var ignore = options.ignore ? options.ignore.map(function (i) { return i.toLowerCase(); }) : [];
    var misspellings = 0;

    function check (file, enc, callback) {
        /*jshint validthis:true */
        var self = this;
        var contents = file.contents.toString('utf-8').replace(/`{3}[\s\S]*?`{3}/g, '').replace(/\<p.+?\>.+?\<\/p\>/g, '');

        // Remove all line breaks and add a circumflex in order to disable 'pipe mode'.
        // see: http://aspell.net/man-html/Through-A-Pipe.html
        aspell('^' + contents.replace(/\r?\n/g, ' '))
            .on('error', function onError (err) {
                err = err.toString('utf-8');

                return self.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
            })
            .on('result', function onResult (result) {
                if ('misspelling' === result.type && ignore.indexOf(result.word.toLowerCase()) < 0) {
                    misspellings++;
                    self.emit('misspelling', { word: result.word, file: file })
                }
            })
            .on('end', function () {
                return callback();
            });
    }

    function finalize (callback) {
        if (misspellings > 0)
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, "One or more misspellings were detected."));
        return callback();
    }

    return through.obj(check, finalize);
};