//View for generating nav buttons in nav bar
ThermosCook.Views.NavButtons= Backbone.View.extend({
	initialize: function() {
	},

  events: {
    "click #destroy_session": "destroySession"
  },

	template: JST["nav_buttons"],

	render: function() {
		var renderedContent = this.template({user: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
		return this;
  },
  destroySession: function(event) {
    event.preventDefault();
    console.log("prevented!");
    var session = new ThermosCook.Models.DestroySession();
    ThermosCook.CurrentUser.url = "/users/sign_out";
    ThermosCook.CurrentUser.destroy({
      wait: true,
      success: function(model, response) {
        if (response && response.csrfToken) {
          ThermosCook.csrfToken = response.csrfToken;
          ThermosCook.CurrentUser = new ThermosCook.Models.User();
          Backbone.history.navigate("", {trigger: true});
        }
      },
      error: function(model, response) {
        console.log("error!");
      },
    });
  }

});
