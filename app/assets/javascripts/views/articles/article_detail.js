ThermosCook.Views.ArticleDetail = Backbone.View.extend({
	template: JST["articles/article_detail"],
	events: {
		"click .delete-article": "deleteArticle",
		"click .like-button": "likeArticle",
	},
	render: function() {
		var articleDetail = this;
		var renderedContent = this.template({article: this.model, currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);

		return this;
	},

	deleteArticle: function(event) {
    event.preventDefault();

		this.model.destroy({
			wait: true,
			success: function(model, response, options) {
        ThermosCook.articles.remove(this.model);
        //var userRecipe = ThermosCook.CurrentUser.get("recipes").findWhere({id: model.id}).remove();
       
        //ThermosCook.CurrentUser.get("recipes").remove();
			}
		});
    Backbone.history.navigate("recipes", {trigger: true});
	},
	likeArticle: function(event) {
    event.preventDefault();
    var userLike =ThermosCook.CurrentUser.get("likes").findWhere({article_id: this.model.id});
    if(!userLike) {
      var like = new ThermosCook.Models.Like({"article_id": this.model.id});
      like.save({},{
        wait: true,
        success: function(likeModel, response, options) {
          if (likeModel.get("authenticity_token")) {
            ThermosCook.csrfToken = likeModel.get("authenticity_token");
            likeModel.set({"authenticity_token": ""});
          }
          ThermosCook.CurrentUser.get("likes").add([likeModel]);

          $(".like-button").html("<i class='fa fa-heart color-red'></i> Liked");
        },
        error: function(model, response, options) {
          var message = "Sign in so we can remember what you liked!";
          ThermosCook.Dispatcher.trigger("newErrorMessage", {messages: [message]});
          console.log("error liking!");
        }
      });
    } else {
      userLike.destroy({
        wait: true,
        success: function(likeModel, response, options) {
          ThermosCook.CurrentUser.get("likes").remove(likeModel);
          $(".like-button").html("<i class='fa fa-heart'></i> Like");
        },
        error: function(model, response, options) {
          var message = "Error Unliking Article!";
          ThermosCook.Dispatcher.trigger("newErrorMessage", {messages: [message]});
        }
      });

    }
	}

});
