var $ = require('jquery');
var _ = require('underscore');
var PictureCollection = require('./pictureCollection');
var PictureModel = require('./pictureModel');


module.exports = grahamPage = {
  init: function () {
    grahamPage.styling();
    grahamPage.events();
  },
  pictureCollection: new PictureCollection(),
  styling: function() {
    grahamPage.loadPictures();

  },
  events: function() {
    $("#imageUploadSubmit").on("click",function (e) {
      e.preventDefault();
      var newPicModel = new PictureModel({caption: $("#imageCaption").val(), url: $("#imageURL").val()});
      newPicModel.save().then(function () {
        $(".pics").prepend(_.template($("#picTmpl").html())(newPicModel));
      })
      $("#imageCaption").val("");
      $("#imageURL").val("");
    });

    $(".pics").on("click",".fa-heart-o",function (e) {
      e.preventDefault();
      var id = $(this).attr("id");
      $(this).toggleClass("fa-heart-o");
      $(this).toggleClass("fa-heart");
      var likedPic = grahamPage.pictureCollection.get(id);
      var likes = likedPic.get('likes')+1;
      likedPic.set('likes',likes);
      likedPic.save();
      $($(this).parent().siblings("span")[0]).html("  "+likes+" likes");
      // grahamPage.loadPictures();
    });
    $(".pics").on("click",".fa-heart",function (e) {
      e.preventDefault();
      var id = $(this).attr("id");
      $(this).toggleClass("fa-heart-o");
      $(this).toggleClass("fa-heart");
      var likedPic = grahamPage.pictureCollection.get(id);
      var likes = likedPic.get('likes')-1;
      likedPic.set('likes',likes);
      likedPic.save();
      $($(this).parent().siblings("span")[0]).html("  "+likes+" likes");
      // grahamPage.loadPictures();
    });
    $(".pics").on("click",".delete",function (e) {
      e.preventDefault();
      var id = $(this).attr("id");
      id = id.substring(0,id.length-6)
      var deletedPic = grahamPage.pictureCollection.get(id);
      deletedPic.destroy();
      $(this).parents(".row")[0].remove();
      grahamPage.loadPictures();
    })
  },
  loadPictures: function (collection) {
    $(".pics").html("");
    grahamPage.pictureCollection.fetch().then(function () {
      _.each(grahamPage.pictureCollection.models, function (picture) {
        grahamPage.loadTemplate("#picTmpl", picture, ".pics");
      })
    })
  },
  loadTemplate: function(template, object, element){
    var temp = _.template($(template).html());
    $(element).append(temp(object));
  }

}
