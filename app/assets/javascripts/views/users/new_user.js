ThermosCook.Views.NewUser = Backbone.View.extend({
	template: JST["users/new_user"],
	events: {
    "submit .new_user": "submit",
	},
	
	render: function() {
		var newUserView= this;
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	submit: function(event) {
    var newUserView= this;
    event.preventDefault();

    var newUserData = $(event.currentTarget).serializeJSON();

    this.model = new ThermosCook.Models.User(newUserData);

    
    Backbone.sync("create", this.model, {
      success: function(userSession, response) {
        if (userSession.user) {
          var message = "a confirmation email was sent check your email to confirm account and log in.";
          ThermosCook.recipes.trigger("newSuccessMessage", {messages: [message]});

          if(userSession.user.authenticity_token) {
            ThermosCook.csrfToken = userSession.user.authenticity_token;
            userSession.user.authenticity_token= "";
          }
        }
      },
      error: function(userSession, response) {
        console.log("ERROR");
        console.log(userSession);
        console.log(response);
      },
    });
    Backbone.history.navigate("#recipes", {trigger: true});
    
	}
});
