
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

def coinflip
  coin = [true, false]
  coin.sample
end

dreams = []

# 30.times do
#   dreams.push(Dream.new(body: dream_maker,
#                         user_id: test_user.id))
# end

dreams << Dream.new(body: "It was a day I was hanging out with one of my childhood best friends. The best thing about it was that he looked exactly like he did as a kid. It was as if my brain copied and pasted a photo of him from my 3rd grade class photo and put them in my dream. The Events and Adventures we had were kind of strange, I'm not going to go into it, but it was very fun.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams << Dream.new(body: "",
                    user_id: "test_user.id")
dreams <<  Dream.new(body: "",
                    user_id: "test_user.id")
dreams <<  Dream.new(body: "Last night there was this crazy storm I could not believe all of the tornadoes that I could see it was really like right out of the movie Twister, I then decided that I would do outside and try to get some video of the storm but when I went outside the house was sucked away and a new and bigger house was set down in place of my house and then I just went back inside.",
                    user_id: "test_user.id")





keywords = [Keyword.new(keyword: "scary"),
            Keyword.new(keyword: "amazing"),
            Keyword.new(keyword: "wow"),
            Keyword.new(keyword: "stress"),
            Keyword.new(keyword: "happy"),
            Keyword.new(keyword: "strange"),
            Keyword.new(keyword: "time"),
            Keyword.new(keyword: "remember"),
            Keyword.new(keyword: "surreal"),
            Keyword.new(keyword: "anger"),
            Keyword.new(keyword: "exciting"),
            Keyword.new(keyword: "thrilling"),
            Keyword.new(keyword: "space"),
            Keyword.new(keyword: "clouds"),

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
