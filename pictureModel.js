// Picture Model

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'http://tiny-tiny.herokuapp.com/collections/instaGraham',
  idAttribute: '_id',
  defaults:{
    caption: "No Image Available",
    url: "https://placekitten.com/200/400",
    likes: 0
  },
  initialize: function(){

  }
});
