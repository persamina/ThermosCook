ThermosCook.Views.RecipeIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(ThermosCook.recipes, "add change", this.render);
		this.listenTo(ThermosCook.recipes, "remove", this.removeRecipe);
	},
	template: JST["recipes/index"],
	recipeTemplate: JST["recipes/recipe_detail_list"],
  articleTemplate: JST["articles/article_detail_list"],
	

	render: function() {
		var recipeIndex = this;
		var renderedContent = this.template({currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
		this.$("#tiles").empty();

    var tilesPinned = 0;
    ThermosCook.pinnedArticles.each(function(article, index) {
      var articleRenderedContent = recipeIndex.articleTemplate(
        {article: article,
         placementId: tilesPinned
        }
      );
			recipeIndex.$(".row#tiles").append(articleRenderedContent);
      $(recipeIndex.$(".row#tiles").children()[index]).hide()
      tilesPinned++;
    });

		ThermosCook.recipes.each(function(recipe, index) {
			var recipeRenderedContent = recipeIndex.recipeTemplate(
        {recipe: recipe,
         placementId: tilesPinned
        }
      );
			recipeIndex.$(".row#tiles").append(recipeRenderedContent);
      $(recipeIndex.$(".row#tiles").children()[index]).hide()
      tilesPinned++;
		});

    this.$(".row#tiles").imagesLoaded(function() {
      recipeIndex.positionTiles();
    });

		return this;
	},
  removeRecipe: function(data) {
    $("a[data-recipe-id='"+ data.id +"']").remove();
    this.positionTiles();
  },
  positionTiles: function() {
    var recipeIndex = this;
    var totalHorizontalMargin = 10;
    var totalVerticalMargin = 10;
    var numberPlaced = 0;
    var numberPerRow = Math.floor($("#tiles").width()/(200 + totalHorizontalMargin));
    var numberToPlace = $("#tiles").children().length;
    var lowestPosition = new Array(numberPerRow);


    $("#tiles").children().each(function(index, tile) {
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

});
