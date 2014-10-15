class AddPhotoToUser < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :photo
    end
  end
end
