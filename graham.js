var $ = require('jquery');
var PictureCollection = require('./pictureCollection');
var PictureModel = require('./pictureModel');


module.exports = {
  init: function () {
    this.styling();
    this.events();
  },
  styling: function() {
    console.log("yay!");
  },
  events: function() {
    $("#imageUploadSubmit").on("click",function (e) {
      e.preventDefault();
      var imageCaption = $("#imageCaption").val();
      var imageURL = $("#imageURL").val();
      var picture = {caption: imageCaption, url: imageURL};
      var newPicModel = new PictureModel();
      newPicModel.save();
      
    })
  },

}
