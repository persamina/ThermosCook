class Recipe < ActiveRecord::Base
  attr_accessible :name, 
									:description, 
                  :prep_time,
                  :cook_time,
									:ingredients_attributes, 
									:instructions_attributes, 
									:recipe_photos_attributes,
									:tags_attributes
	validates :name, :description, presence: true
	validates :name, :uniqueness => true

	has_many :recipe_photos, :dependent => :destroy, :inverse_of => :recipe
	has_many :ingredients, :dependent => :destroy, :inverse_of => :recipe
	has_many :instructions, :dependent => :destroy, :inverse_of => :recipe
  has_many :likes, as: :likeable, :dependent => :destroy, :inverse_of => :likeable
  has_many :tags, as: :tagable, :dependent => :destroy, :inverse_of => :tagable
  has_many :taggings, through: :tags, source: :tagging
  belongs_to :user, :inverse_of => :recipes

	accepts_nested_attributes_for :recipe_photos
	accepts_nested_attributes_for :ingredients, :reject_if => lambda { |ingredient| ingredient[:name].blank?}
	accepts_nested_attributes_for :instructions, :reject_if => lambda { |instructions| instructions[:description].blank?}
	accepts_nested_attributes_for :tags, :reject_if => lambda { |tag| tag[:tagging_id].blank? }

  def self.search_by_tagging_ids(tagging_ids)
    query ="
    SELECT DISTINCT
      recipes.*
    FROM
      recipes"

    where_statement = "
    
    WHERE"

    tagging_ids.each_index do |index|
      query +="
        JOIN
          tags AS tags_#{index}
        ON
          tags_#{index}.tagable_id = recipes.id
        AND
          tags_#{index}.tagable_type = 'Recipe'"
      where_statement +="
       tags_#{index}.tagging_id = #{tagging_ids[index]} 
      "
      index < tagging_ids.length-1 ? where_statement += "AND" : query+=where_statement
    end

    Recipe.find_by_sql(query);
  end
end
