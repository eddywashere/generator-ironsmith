'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var done = this.async();
    var that = this;

    var prompts = [{
      name: 'name',
      message: "enter the post name:",
      required: true
    },{
      name: 'tags',
      message: "add some tags (comma separated):"
    }];

    this.author = this.config.get('author');
    if(!this.author){
      prompts.push({
        name: 'author',
        message: "enter the author name",
        required: true
      });
    }

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.tags = props.tags;
      this.author = this.author || props.author;
      this.cameledName = _.camelCase(this.name);
      this.classedName = _.capitalize(_.camelCase(this.name));
      this.titleName =  _.startCase(this.name);
      this.snakeCase = _.snakeCase(this.name);
      this.kebabCase = _.kebabCase(this.name);

      if (props.author) {
        this.config.set('author', props.author);
      }

      var rightNow = new Date();
      this.today = rightNow.toISOString().slice(0,10);

      this.log('Creating the "' + this.name + '" post');

      done();
    }.bind(this));
  },

  writing: function () {
    this.template('post.md', 'src/posts/' + this.kebabCase + '.md');
  }
});
