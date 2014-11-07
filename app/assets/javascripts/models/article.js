ThermosCook.Models.Article= Backbone.Model.extend({
	urlRoot: "/articles",

	parse: function(respAttr, options) {
		respAttr.article_photos = new ThermosCook.Collections.ArticlePhotos(respAttr.article_photos);
		return respAttr;
	},
  validation: {
    title: {
      required: true,
    }
  },


});
