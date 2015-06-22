'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var done = this.async();
    var that = this;

    var prompts = [{
      name: 'name',
      message: "enter the page name:",
      required: true
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.cameledName = _.camelCase(this.name);
      this.classedName = _.capitalize(_.camelCase(this.name));
      this.titleName =  _.startCase(this.name);
      this.snakeCase = _.snakeCase(this.name);
      this.kebabCase = _.kebabCase(this.name);

      this.log('Creating the "' + this.name + '" page');

      done();
    }.bind(this));
  },

  writing: function () {
    this.template('page.md', 'src/' + this.kebabCase + '.md');
  }
});
