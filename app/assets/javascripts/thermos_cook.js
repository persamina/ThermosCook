window.ThermosCook = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    ThermosCook.Store = {  
      addErrorsTemplate: JST["messages/add_errors"],
      addNoticesTemplate: JST["messages/add_notices"],
      addSuccessesTemplate: JST["messages/add_successes"]
    };

    ThermosCook.csrfToken = $("meta[name='csrf-token']").attr('content');

    Backbone._sync = Backbone.sync;
    
    /* define a new sync method */
    // http://blog.softr.li/post/43146401263/finally-correctly-dealing-with-rails-csrf-protection
    // http://ngauthier.com/2011/02/backbone-and-rails-forgery-protection.html
    Backbone.sync = function(method, model, options) {
      console.log("custom sync");
      /* only need a token for non-get requests */
      if (method == 'create' || method == 'update' || method == 'delete') {
        /* grab the token from the meta tag rails embeds */
        var auth_options = {};
        //console.log("meta[name='csrf-param']");
        //console.log($("meta[name='csrf-param']").attr("content"));

        //console.log("meta[name='csrf-token']");
        //console.log($("meta[name='csrf-token']").attr("content"));

        auth_options[$("meta[name='csrf-param']").attr('content')] = ThermosCook.csrfToken; 
        options.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', ThermosCook.csrfToken);
        }

        //auth_options[$("meta[name='csrf-param']").attr('content')] =
        //  $("meta[name='csrf-token']").attr('content');

        /* set it as a model attribute without triggering events */
        model.set(auth_options, {silent: true});
      }
      /* proxy the call to the old sync method */
      return Backbone._sync(method, model, options);
    }

  }
};

$(document).ready(function(){
  ThermosCook.initialize();
  var recipeData;
  var articleData;
  var userData;
  if($("#recipes-data").length > 0) {
    recipeData = JSON.parse($("#recipes-data").html());
  }
  ThermosCook.recipes = new ThermosCook.Collections.Recipes(recipeData, {parse: true});

  if($("#articles-data").length > 0) {
    articleData = JSON.parse($("#articles-data").html());
  }
  ThermosCook.articles= new ThermosCook.Collections.Articles(articleData, {parse: true});

  if($("#user-data").html().trim() != null && $("#user-data").html().trim() != "") {
    userData = JSON.parse($("#user-data").html()).user;
  }
  ThermosCook.CurrentUser = new ThermosCook.Models.User(userData, {parse: true});

  new ThermosCook.Routers.AppRouter($(".content"), $(".nav-buttons"));
  Backbone.history.start();
});
