require 'faker'

User.destroy_all

100.times do |index|
    User.create!(name: Faker::Name.name, password:Faker::Internet.password, email: Faker::Internet.email)
end