ThermosCook.Models.User = Backbone.Model.extend({
  url: "/users",
	parse: function(respAttr, options) {

		respAttr.user_photos = new ThermosCook.Collections.UserPhotos(respAttr.user_photos, {parse: true});
		respAttr.recipes = new ThermosCook.Collections.Recipes(respAttr.recipes, {parse: true} );
    respAttr.likes = new ThermosCook.Collections.Likes(respAttr.likes, {parse: true});
		return respAttr;
	},
  validation: {
    email: {
      required: true,
      pattern: "email",
    },
    username: {
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    password: {
      required: true,
      minLength: 8,
      maxLength: 50,
    },
    password_confirmation: {
      equalTo: "password"
    },
  },



});
