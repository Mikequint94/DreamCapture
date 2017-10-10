
User.destroy_all
Dream.destroy_all

test_user = User.new(email: "dreamer@gmail.com", password: "password")
test_user.save!


dreams = []

# quotes_bank = [Faker::TwinPeaks.quote,
#           Faker::HitchhikersGuideToTheGalaxy.quote,
#           Faker::Hobbit.quote,
#           Faker::Seinfeild.quote]
#
# def dream_maker
#   dream_text = quotes.sample
# end

30.times do
  dreams.push(Dream.new(body: Faker::TwinPeaks.quote,
                        user_id: test_user.id))
end

dreams.each(&:save!)
