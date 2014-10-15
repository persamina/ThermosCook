ThermosCook.Views.EditRecipePhotos = Backbone.View.extend({
	initialize: function() {
	},
	template: JST["recipes/edit_recipe_photos"],

	events: {
    "submit .recipe_photos": "submit",
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
      var recipePhotoData = data.result.files[0];
      console.log(recipePhotoData.recipe_id);
      if(recipePhotoData.authenticity_token) {
        ThermosCook.csrfToken = recipePhotoData.authenticity_token;
        recipePhotoData.authenticity_token = "";
      }
      var newRecipePhoto = new ThermosCook.Models.RecipePhoto(recipePhotoData);
      var recipe = ThermosCook.recipes.findWhere({id: newRecipePhoto.get("recipe_id")});
      recipe.get("recipe_photos").add([newRecipePhoto]);
    });
    
  },

	render: function() {
    var editRecipePhotosView = this;
		var renderedContent = this.template({recipe: this.model, csrfToken: ThermosCook.csrfToken });
		this.$el.html(renderedContent);
		return this;
	},
	continueButton: function(event) {
    event.preventDefault();
    Backbone.history.navigate("recipes/" + this.model.id, {trigger: true});
	},

  

});
