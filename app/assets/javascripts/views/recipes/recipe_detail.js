ThermosCook.Views.RecipeDetail = Backbone.View.extend({
	template: JST["recipes/recipe_detail"],
	ingredientTemplate: JST["recipes/ingredient_detail"],
	instructionTemplate: JST["recipes/instruction_detail"],
	photoTemplate: JST["recipes/recipe_photo_detail"],
	events: {
		"click .delete-recipe": "deleteRecipe",
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
			}
		});
    Backbone.history.navigate("recipes", {trigger: true});
	}

});
