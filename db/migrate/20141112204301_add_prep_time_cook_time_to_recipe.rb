class AddPrepTimeCookTimeToRecipe < ActiveRecord::Migration
  def self.up
    change_table :recipes do |t|
      t.integer :prep_time
      t.integer :cook_time
    end
  end
  def down
    remove_column :recipes, :prep_time
    remove_column :recipes, :cook_time

  end
end
