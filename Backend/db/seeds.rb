
User.destroy_all
Dream.destroy_all
Note.destroy_all
Keyword.destroy_all
Tagging.destroy_all

test_user = User.new(email: "dreamer@gmail.com", password: "password")
test_user.save!


def dream_maker
  dream_text = Faker::TwinPeaks.quote + " " +
               Faker::HitchhikersGuideToTheGalaxy.quote + " " +
               Faker::Hobbit.quote
  dream_text
end

dreams = []

def coinflip
  coin = [true, false]
  coin.sample
end

30.times do
  dreams.push(Dream.new(body: dream_maker,
                        user_id: test_user.id))
end


keywords = [Keyword.new(keyword: "scary"),
            Keyword.new(keyword: "amazing"),
            Keyword.new(keyword: "wow"),
            Keyword.new(keyword: "stress"),
            Keyword.new(keyword: "lucid")
          ]

keywords.each do |keyword|
  keyword.save
end


dreams.each do |dream|
  dream.save!
  if coinflip
    Note.create(body: "What a crazy dream!", dream_id: dream.id)
  end
  dream.keyword_ids = keywords.sample.id
end
