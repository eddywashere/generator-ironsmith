'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var done = this.async();
    var that = this;

    this.log('\n');

    var prompts = [{
      name: 'name',
      message: "enter a project name:",
      default: 'Ironsmith'
    }, {
      name: 'author',
      message: "enter a default author's name:",
      default: 'Tyler Durden'
    }];


    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.config.set('author', props.author);
      this.cameledName = _.camelCase(this.name);
      this.classedName = _.capitalize(_.camelCase(this.name));
      this.titleName =  _.startCase(this.name);
      this.snakeCase = _.snakeCase(this.name);

      done();
    }.bind(this));
  },

  writing: function () {
    var that = this;

    mkdirp('src/posts');
    mkdirp('templates');
    mkdirp('scss');
    mkdirp('js');
    mkdirp('images');

    this.template('package.json', 'package.json');
    this.template('config.js', 'config.js');
    this.template('Gulpfile.js', 'Gulpfile.js');
    this.template('ironsmith.js', 'ironsmith.js');
    this.template('README.md', 'README.md');
    this.directory('js', 'js');
    this.directory('images', 'images');

    // support a plain theme in the future
    this.directory('pixyll/src', 'src');
    this.directory('pixyll/templates', 'templates');
    this.directory('pixyll/scss', 'scss');
  },

  install: function () {
    this.npmInstall();
  }
});
