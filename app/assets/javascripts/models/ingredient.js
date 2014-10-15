ThermosCook.Models.Ingredient = Backbone.Model.extend({
	urlRoot: "/ingredients",
  validate: function(attrs, options) {
    if (attrs.amount == "") 
    {
      return;
    }
    if ($.isNumeric(attrs.amount)) 
    {
      return;
    }
    if(this.isFraction(attrs.amount))
    {
      return;
    }
    return 'must be valid number or fraction i.e. " 5 or 1/4"'
    
  },
  isFraction: function(potentialFraction) {
    var slashIndex = potentialFraction.indexOf("/");
    if(slashIndex == -1) {
      return false;
    }
    var num = potentialFraction.slice(0, slashIndex)
    var den = potentialFraction.slice(slashIndex+1, potentialFraction.length)
    if(!$.isNumeric(num) || !$.isNumeric(den)) 
    {
      return false;
    }
    return true;
  },

});
