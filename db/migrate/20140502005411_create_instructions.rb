class CreateInstructions < ActiveRecord::Migration
  def change
    create_table :instructions do |t|
			t.string :description
			t.integer :order
			t.integer :recipe_id

      t.timestamps
    end
  end
end
