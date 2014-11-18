ThermosCook.Views.EditUserPhoto= Backbone.View.extend({
  initialize: function(options) {
  },
	template: JST["users/edit_user_photos"],
	events: {
	},
	
	render: function() {
		var editUserPhotoView= this;
		var renderedContent = this.template({userId: ThermosCook.CurrentUser.id, csrfToken: ThermosCook.csrfToken});
		this.$el.html(renderedContent);
		return this;
	},
  setupFUEvents: function() {
		var editUserPhotoView= this;
    
    //$("#fileupload").bind("fileuploadadd", function(event, data) {
      //console.log("added");
    //});
    $("#fileupload").bind("fileuploadsubmit", function(event, data) {
      $(":submit.submit").append("<img class='loading' src='loading3.gif'>");
    });

    $("#fileupload").bind("fileuploaderror", function(event, data) {
      $("img.loading").remove();
    });

    $("#fileupload").bind("fileuploaddone", function(event, data) {
      $("img.loading").remove();
      var userData;
      if(data.result.files) {
        userData = data.result.files[0];
      } else {
        userData = data.result.user;
      }
      if(userData.authenticity_token) {
        ThermosCook.csrfToken = userData.authenticity_token;
        userData.authenticity_token = "";
      }
      var userPhoto = new ThermosCook.Models.UserPhoto(userData);
      ThermosCook.CurrentUser.set("user_photos", new ThermosCook.Collections.UserPhotos([userData]))

      Backbone.history.navigate("#recipes", {trigger: true});
    });
    
  },

});
