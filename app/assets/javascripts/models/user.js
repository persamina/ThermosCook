ThermosCook.Models.User = Backbone.Model.extend({
  url: "/users",
	parse: function(respAttr, options) {
		respAttr.user_photos = new ThermosCook.Collections.UserPhotos(respAttr.user_photos);
		return respAttr;
	},

});
