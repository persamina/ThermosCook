ThermosCook.Routers.AppRouter = Backbone.Router.extend({

	initialize: function($rootEl, $navButtons) {
		this.$rootEl = $rootEl;
		this.$navButtons = $navButtons;
	},

	routes: {
		"": "recipeIndex",

		"recipes": "recipeIndex",
		"recipes/new": "newRecipe",
		"recipes/search": "recipeSearchIndex",
		"recipes/tagging/:id": "recipeByTagging",
		"recipes/:id": "showRecipe",
		"recipes/:id/edit": "editRecipe",
		"recipes/:id/recipe_photos": "editRecipePhotos",

    "users/sign_in": "signInUser",
    "users/sign_up": "signUpUser",
    "users/user_photo": "editUserPhotos",
    "user": "showUser",

    "articles/new": "newArticle",
		"articles/:id": "showArticle",
		"articles/:id/edit": "editArticle",
		"articles/:id/article_photos": "editArticlePhotos",
	},

	recipeIndex: function() {
		var recipeIndex = new ThermosCook.Views.RecipeIndex({ collection: ThermosCook.recipes });
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(recipeIndex.render().$el, navButtons.render().$el);
		Backbone.history.navigate("recipes");
    recipeIndex.addTaggings();
	},
	recipeSearchIndex: function() {
		var recipeIndex = new ThermosCook.Views.RecipeIndex({ collection: ThermosCook.recipeSearchResults});
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(recipeIndex.render().$el, navButtons.render().$el);
    recipeIndex.addTaggings();
	},

  recipeByTagging: function(id) {
    var appRouter = this;
    var taggingRecipes = new ThermosCook.Collections.Recipes();
    taggingRecipes.url = "recipes/tagging/"+id;
    taggingRecipes.fetch({
      success: function(response) {
        var recipeIndex = new ThermosCook.Views.RecipeIndex( {collection: taggingRecipes} );
        var navButtons = new ThermosCook.Views.NavButtons();
        appRouter._swapView(recipeIndex.render().$el, navButtons.render().$el);
        recipeIndex.addTaggings();
      },
      error: function(response) {

      }
    });
	},

	newRecipe: function() {
		var newRecipe = new ThermosCook.Views.NewRecipe();
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(newRecipe.render().$el, navButtons.render().$el);
    newRecipe.addTaggings();
	},

	showRecipe: function(id) {
		var recipe = ThermosCook.recipes.get(id);
		var showRecipe = new ThermosCook.Views.RecipeDetail({model: recipe});
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(showRecipe.render().$el, navButtons.render().$el);
	},
	
	editRecipe: function(id) {
		var recipe = ThermosCook.recipes.get(id);
		var editRecipe = new ThermosCook.Views.EditRecipe({model: recipe});
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(editRecipe.render().$el, navButtons.render().$el);
	},
	
	editRecipePhotos: function(id) {
		var recipe = ThermosCook.recipes.get(id);
		var editRecipe = new ThermosCook.Views.EditRecipePhotos({model: recipe});
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(editRecipe.render().$el, navButtons.render().$el);
    editRecipe.setupFUEvents();
	},

  signInUser: function() {
    var userSignIn = new ThermosCook.Views.NewSession();
    var navButtons = new ThermosCook.Views.NavButtons();
    this._swapView(userSignIn.render().$el, navButtons.render().$el)
  },

  signUpUser: function() {
    var userSignIn = new ThermosCook.Views.NewUser();
    var navButtons = new ThermosCook.Views.NavButtons();
    this._swapView(userSignIn.render().$el, navButtons.render().$el)
  },

  editUserPhotos: function(id) {
    var editUserPhoto = new ThermosCook.Views.EditUserPhoto({userId: id});
    var navButtons = new ThermosCook.Views.NavButtons();
    this._swapView(editUserPhoto.render().$el, navButtons.render().$el);
    editUserPhoto.setupFUEvents();
  },

  showUser: function() {
    var user = ThermosCook.CurrentUser;
		var showUser = new ThermosCook.Views.UserDetail({model: user});
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(showUser.render().$el, navButtons.render().$el);
  },

  newArticle: function() {
    var newArticle = new ThermosCook.Views.NewArticle();
    var navButtons = new ThermosCook.Views.NavButtons();
    this._swapView(newArticle.render().$el, navButtons.render().$el);
  },

	showArticle: function(id) {
		var article = ThermosCook.articles.get(id);
		var articleDetail = new ThermosCook.Views.ArticleDetail({model: article});
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(articleDetail.render().$el, navButtons.render().$el);
	},

	editArticle: function(id) {
		var article = ThermosCook.articles.get(id);
		var editArticle = new ThermosCook.Views.EditArticle({model: article});
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(editArticle.render().$el, navButtons.render().$el);
    //load ckeditor js file then setupCKEditor
    $.getScript("assets/ckeditor/init", function() {editArticle.setupCKEditor();})
    //editArticle.setupCKEditor();
	},

  editArticlePhotos: function(id) {
		var article = ThermosCook.articles.get(id);
		var editArticle = new ThermosCook.Views.EditArticlePhotos({model: article});
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(editArticle.render().$el, navButtons.render().$el);
    editArticle.setupFUEvents();
  },

  _swapView: function(view, navButtons) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
    
    this._currentNavButtons && this._currentNavButtons.remove();
    this._currentNavButtons = navButtons;
    
		this.$rootEl.html(view);
		this.$navButtons.html(navButtons);
	},


});
