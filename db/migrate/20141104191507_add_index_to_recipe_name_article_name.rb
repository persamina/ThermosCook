class AddIndexToRecipeNameArticleName < ActiveRecord::Migration
  def change
    add_index :recipes, :name, unique: true
    add_index :articles, :title, unique: true
  end
end
