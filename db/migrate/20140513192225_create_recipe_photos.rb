class CreateRecipePhotos < ActiveRecord::Migration
  def change
    create_table :recipe_photos do |t|
			t.string :description
			t.integer :recipe_id

      t.timestamps
    end
		add_attachment :recipe_photos, :photo
  end
end
