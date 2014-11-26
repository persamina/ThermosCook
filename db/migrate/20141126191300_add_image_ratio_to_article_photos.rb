class AddImageRatioToArticlePhotos < ActiveRecord::Migration
  def self.up 
    change_table :article_photos do |t|
      t.float :ratio, :default => 1.0
    end
  end
  def down 
    remove_column :article_photos, :ratio
  end
end
