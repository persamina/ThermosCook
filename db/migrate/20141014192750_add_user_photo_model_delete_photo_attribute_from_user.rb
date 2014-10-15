class AddUserPhotoModelDeletePhotoAttributeFromUser < ActiveRecord::Migration
  def change
    create_table :user_photos do |t|
			t.integer :user_id
      t.timestamps
    end
		add_attachment :user_photos, :photo
    remove_attachment :users, :photo
  end
end
