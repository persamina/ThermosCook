ThermosCook.Views.EditRecipePhotos = Backbone.View.extend({
	initialize: function() {
    this.filesUploaded = false;
	},
	template: JST["recipes/edit_recipe_photos"],

	events: {
    "submit .recipe_photos": "submit",
    "click .continue-button": "continueButton",
    "click #modalYes": "continueWithoutUpload",
	},

  setupFUEvents: function() {
    var editRecipePhotosView = this;
    $("#fileupload").bind("fileuploadadd", function(event, data) {
      console.log("added");
    });
    $("#fileupload").bind("fileuploadsubmit", function(event, data) {
      console.log("submitted");
    });
    $("#fileupload").bind("fileuploaddone", function(event, data) {
      var recipePhotoData = data.result.files[0];
      if(recipePhotoData.authenticity_token) {
        ThermosCook.csrfToken = recipePhotoData.authenticity_token;
        recipePhotoData.authenticity_token = "";
      }
      var newRecipePhoto = new ThermosCook.Models.RecipePhoto(recipePhotoData);
      var sharedRecipe = ThermosCook.recipes.findWhere({id: newRecipePhoto.get("recipe_id")});
      var userRecipe = ThermosCook.CurrentUser.get("recipes").findWhere({id: newRecipePhoto.get("recipe_id")});
      sharedRecipe.get("recipe_photos").add([newRecipePhoto]);
      userRecipe.get("recipe_photos").add([newRecipePhoto]);
      editRecipePhotosView.filesUploaded = true;
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
    if (this.filesUploaded) {
      Backbone.history.navigate("recipes/" + this.model.id, {trigger: true});
    } else {
     $("#photoUploadModal").modal("show"); 

    }
	},
	continueWithoutUpload: function(event) {
    event.preventDefault();
    $("#photoUploadModal").modal("hide"); 
    Backbone.history.navigate("recipes/" + this.model.id, {trigger: true});
	},

  

});
