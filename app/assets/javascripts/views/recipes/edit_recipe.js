ThermosCook.Views.EditRecipe = Backbone.View.extend({
	initialize: function() {
	},
	template: JST["recipes/edit"],
	photoLoaderTemplate: JST["recipes/photo_loader"],
	newIngredientTemplate: JST["recipes/new_ingredient"],
	newInstructionTemplate: JST["recipes/new_instruction"],
  taggingsTemplate: JST["taggings/select_taggings"],
  deleteTaggingsTemplate: JST["taggings/delete_taggings"],

	events: {
		"click .add_ingredient": "addNewIngredient",
		"click .add_instruction": "addNewInstruction",
		"click .delete-tagging": "deleteTagging",
    "submit .update_recipe": "submit",
    "click .create_tagging": "submitTagging",
	},

	render: function() {
    var editRecipeView = this;
		var renderedContent = this.template();
		this.$el.html(renderedContent);

    this.model.get("instructions").each(function(instruction, index ) {
		  var instructionRenderedContent = editRecipeView.newInstructionTemplate({index: index, instruction: instruction});
      editRecipeView.$(".instructions").append(instructionRenderedContent);
    });

    this.model.get("ingredients").each(function(ingredient, index ) {
		  var ingredientRenderedContent = editRecipeView.newIngredientTemplate({index: index, ingredient: ingredient});
      editRecipeView.$(".ingredients").append(ingredientRenderedContent);
    });

    this.addTaggings();
		return this;
	},
  addTaggings: function() {
    var deleteTaggingsRenderedContent = this.deleteTaggingsTemplate({taggings: this.model.get("taggings")});
    this.$(".current-taggings").html(deleteTaggingsRenderedContent);
    var taggingsRenderedContent = this.taggingsTemplate(
        { allTaggings: ThermosCook.recipeTaggings, 
          currentTaggings: this.model.get("taggings")}
        );
    this.$(".taggings").html(taggingsRenderedContent);

  },

	addNewIngredient: function(event) {
		event.preventDefault();
		var index = $(".ingredients").children().length;
    var ingredient = new ThermosCook.Models.Ingredient();
		var ingredientRenderedContent = this.newIngredientTemplate({index: index, ingredient: ingredient});
		$(".ingredients").append(ingredientRenderedContent);
	},

	addNewInstruction: function(event) {
		event.preventDefault();
		var index = $(".instructions").children().length;
    var instruction = new ThermosCook.Models.Instruction();
		var instructionRenderedContent = this.newInstructionTemplate({index: index, instruction: instruction});
		$(".instructions").append(instructionRenderedContent);
	},
  deleteTagging: function(event) {
    var editRecipeView = this;
    event.preventDefault();
    var taggingId = $(event.currentTarget).attr("id");

    var tag = this.model.get("tags").findWhere(
        {tagging_id: parseInt(taggingId), tagable_id: editRecipeView.model.id, tagable_type: "Recipe"} );
    if (tag) {
      tag.destroy({
        success: function(model, response) {
          $(".delete-tagging#"+taggingId).parent().remove();
          var taggingModel = editRecipeView.model.get("taggings").findWhere({id: parseInt(taggingId)});
          editRecipeView.model.get("taggings").remove(taggingModel);
          editRecipeView.addTaggings();
        },
        error: function(model, response) {

        }
      });

    }

  },
  submit: function(event) {
    var newRecipeView = this;
    event.preventDefault();
    var newRecipeData = $(event.currentTarget).serializeJSON().recipe;
    this.model.save(newRecipeData, {
      wait: true,
      success: function(recipe) {
        console.log("success-Recipe ID: " + recipe.id);
        newRecipeView.model = recipe
        Backbone.history.navigate("/recipes/" + recipe.id + "/recipe_photos", {trigger: true});
      }
    });

  },
  submitTagging: function(event) {
    var editRecipeView = this;
    event.preventDefault();
    var newTaggingData = $("form").serializeJSON().tagging;
    var newTagging = new ThermosCook.Models.Tagging(newTaggingData);
    Backbone.Validation.bind(this);
    ThermosCook.recipeTaggings.create(newTagging, {
      wait: true,
      success: function(tagging) {
        editRecipeView.addTaggings();
        $("#tagging_name").val("");
        if(tagging.get("authenticity_token")) {
          ThermosCook.csrfToken = tagging.get("authenticity_token");
          tagging.set("authenticity_token");
        }
      },
      error: function(recipeSession, response) {
        var csrfToken = response.responseJSON.authenticity_token;
        if (csrfToken && csrfToken.length > 0) 
        {
          ThermosCook.csrfToken = csrfToken;
        }
      },
    });
  },

});
