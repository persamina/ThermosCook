window.ThermosCook = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Methods: {

    clearFormErrors: function() {
      var numElements = $("div.control-group").length;
      var elements = $("div.control-group");
      for(var index=0; index<numElements; index++) {
        var currentElement = $(elements[index]);
        currentElement.removeClass("error");
        currentElement.find(".help-inline").html("");
      }
    },
    handleErrors: function(errorMessages, backboneError) {
      var methodsScope = this;
      ThermosCook.Methods.clearFormErrors();
      for(var name in errorMessages) {
        if(name == "ingredients_attributes") {
          ThermosCook.Methods.handleNestedErrors(name, errorMessages[name]);
        } else if ( name == "instructions_attributes"){
          ThermosCook.Methods.handleNestedErrors(name, errorMessages[name]);
        } else {
          $("div."+name).addClass("error");
          $("div."+name + " span.help-inline").html("");
          //capitalize name
          var nameCapitalized = name[0].toUpperCase() + name.slice(1);
          if(backboneError) {
            $("div."+ name + " span.help-inline").append(errorMessages[name] + ".");
          } else {
            errorMessages[name].forEach(function(message) {
              $("div."+name + " span.help-inline").append(nameCapitalized + " " + message + ".");
            });
          }
        }
      }
    },
    handleNestedErrors: function(name, validationErrors ) {
      
      if(name.indexOf("_") >= 0) {
        name = name.slice(0, name.indexOf("_"));
        var lastIndex = name.length-1;
        if(name[lastIndex] == "s") {name = name.slice(0, lastIndex);}
      }
      var numberNestedValues= $("div." + name).length;
      for(var index=0; index<numberNestedValues; index++) {
        if(validationErrors[name+"_errors"][index]) {
          $("div."+name+"s").find("[data-i-id=" + index + "]").addClass("error");
          $("span[data-i-id=" + index+ "]").html(validationErrors[name + "_errors"][index]);
        } else {
          $("div."+name+"s").find("[data-i-id=" + index + "]").removeClass("error");
          $("span[data-i-id=" + index+ "]").html("");
        }
      }
    },

  },
  Dispatcher: _.clone(Backbone.Events),
  setupEvents: function() {
    ThermosCook.Dispatcher.on("newSuccessMessage", function(options) {
      console.log("new success message");
        var renderedSuccesses = ThermosCook.Store.addSuccessesTemplate({
          successes: options.messages
        });
      $(".successes").html(renderedSuccesses);
    });
    ThermosCook.Dispatcher.on("newErrorMessage", function(options) {
      console.log("new error message");
        var renderedErrors = ThermosCook.Store.addErrorsTemplate({
          errors: options.messages
        });
      $(".errors").html(renderedErrors);
    });
    ThermosCook.Dispatcher.on("newNoticeMessage", function(options) {
      console.log("new notice message");
        var renderedErrors = ThermosCook.Store.addNoticesTemplate({
          notices: options.messages
        });
      $(".notices").html(renderedSuccesses);
    });
  },
  initialize: function() {

    ThermosCook.setupEvents();
    ThermosCook.Store = {  
      addErrorsTemplate: JST["messages/add_errors"],
      addNoticesTemplate: JST["messages/add_notices"],
      addSuccessesTemplate: JST["messages/add_successes"],
    };
    ThermosCook.csrfToken = $("meta[name='csrf-token']").attr('content');

    Backbone._sync = Backbone.sync;
    /* define a new sync method */
    // http://blog.softr.li/post/43146401263/finally-correctly-dealing-with-rails-csrf-protection
    // http://ngauthier.com/2011/02/backbone-and-rails-forgery-protection.html
    Backbone.sync = function(method, model, options) {
      /* only need a token for non-get requests */
      if (method == 'create' || method == 'update' || method == 'delete') {
        /* grab the token from the meta tag rails embeds */
        var auth_options = {};

        auth_options[$("meta[name='csrf-param']").attr('content')] = ThermosCook.csrfToken; 
        options.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', ThermosCook.csrfToken);
        }

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
  var taggingsData;
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

  var pinnedArticles = ThermosCook.articles.where({pinned: true});
  ThermosCook.pinnedArticles = new ThermosCook.Collections.Articles(pinnedArticles);

  if($("#user-data").html()) {
    if($("#user-data").html().trim() != null && $("#user-data").html().trim() != "") {
      userData = JSON.parse($("#user-data").html()).user;
    }
    ThermosCook.CurrentUser = new ThermosCook.Models.User(userData, {parse: true});
  }

  if($("#taggings-data").length > 0) {
    taggingsData= JSON.parse($("#taggings-data").html());
  }
  ThermosCook.recipeTaggings= new ThermosCook.Collections.RecipeTaggings(taggingsData, {parse: true});
  ThermosCook.searchCount = 0;

  new ThermosCook.Routers.AppRouter($(".content"), $(".nav-buttons"));
  Backbone.history.start();
});
