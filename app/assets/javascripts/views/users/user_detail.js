ThermosCook.Views.UserDetail = Backbone.View.extend({
	template: JST["users/user_detail"],
  events: {
    "click tr": "rowClicked"
  },
	
	render: function() {
		var userDetail = this;
		var renderedContent = this.template({user: this.model, currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
    return this;
	},
  rowClicked: function(event) {
    console.log("rowClicked!");
    var link = $(event.currentTarget).data().href
    if (link) {
      Backbone.history.navigate(link, {trigger: true});
    }
  }
});
