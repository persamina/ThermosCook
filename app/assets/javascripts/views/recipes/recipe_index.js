ThermosCook.Views.RecipeIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(ThermosCook.recipes, "add remove change", this.render);
		this.listenTo(ThermosCook.recipes, "newSuccessMessage", this.newSuccessMessage);
	},
	template: JST["recipes/index"],
	recipeTemplate: JST["recipes/recipe_detail_list"],
	

	render: function() {
		var recipeIndex = this;
		var renderedContent = this.template({currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
		this.$("#recipes").empty();
		ThermosCook.recipes.each(function(recipe) {
			var recipeRenderedContent = recipeIndex.recipeTemplate(
        {recipe: recipe}
      );
			recipeIndex.$("#recipes").append(recipeRenderedContent);
		});
		return this;
	},

	newSuccessMessage: function(options) {
   console.log("new success message");
     var renderedSuccesses = ThermosCook.Store.addSuccessesTemplate({
      successes: options.messages
    });
    this.$el.find(".successes").html(renderedSuccesses);
  },
  

});
