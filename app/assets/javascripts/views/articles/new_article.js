ThermosCook.Views.NewArticle = Backbone.View.extend({
	initialize: function() {
	},
	template: JST["articles/new"],

	events: {
    "submit .new_article": "submit",
	},

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	setModel: function(event, data) {
		this.model = new ThermosCook.Models.Article(data, {parse: true});
		ThermosCook.articles.add(this.model);
		Backbone.history.navigate("", {trigger: true});
	},

  submit: function(event) {
    var newArticleView = this;
    event.preventDefault();
    var newArticleData = $(event.currentTarget).serializeJSON().article;
    this.model = new ThermosCook.Models.Article(newArticleData);
    Backbone.Validation.bind(this);

    if (this.model.validate() == undefined)  
    {
      ThermosCook.articles.create(this.model, {
        wait: true,
        success: function(article) {
          console.log("success");
          newArticleView.model = article 
          Backbone.history.navigate("/articles/" + article.id + "/edit", {trigger: true});
        },
        error: function(articleSession, response) {
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
      var errorMessages = this.model.validate();
      ThermosCook.Methods.handleErrors(errorMessages, true);
    }

    console.log(this.model);
  },

});
