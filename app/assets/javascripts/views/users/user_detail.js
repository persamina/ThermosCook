ThermosCook.Views.UserDetail = Backbone.View.extend({
	template: JST["users/user_detail"],

  events: {
    "click tr": "rowClicked",
    "mouseenter .user-image": "imageMouseEnter",
    "mouseenter .image-hover": "imageMouseEnter",
    "mouseleave .user-image": "imageMouseLeave"
  },
	
	render: function() {
		var userDetail = this;
		var renderedContent = this.template({user: this.model, currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
    this.delegateEvents();
    return this;
	},
  rowClicked: function(event) {
    console.log("rowClicked!");
    var link = $(event.currentTarget).data().href
    if (link) {
      Backbone.history.navigate(link, {trigger: true});
    }
  },
  imageMouseEnter: function(event) {
    $(".hover-link").show();
  },
  imageMouseLeave: function(event) {
    $(".hover-link").hide();
  },
});
