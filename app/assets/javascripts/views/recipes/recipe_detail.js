ThermosCook.Views.RecipeDetail = Backbone.View.extend({
	template: JST["recipes/recipe_detail"],
	ingredientTemplate: JST["recipes/ingredient_detail"],
	instructionTemplate: JST["recipes/instruction_detail"],
	photoTemplate: JST["recipes/recipe_photo_detail"],
	events: {
		"click .delete-recipe": "deleteRecipe",
		"click .like-button": "likeRecipe",
	},
	
	render: function() {
		var recipeDetail = this;
		var renderedContent = this.template({recipe: this.model, currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);

		this.model.get("ingredients").each(function(ingredient) {
			var ingredientRenderedContent = recipeDetail.ingredientTemplate({ingredient: ingredient});
			recipeDetail.$("#ingredients").append(ingredientRenderedContent);
		});

		this.model.get("instructions").each(function(instruction, index) {
			var instructionRenderedContent = recipeDetail.instructionTemplate({number: index+1, instruction: instruction});
			recipeDetail.$("#instructions").append(instructionRenderedContent);
		});
    this.model.get("recipe_photos").each(function(recipePhoto) {
      var recipePhotoRenderedContent = recipeDetail.photoTemplate({recipePhoto: recipePhoto});
      recipeDetail.$(".galleria").append(recipePhotoRenderedContent);
    });

    Galleria.run(".galleria", {
      thumbnails: false,
    });
		return this;
	},
	deleteRecipe: function(event) {
    event.preventDefault();

		this.model.destroy({
			wait: true,
			success: function(model, response, options) {
        ThermosCook.recipes.remove(this.model);
        ThermosCook.CurrentUser.get("recipes").remove(model);
        var message = "Recipe was successfully deleted!";
        ThermosCook.Dispatcher.trigger("newSuccessMessage", {messages: [message]});
        //var userRecipe = ThermosCook.CurrentUser.get("recipes").findWhere({id: model.id}).remove();
       
        //ThermosCook.CurrentUser.get("recipes").remove();
			},
      error: function(model, response, options) {
        var message = "You're not allowed to delete that recipe!";
        ThermosCook.Dispatcher.trigger("newErrorMessage", {messages: [message]});
      }
		});
    Backbone.history.navigate("recipes", {trigger: true});
	},
	likeRecipe: function(event) {
    event.preventDefault();
    console.log("recipe liked!");
    var userLike =ThermosCook.CurrentUser.get("likes").findWhere({recipe_id: this.model.id});
    if(!userLike) {
      var like = new ThermosCook.Models.Like({"recipe_id": this.model.id});
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
          var message = "Error Unliking Recipe!";
          ThermosCook.Dispatcher.trigger("newErrorMessage", {messages: [message]});
        }
      });

    }
	}

});
