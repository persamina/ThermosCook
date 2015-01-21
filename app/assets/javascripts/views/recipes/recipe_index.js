ThermosCook.Views.RecipeIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add change", this.render);
		this.listenTo(this.collection, "remove", this.removeRecipe);
    $(window).on("resize", this.positionTiles); 
	},
  events: {
    "click .tile-like": "likeTile"
  },
	template: JST["recipes/index"],
	recipeTemplate: JST["recipes/recipe_detail_list"],
  articleTemplate: JST["articles/article_detail_list"],
  taggingsTemplate: JST["taggings/find_taggings"],

	render: function() {
		var recipeIndex = this;
    var tileWidth =  250;
		var renderedContent = this.template({currentUser: ThermosCook.CurrentUser});
		this.$el.html(renderedContent);
		this.$("#tiles").empty();

    var tilesPinned = 0;
    ThermosCook.pinnedArticles.each(function(article, index) {
      var imgHeight = tileWidth;
      if(article.get("article_photos").length > 0) {
        imgHeight = imgHeight * article.get("article_photos").models[0].get("ratio");
      }

      var articleRenderedContent = recipeIndex.articleTemplate(
        {article: article,
         placementId: tilesPinned,
         imgHeight: imgHeight,
         imgWidth: tileWidth
        }
      );
			recipeIndex.$(".row-fluid#tiles").append(articleRenderedContent);
      tilesPinned++;
    });

		this.collection.each(function(recipe, index) {
      var imgHeight = tileWidth;
      if(recipe.get("recipe_photos").length > 0) {
        imgHeight = imgHeight * recipe.get("recipe_photos").models[0].get("ratio");
      }

			var recipeRenderedContent = recipeIndex.recipeTemplate(
        {recipe: recipe,
         placementId: tilesPinned,
         imgHeight: imgHeight,
         imgWidth: tileWidth
        }
      );
			recipeIndex.$(".row-fluid#tiles").append(recipeRenderedContent);
      tilesPinned++;
		});

    //this.$(".row-fluid#tiles").imagesLoaded(function() {
    //recipeIndex.positionTiles();
    //});
    this.addTaggings();

		return this;
	},
  getTaggings: function() {
    var newRecipeView = this;
    ThermosCook.recipeTaggings.fetch({
      success: function() {
        newRecipeView.addTaggings();
      }
    });
    
  },
  addTaggings: function() {
    var taggingsRenderedContent = this.taggingsTemplate({taggings: ThermosCook.recipeTaggings});
    this.$(".recipe-taggings").html(taggingsRenderedContent);
  },
  removeRecipe: function(data) {
    $("a[data-recipe-id='"+ data.id +"']").remove();
    this.positionTiles();
  },
  likeTile: function(event) {
    event.preventDefault();
    console.log("like tile");
  },
  positionTiles: function() {

    var recipeIndex = this;
    var tileWidth = 250;
    var previousWidth = this.$("div#data").data().previousWidth;
    if (Math.abs(recipeIndex.$("#tiles").width() - previousWidth) > tileWidth) {
      var totalHorizontalMargin = 20;
      var totalVerticalMargin = 20;
      var numberPlaced = 0;
      var numberPerRow = Math.floor(recipeIndex.$("#tiles").width()/(tileWidth + totalHorizontalMargin));
      var numberToPlace = recipeIndex.$("#tiles").children().length;
      var lowestPosition = new Array(numberPerRow);


      recipeIndex.$("#tiles").children().each(function(index, tile) {
        var lPIndex = numberPlaced % (numberPerRow);

        var positions = {
          leftPosition: 0,
          topPosition: 0
        };
        if (numberPlaced >= numberPerRow) {
          positions.topPosition = lowestPosition[lPIndex];
        } 

        positions.leftPosition = (tileWidth + totalHorizontalMargin) * (numberPlaced % numberPerRow);

        //$($(tile).children()).attr("style", "top: " + positions.topPosition + "px;" + 
        //                                   "left: "+  positions.leftPosition + "px; ");

        recipeIndex.$($(tile).children()).animate({top: positions.topPosition + "px",
                                       left: positions.leftPosition + "px" }, "slow");

        lowestPosition[lPIndex] = positions.topPosition + 
                                  recipeIndex.$($("div.tile")[numberPlaced]).height() +
                                  totalVerticalMargin;
        numberPlaced++;

      });

      recipeIndex.$("div#data").data("previousWidth", recipeIndex.$("#tiles").width());
    }

  },
});
