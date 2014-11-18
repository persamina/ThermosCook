class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :tagable_id
      t.string :tagable_type
      t.integer :user_id
      t.timestamps
    end
  end
end
