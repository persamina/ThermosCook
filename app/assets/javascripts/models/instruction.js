ThermosCook.Models.Instruction = Backbone.Model.extend({
	urlRoot: "/instructions",
  validation: {
    description: {
      maxLength: 255
    },
  }

});
