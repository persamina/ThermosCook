class AddImageRatioToRecipePhotos < ActiveRecord::Migration
  def self.up 
    change_table :recipe_photos do |t|
      t.float :ratio, :default => 1.0
    end
  end
  def down 
    remove_column :recipe_photos, :ratio
  end
end
