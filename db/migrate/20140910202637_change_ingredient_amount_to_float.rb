class ChangeIngredientAmountToFloat < ActiveRecord::Migration
  def up
    change_column :ingredients, :amount, :float
  end

  def down
    change_column :ingredients, :amount, :decimal
  end
end
