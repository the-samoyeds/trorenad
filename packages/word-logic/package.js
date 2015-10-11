Package.describe({
  name: 'bsteinfeld:word-logic',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  'use strict';

  api.versionsFrom('1.2');
  // api.use('ecmascript');
  api.addFiles([
    'startup.js',
    // 'word-logic.js'
    'word-logic-game.js'
  ]);

  // api.addAssets('messages.json', 'server')

  api.use("reactive-var")

  // api.addFiles('');
  api.export('WordLogic', ['client', 'server']);
  api.export('Messages',['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('bsteinfeld:word-logic');
  api.addFiles('word-logic-tests.js');
});
