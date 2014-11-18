class RemovePrepTimeCookTimeFromUser < ActiveRecord::Migration
  def up
    remove_column :users, :prep_time
    remove_column :users, :cook_time
  end

end
