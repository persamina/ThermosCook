object false
  node(:id) { @like.id }
  node(:user_id) { @like.user_id }
  node(:likeable_id) { @like.likeable_id }
  node(:likeable_type) { @like.likeable_type}
  node(:recipe_id, :if => lambda { |m| @like.likeable_type == "Recipe"}) { @like.likeable_id }
  node(:article_id, :if => lambda { |m|  @like.likeable_type == "Article"}) { @like.likeable_id }
  node(:authenticity_token) { form_authenticity_token }
