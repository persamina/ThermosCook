class AddServingsToRecipes < ActiveRecord::Migration
  def self.up 
    change_table :recipes do |t|
      t.integer :servings, :default => 1
    end
  end
  def down 
    remove_column :recipes, :servings
  end
end
