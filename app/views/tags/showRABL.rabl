object false
  node(:id) { @tag.id }
  node(:user_id) { @tag.user_id }
  node(:tagable_id) { @tag.tagable_id }
  node(:tagable_type) { @tag.tagable_type}
  node(:recipe_id, :if => lambda { |m| @tag.tagable_type == "Recipe"}) { @tag.tagable_id }
  node(:article_id, :if => lambda { |m|  @tag.tagable_type == "Article"}) { @tag.tagable_id }
  node(:authenticity_token) { form_authenticity_token }
