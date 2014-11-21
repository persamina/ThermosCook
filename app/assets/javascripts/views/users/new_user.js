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

    this.model = new ThermosCook.Models.User(newUserData.user);
    this.model.set(newUserData);
    Backbone.Validation.bind(this);

    
    if (this.model.validate() == undefined) 
    {
      this.model.save({}, {
        success: function(userSession, response) {
          if (userSession.get("user")) {
            Backbone.history.navigate("#recipes", {trigger: true});
            var message = "a confirmation email was sent check your email to confirm account and log in.";
            ThermosCook.Dispatcher.trigger("newSuccessMessage", {messages: [message]});

            if(userSession.get("user").authenticity_token) {
              ThermosCook.csrfToken = userSession.get("user").authenticity_token;
              userSession.get("user").authenticity_token= "";
            }
          }
        },
        error: function(userSession, response) {
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
      var errorMessages = this.model.validate()
      ThermosCook.Methods.handleErrors(errorMessages, true);
    }
    
	},
});
