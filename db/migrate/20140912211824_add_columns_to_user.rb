class AddColumnsToUser < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      #t.string :username
      #t.string :password_digest
      #t.string :email
      #t.boolean :publish_recipes, default: false
      #t.attachment :profile_photo
    end
    
  end
end
