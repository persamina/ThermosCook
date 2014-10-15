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
    var newArticleView = this;
    event.preventDefault();
    var newArticleData = $(event.currentTarget).serializeJSON().article;
    this.model = new ThermosCook.Models.Article(newArticleData);
    ThermosCook.articles.create(this.model, {
      wait: true,
      success: function(article) {
        console.log("success");
        newArticleView.model = article 
        Backbone.history.navigate("/articles/" + article.id + "/article_photos", {trigger: true});
      }
    });

    console.log(this.model);
  },

});
