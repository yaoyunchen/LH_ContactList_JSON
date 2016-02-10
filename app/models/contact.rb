class Contact < ActiveRecord::Base

  #has_many :numbers, dependent: :destroy

  validates :name, 
    presence: true
  
  validates :email,
    presence: true,
    uniqueness: true,
    format: {with: Devise.email_regexp}

  # def to_json
  #   {name: name, email: email}.to_json 
  # end

  # def to_s
  #   ret_str = "ID: #{self.id}, Name: #{self.name}, Email: #{self.email}, Phone: "
  #   numbers = self.numbers.to_a
  #   if numbers.empty?
  #     ret_str << "N/A"
  #   else
  #     ret_str << get_numbers(numbers)
  #   end
  #   ret_str
  # end

  # def get_numbers(numbers)
  #   ret_str = ""
  #   numbers.each {|number| ret_str << "#{number} "}
  #   ret_str
  # end
end