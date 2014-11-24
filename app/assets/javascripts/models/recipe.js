ThermosCook.Models.Recipe = Backbone.Model.extend({
	urlRoot: "/recipes",

	parse: function(respAttr, options) {
		respAttr.ingredients = new ThermosCook.Collections.Ingredients(respAttr.ingredients);
		respAttr.instructions = new ThermosCook.Collections.Instructions(respAttr.instructions);
		respAttr.recipe_photos = new ThermosCook.Collections.RecipePhotos(respAttr.recipe_photos);
		respAttr.taggings = new ThermosCook.Collections.RecipeTaggings(respAttr.taggings);
		respAttr.tags = new ThermosCook.Collections.Tags(respAttr.tags);
		return respAttr;
	},
  validation: {
    name: {
      required: true
    },
    description: {
      required: true
    },
    prep_time: {
      pattern: "number"
    },
    cook_time: {
      pattern: "number"
    },
    ingredients_attributes: function(value) {
      var errors = {"ingredient_errors": {}};
      if(value) {
        value.forEach(function(ingredient_attributes, index) {
          var ingredient = new ThermosCook.Models.Ingredient(ingredient_attributes);
          if (!ingredient.isValid()) {
            errors.ingredient_errors[index] = ingredient.validationError;
          }
        });
      }
      if (!$.isEmptyObject(errors.ingredient_errors)) {
        return errors;
      }
    },
    instructions_attributes: function(value) {
      var errors = {"instruction_errors": {}};
      if(value) {
        value.forEach(function(instruction_attributes, index) {
          var instruction = new ThermosCook.Models.Instruction(instruction_attributes);
          if (!instruction.isValid()) {
            errors.instruction_errors[index] = instruction.validationError;
          }
        });
      }
      if (!$.isEmptyObject(errors.instruction_errors)) {
        return errors;
      }
    },
  },
  /*
  validate: function(attrs, options) {
    var errors = {"ingredient_errors": {}, "instruction_errors": {}};

    if(attrs.ingredients_attributes) {
      attrs.ingredients_attributes.forEach(function(ingredientAttributes, index) {
        var ingredient = new ThermosCook.Models.Ingredient(ingredientAttributes);
        if (!ingredient.isValid()) {
          errors.ingredient_errors[index] = ingredient.validationError;
        }
      });
    }

    if(attrs.instructions_attributes) {
      attrs.instructions_attributes.forEach(function(instructionAttributes, index) {
        var instruction = new ThermosCook.Models.Instruction(instructionAttributes);
        if (!instruction.isValid()) {
          errors.instruction_errors[index] = instruction.validationError;
        }
      });
    }

    if (!$.isEmptyObject(errors.ingredient_errors) || !$.isEmptyObject(errors.instruction_errors) ) {
      return errors;
    }
  },
  */
});
