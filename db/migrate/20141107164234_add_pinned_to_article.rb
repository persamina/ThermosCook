class AddPinnedToArticle < ActiveRecord::Migration
  def self.up 
    change_table :articles do |t|
      t.boolean :pinned, :default => false
    end
  end
  def down 
    remove_column :articles, :pinned
  end
end
