class CreateArticlePhotos < ActiveRecord::Migration
  def change
    create_table :article_photos do |t|
      t.string :description
      t.integer :article_id
      t.timestamps
    end
    add_attachment :article_photos, :photo
  end
end
