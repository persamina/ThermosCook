class AddUsernameToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.string :username
    end
  end
end
