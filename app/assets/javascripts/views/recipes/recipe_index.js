ThermosCook.Views.RecipeIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(ThermosCook.recipes, "add change", this.render);
		this.listenTo(ThermosCook.recipes, "remove", this.removeRecipe);
		this.listenTo(ThermosCook.recipes, "newSuccessMessage", this.newSuccessMessage);
	},
	template: JST["recipes/index"],
	recipeTemplate: JST["recipes/recipe_detail_list"],
	

	render: function() {
		var recipeIndex = this;
		var renderedContent = this.template({currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
		this.$("#recipes").empty();

		ThermosCook.recipes.each(function(recipe, index) {
			var recipeRenderedContent = recipeIndex.recipeTemplate(
        {recipe: recipe,
         placementId: index 
        }
      );
			recipeIndex.$(".row#recipes").append(recipeRenderedContent);
      $(recipeIndex.$(".row#recipes").children()[index]).hide()
		});


    this.$(".row#recipes").imagesLoaded(function() {
      recipeIndex.positionRecipes();
    });


		return this;
	},
  removeRecipe: function(data) {
    $("a[data-recipe-id='"+ data.id +"']").remove();
    this.positionRecipes();
  },
  positionRecipes: function() {
    var recipeIndex = this;
    var totalHorizontalMargin = 10;
    var totalVerticalMargin = 10;
    var numberPlaced = 0;
    var numberPerRow = Math.floor($("#recipes").width()/(200 + totalHorizontalMargin));
    var numberToPlace = $("#recipes").children().length;
    var lowestPosition = new Array(numberPerRow);


    $("#recipes").children().each(function(index, tile) {
      var lPIndex = numberPlaced % (numberPerRow);

      var positions = {
        leftPosition: 0,
        topPosition: 0
      };
      if (numberPlaced >= numberPerRow) {
        positions.topPosition = lowestPosition[lPIndex];
      } 

      positions.leftPosition = (200 + totalHorizontalMargin) * (numberPlaced % numberPerRow);

      //$($(tile).children()).attr("style", "top: " + positions.topPosition + "px;" + 
      //                                   "left: "+  positions.leftPosition + "px; ");

      $($(tile).children()).animate({top: positions.topPosition + "px",
                                     left: positions.leftPosition + "px" }, "slow");
      $(tile).show();

      lowestPosition[lPIndex] = positions.topPosition + 
                                $($("div.tile")[numberPlaced]).height() +
                                totalVerticalMargin;
      numberPlaced++;

    });

  },

	newSuccessMessage: function(options) {
   console.log("new success message");
     var renderedSuccesses = ThermosCook.Store.addSuccessesTemplate({
      successes: options.messages
    });
    this.$el.find(".successes").html(renderedSuccesses);
  },
  

});
