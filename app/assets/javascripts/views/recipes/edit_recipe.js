ThermosCook.Views.EditRecipe = Backbone.View.extend({
	initialize: function() {
	},
	template: JST["recipes/edit"],
	photoLoaderTemplate: JST["recipes/photo_loader"],
	newIngredientTemplate: JST["recipes/new_ingredient"],
	newInstructionTemplate: JST["recipes/new_instruction"],

	events: {
		"click .add_ingredient": "addNewIngredient",
		"click .add_instruction": "addNewInstruction",

    "submit #update_recipe": "submit",
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

		return this;
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

});
