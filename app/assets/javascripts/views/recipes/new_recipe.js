ThermosCook.Views.NewRecipe = Backbone.View.extend({
	initialize: function() {
	},
	template: JST["recipes/new"],
	photoLoaderTemplate: JST["recipes/photo_loader"],
	newIngredientTemplate: JST["recipes/new_ingredient"],
	newInstructionTemplate: JST["recipes/new_instruction"],

	events: {
		"click .add_ingredient": "addNewIngredient",
		"click .add_instruction": "addNewInstruction",
    "submit .new_recipe": "submit",
	},
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	setModel: function(event, data) {
		this.model = new ThermosCook.Models.Recipe(data, {parse: true});
		ThermosCook.recipes.add(this.model);
		Backbone.history.navigate("", {trigger: true});
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
    this.model = new ThermosCook.Models.Recipe(newRecipeData);
    Backbone.Validation.bind(this);

    if (this.model.validate() == undefined) {
      ThermosCook.recipes.create(this.model, {
        wait: true,
        success: function(recipe) {
          newRecipeView.model = recipe;
          ThermosCook.CurrentUser.get("recipes").push([recipe]);
          if(recipe.get("authenticity_token")) {
            ThermosCook.csrfToken = recipe.get("authenticity_token");
            recipe.set("authenticity_token");
          }
          Backbone.history.navigate("/recipes/" + recipe.id + "/recipe_photos", {trigger: true});
        },
        error: function(recipeSession, response) {
          var errorMessages = response.responseJSON.messages;
          ThermosCook.Methods.handleErrors(errorMessages);
          var csrfToken = response.responseJSON.authenticity_token;
          if (csrfToken && csrfToken.length > 0) 
          {
            ThermosCook.csrfToken = csrfToken;
          }
        },
      });
    } else {
      ThermosCook.Methods.handleErrors(this.model.validate(), true);
    }
  },

});
