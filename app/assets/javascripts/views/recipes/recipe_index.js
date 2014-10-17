ThermosCook.Views.RecipeIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(ThermosCook.recipes, "add remove change", this.render);
		this.listenTo(ThermosCook.recipes, "newSuccessMessage", this.newSuccessMessage);
	},
	template: JST["recipes/index"],
	recipeTemplate: JST["recipes/recipe_detail_list"],
	

	render: function() {
		var recipeIndex = this;
		var renderedContent = this.template({currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
		return this;
	},

  renderRecipes: function() {
		var recipeIndex = this;
		this.$("#recipes").empty();
    var totalHorizontalMargin = 10;
    var totalVerticalMargin = 10;
    var numberPlaced = 0;
    var numberPerRow = Math.floor($("#recipes").width()/(200 + totalHorizontalMargin));

    var lowestPosition = new Array(numberPerRow);

    var positions = {
      leftPosition: 0,
      topPosition: 0
    };

		ThermosCook.recipes.each(function(recipe) {
      var lPIndex = numberPlaced % (numberPerRow-1);
      if (numberPlaced >= numberPerRow) {
        positions.topPosition = lowestPosition[lPIndex] + totalVerticalMargin;
      } 
      positions.leftPosition = (200 + totalHorizontalMargin) * (numberPlaced % numberPerRow);
			var recipeRenderedContent = recipeIndex.recipeTemplate(
        {recipe: recipe,
         positions: positions,
         placementId:  numberPlaced
        }
      );
			recipeIndex.$("#recipes").append(recipeRenderedContent);
      lowestPosition[lPIndex] = positions.topPosition + 
                                $($("div.tile")[numberPlaced]).height() +
                                totalVerticalMargin;
      numberPlaced++;
		});
    $("#recipes").imagesLoaded(function() {
      recipeIndex.positionRecipes();
    });

  },


  positionRecipes: function() {
    var totalHorizontalMargin = 10;
    var totalVerticalMargin = 10;
    var numberPlaced = 0;
    var numberPerRow = Math.floor($("#recipes").width()/(200 + totalHorizontalMargin));
    var numberToPlace = $("#recipes").children().length;
    var lowestPosition = new Array(numberPerRow);

    var positions = {
      leftPosition: 0,
      topPosition: 0
    };

    $("#recipes").children().each(function(index, tile) {
      var lPIndex = numberPlaced % (numberPerRow);
      if (numberPlaced >= numberPerRow) {
        positions.topPosition = lowestPosition[lPIndex];
      } 

      positions.leftPosition = (200 + totalHorizontalMargin) * (numberPlaced % numberPerRow);

      $($(tile).children()).attr("style", "top: " + positions.topPosition + "px;" + 
                                         "left: "+  positions.leftPosition + "px; ")

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
