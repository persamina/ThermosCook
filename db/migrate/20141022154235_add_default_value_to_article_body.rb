class AddDefaultValueToArticleBody < ActiveRecord::Migration
  def change
    change_column :articles, :body, :text, :default => "Edit Article Here!"
  end
end
