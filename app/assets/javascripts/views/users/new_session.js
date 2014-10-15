ThermosCook.Views.NewSession= Backbone.View.extend({
	template: JST["users/new_session"],
	events: {
    "submit .new_user": "submit",
	},
	
	render: function() {
		var newSession = this;
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	submit: function(event) {
    var signInView = this;
    event.preventDefault();

    var signInData = $(event.currentTarget).serializeJSON();
    //signInData["session"] = {};
    //signInData.session["email"] = signInData.user["email"];
    //signInData.session["password"] = signInData.user["password"];

    this.model = new ThermosCook.Models.UserSession(signInData);
    
    Backbone.sync("create", this.model, {
      success: function(userSession, response) {
        if (userSession.user) {
          if(userSession.user.authenticity_token) {
            ThermosCook.csrfToken = userSession.user.authenticity_token;
            userSession.user.authenticity_token= "";
          }
          ThermosCook.CurrentUser = new ThermosCook.Models.User(userSession.user, {parse: true});

          Backbone.history.navigate("#recipes", {trigger: true});
        }
      },
      error: function(userSession, response) {
        console.log("ERROR");
        console.log(userSession);
      }
    });
    
	}
});
