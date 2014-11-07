ThermosCook.Views.EditArticle= Backbone.View.extend({
	template: JST["articles/edit"],
	events: {
		"click .edit-article": "editArticle",
	},
	
	render: function() {
		var articleDetail = this;
		var renderedContent = this.template({article: this.model, currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
		return this;
	},
	setupCKEditor: function() {

    var article_editor = CKEDITOR.replace("article_editor", {
      filebrowserUploadUrl: "/articles/" + this.model.id + "/article_photo",
    });

    //once ckeditor has fully loaded
    article_editor.on("instanceReady", function(evt) {
      var article_editor = evt.editor;

      //create new save article method
      var overridecmd = new CKEDITOR.command(article_editor, {
        exec: function(editor){
          var articleEditor = this;
          var articleData = {body: editor.getData()};
          var article = ThermosCook.articles.get($("form").serializeJSON().article.id);
          article.save(articleData, {
            wait: true,
            success: function(article) {
              articleEditor.article = article;
              Backbone.history.navigate("/articles/" + article.id, {trigger: true});
            }
          });
        }
      });

      // Replace the old save's exec function with the new one
      evt.editor.commands.save.exec = overridecmd.exec;
    });

    //after image is created set csrfToken
    ThermosCook.createImageResponse = function(csrfToken, imageUrl) {
      console.log(imageUrl);
      ThermosCook.csrfToken = csrfToken;
    };
    
  }

});
