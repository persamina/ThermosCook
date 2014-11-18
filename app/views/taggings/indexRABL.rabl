collection @taggings, :object_root => false 
  attributes :id, :type_class, :name
node(:authenticity_token) { form_authenticity_token}
