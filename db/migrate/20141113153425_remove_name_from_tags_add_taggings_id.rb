class RemoveNameFromTagsAddTaggingsId < ActiveRecord::Migration
  def up
    remove_column :tags, :name
    add_column :tags, :tagging_id, :integer
  end

  def down
    add_column :tags, :name, :string
    remove_column :tags, :tagging_id
  end
end
