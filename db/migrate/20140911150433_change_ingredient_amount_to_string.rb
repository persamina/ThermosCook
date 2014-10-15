class ChangeIngredientAmountToString < ActiveRecord::Migration
  def up
    change_column :ingredients, :amount, :string
  end

  def down
    change_column :ingredients, :amount, :float
  end
end
