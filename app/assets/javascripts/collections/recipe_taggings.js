ThermosCook.Collections.RecipeTaggings = Backbone.Collection.extend({
	model: ThermosCook.Models.Tagging,
	url: "taggings/recipe_taggings",
});
