//View for generating nav buttons in nav bar
ThermosCook.Views.NavButtons= Backbone.View.extend({
	initialize: function() {
	},

  events: {
    "click #destroy_session": "destroySession",
    "submit .find-recipes": "findRecipes"
  },

	template: JST["nav_buttons"],
	taggingsTemplate: JST["taggings/find_taggings"],

	render: function() {
		var renderedContent = this.template({user: ThermosCook.CurrentUser, taggings: ThermosCook.recipeTaggings});
    //sets the parent element to something other then a div
    //http://backbonejs.org/#View-setElement
    this.setElement($(renderedContent));
    this.addTaggings();
    this.$(".nav-button").tooltip();
		return this;
  },
  addTaggings: function() {
    var taggingsRenderedContent = this.taggingsTemplate({taggings: ThermosCook.recipeTaggings});
    this.$(".recipe-taggings").html(taggingsRenderedContent);
  },
  destroySession: function(event) {
    event.preventDefault();
    console.log("prevented!");
    var session = new ThermosCook.Models.DestroySession();
    ThermosCook.CurrentUser.url = "/users/sign_out";
    ThermosCook.CurrentUser.destroy({
      wait: true,
      success: function(model, response) {
        if (response && response.csrfToken) {
          ThermosCook.csrfToken = response.csrfToken;
          ThermosCook.CurrentUser = new ThermosCook.Models.User({},{parse: true});
          Backbone.history.navigate("", {trigger: true});
        }
      },
      error: function(model, response) {
        console.log("error!");
      },
    });
  },
  findRecipes: function(event) {
    var navButtonView= this;
    event.preventDefault();
    var taggingData = $(event.currentTarget).serializeJSON();
    var recipes = new ThermosCook.Collections.Recipes();
    recipes.url = "recipes/search";
    recipes.fetch({
      data: $.param(taggingData),
      success: function(response) {
        navButtonView.collection = response;
        ThermosCook.recipeSearchResults = response;
        ThermosCook.recipeSearchResults.tagging_ids = taggingData.tagging_ids;
        ThermosCook.searchCount += 1;
		    Backbone.history.navigate("recipes/search/" + ThermosCook.searchCount,  {trigger: true});
      },
      error: function(response) {
        console.log("ERROR!");
        console.log(response);
      }
    });
  },
});
