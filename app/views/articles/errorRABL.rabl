node(:messages, :if => lambda { |m| @article.errors.messages.count > 0} ) { @article.errors.messages }
node(:authenticity_token) { form_authenticity_token }
