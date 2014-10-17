ThermosCook.Routers.AppRouter = Backbone.Router.extend({

	initialize: function($rootEl, $navButtons) {
		this.$rootEl = $rootEl;
		this.$navButtons = $navButtons;
	},

	routes: {
		"": "recipeIndex",

		"recipes": "recipeIndex",
		"recipes/new": "newRecipe",
		"recipes/:id": "showRecipe",
		"recipes/:id/edit": "editRecipe",
		"recipes/:id/recipe_photos": "editRecipePhotos",

    "user": "showUser",
    "users/sign_in": "signInUser",
    "users/sign_up": "signUpUser",
    "users/user_photo": "editUserPhotos",

    "articles/new": "newArticle",
		"articles/:id/article_photos": "editArticlePhotos",
	},

	recipeIndex: function() {
		var recipeIndex = new ThermosCook.Views.RecipeIndex();
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(recipeIndex.render().$el, navButtons.render().$el);
    recipeIndex.renderRecipes();
		Backbone.history.navigate("recipes");
	},

	newRecipe: function() {
		var newRecipe = new ThermosCook.Views.NewRecipe();
    var navButtons = new ThermosCook.Views.NavButtons();
		this._swapView(newRecipe.render().$el, navButtons.render().$el);
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
    this._swapView(editUserPhoto.render().$el, navButtons.render().$el)
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
    this._swapView(newArticle.render().$e, navButtons.render().$ell)
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
	}


});
