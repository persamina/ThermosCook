ThermosCook.Views.EditArticlePhotos = Backbone.View.extend({
	initialize: function() {
	},
	template: JST["articles/edit_article_photos"],

	events: {
    "submit .article_photos": "submit",
    "click .continue-button": "continueButton",
	},

  setupFUEvents: function() {
    $("#fileupload").bind("fileuploadadd", function(event, data) {
      console.log("added");
    });
    $("#fileupload").bind("fileuploadsubmit", function(event, data) {
      console.log("submitted");
    });
    $("#fileupload").bind("fileuploaddone", function(event, data) {
      var articlePhotoData = data.result.files[0];
      console.log(articlePhotoData.article_id);
      var newArticlePhoto = new ThermosCook.Models.ArticlePhoto(articlePhotoData);
      var article = ThermosCook.articles.findWhere({id: newArticlePhoto.get("article_id")});
      console.log(article);
      article.get("article_photos").add([newArticlePhoto]);
    });
    
  },

	render: function() {
    var editArticlePhotosView = this;
		var renderedContent = this.template({article: this.model});
		this.$el.html(renderedContent);
		return this;
	},
	continueButton: function(event) {
    event.preventDefault();
    Backbone.history.navigate("articles/" + this.model.id, {trigger: true});
	},

  

});
