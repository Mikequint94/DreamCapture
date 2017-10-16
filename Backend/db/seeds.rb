
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
dreams << Dream.new(body: "Gotham city was under attack by 500 foot multicolored pigs whereing straw hats and overalls. The were eating everyone, so I had to team up with Indiana Jones and the The Scooby Doo gang. For some reason, Scooby was sick though. We built this intricate trap inside a giant mini-golf windmill, and almost had them. Sadly, they escaped and ate everyone.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "I was swimming underwater and I realized I could actually breathe!  I was like a mermaid, queen of the sea.  This large sea turtle came up to me, and I could somehow understand him.  He asked how I had the ability to be under the water with him.  I was too in shock with everything going on I didn't even respond to him!  Then I saw a large whale swimming towards me and that's when my alarm went off ",
                    user_id: "test_user.id")
dreams << Dream.new(body: "Somehow I kept teleporting from place to place.  First I was in my childhood home, then I was in my highschool, gymnasium, and then I was in outer space!  I was looking down at the world for what seemed like Years.  Floating there just observing everything I wanted to.  I felt so at peace.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "My brother and sister were home for Thanksgiving and kept asking me to play tennis with them but I really didn't want to so I said no.  Except in my dream I remember that I felt bad for saying no and wished I could have said yes but there was something preventing me for some reason.  I watched TV on the couch for the rest of the dream.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "There was this glowing green light at the end of the cave.  I wasn't scared though so I kept walking towards it.  Turns out it was a firefly!  It was so beautiful.  We danced.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "This is the third time I've dreamt about ants crawling on me.  I keep flicking them off but they were just always there.  Then my friend Patrick showed up and I was showing him all the ants but then when I looked at myself all of the ants were gone and he thought I was crazy.  I was embarassed.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "Another coding dream!  It's so hard to explain but like all of these words and numbers were just flowing together and swirling around but also like real and coming to life.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "I was blowing my nose and then ran out of tissues.  But then suddenly I was in school and I had to take a test but my nose was flowing and I had to hide my face from all my friends because I was so embarassed.  I was running around looking for tissues but could not find any tissues anywhere, then I finally found this giant tissue box and when I reached for the tissue and was finally going to get a chance to blow my nose and satisfy myself I woke up.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "My dog was running around in the woods so I chased after her and then we were playing a game of chess somehow.  And then my dog turned into my my 4th grade science teacher and said lengardian leviosa to eachother and were lifted into the trees just floating around.  Then it was my dog again but she could speak.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "Asparagus plants were actually alive and I was just kind of watching a family of asparagus grow up and find love and die and stuff.  It was kind of sweet, and I wasn't actually in the dream at all but just watching this scene like it was a movie.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "Jesse and I were sitting on the beach in Phi Phi and sipping on some coconuts.  The ocean breeze was warm on my face, and the sound of the waves soothed me.  Everything was bright and when I looked around There was nothing else there.  In fact, Jesse wasn't even there, but I knew I was with him at first.  I feel so relaxed now and keep going back into this dream.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "I won the mega millions lottery!  Woohoo!  I was so excited and I called Mom on the phone and she started screaming and dancing with joy.  It was so happy!  I told her I would donate all of the money to the rainforests and she was so proud of me for finally winning and doing what I said I would with the money if I ever ended up winning.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "A bird was flying around my head saying something, but it was too quiet to hear. I asked it if it could speak louder, but then it just flew away. I hope I didn't hurt its feelings.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "I was floating in space looking down on Earth. Everything was so far away. I don't know how I got up there, but it seemed nice. It was calm. Next thing I knew the sun was up and I was awake",
                    user_id: "test_user.id")
dreams << Dream.new(body: "A river was flowing through my room. I couldn't get across it to get to the door. A frog was sitting next to the river and starting singing that song my mother used to sing.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "I was driving my car home, but I couldn't find the way. When I looked out the window I could see clouds below me. Then I was flying along some birds and felt so happy. Some balloons floated by and I knew it wasn't my birthday, but I felt they were for me.",
                    user_id: "test_user.id")
dreams << Dream.new(body: "It was really cold outside, but I was OK because I had a fireplace in my house. My friends were all inside with me and we were playing games until the snow stopped. I looked out the window and could see the snow melting and the season turn to spring. Flowers started blooming everywhere.",
                    user_id: "test_user.id")
dreams <<  Dream.new(body: "The train was late again and I was standing there waiting. I kept waiting and waiting. There was someone else there too, but I couldn't tell who it was. I felt I knew them, though. It was someone I knew well, but I couldn't talk to them. The train never came.",
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

note = ["Wow... I have no idea where this came from haha",
        "This is so crazy.  How strange is my unconscious mind!",
        "Yikes!  What a mind I have.",
        "hmm, I think this came from my phone call with Brian last night.",
        "I wish this was real.",
        "This literally would never happen, but it was nice to dream about",
        ":)",
        "so funny and strange at the same time",
        "I kind of wish this was real life :p",
        "How does my brain even think of things like this."]

dreams.each do |dream|
  dream.save!
  if coinflip
    Note.create(body: note.sample, dream_id: dream.id)
  end
  dream.keyword_ids = keywords.sample.id
end
