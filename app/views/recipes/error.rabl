node(:messages, :if => lambda { |m| @recipe.errors.messages.count > 0} ) { @recipe.errors.messages }
node(:authenticity_token) { form_authenticity_token }
