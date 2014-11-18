class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.string :name
      t.string :type_class
      t.timestamps
    end
    add_index :taggings, :type_class
  end
end
