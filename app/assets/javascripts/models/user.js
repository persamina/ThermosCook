ThermosCook.Models.User = Backbone.Model.extend({
  url: "/users",
	parse: function(respAttr, options) {

		respAttr.user_photos = new ThermosCook.Collections.UserPhotos(respAttr.user_photos, {parse: true});
		respAttr.recipes = new ThermosCook.Collections.Recipes(respAttr.recipes, {parse: true} );
		return respAttr;
	},

});
