Messages = new Meteor.Collection('messages');

if(Meteor.isServer){

  Meteor.startup(function(){

    // Initialize Messages
    if (Messages.find().count() != MessagesJSON.length) {
      MessagesJSON.forEach(function(message) {
        Messages.upsert(
          { message: message },
          { $set: {
              words: message.split(" ").length,
              message: message
            }
          }
        );
      });
    }
  });
}

MessagesJSON = [
  "Oh boy",
  "Bradley Rules",
  "Apples for ever",
  "Bananas suck",
  "Boy these pretzels are makin me thirsty",
  "If you know what happened in the Mets game don't tell me I taped it Hello",
  "It became very clear to me sitting out there today that every decision I've made in my entire life has been wrong My life is the complete opposite of everything I want it to be Every instinct I have in every aspect of life be it something to wear something to eat it's all been wrong",
  "I'm not a lesbian I hate men but I'm not a lesbian",
  "Yo Yo Ma",
  "Looking at cleavage is like looking at the sun You don't stare at it It's too risky Ya get a sense of it and then you look away",
  "You have the chicken the hen and the rooster The chicken goes with the hen So who is having sex with the rooster",
  "The cat mrrreeeooowww is out of the bag",
  "Good for you Jack",
  "Jerry just remember it's not a lie if you believe it",
  "Do you ever get down on your knees and thank God you know me and have access to my dementia",
  "We don't know how long this will last They are a very festive people",
  "I had a dream last night that a hamburger was eating me",
  "You know I always wanted to pretend I was an architect",
  "If you're not gonna be a part of a civil society then just get in your car and drive on over to the East Side",
  "I'm speechless I have no speech",
  "All right hey you've been great See you at the cafeteria",
  "I have been performing feats of strength all morning",
  "I lie every second of the day My whole life is a sham",
  "I'm on the Mexican whoa oh oh radio",
  "I have a bad feeling that whenever a lesbian looks at me they think That's why I'm not a heterosexual",
  "Hi my name is George I'm unemployed and I live with my parents",
  "Just remember when you control the mail you control information",
  "I don't trust the guy I think he regifted then he degifted and now he's using an upstairs invite as a springboard to a Super bowl sex romp",
  "I don't think I've ever been to an appointment in my life where I wanted the other guy to show up",
  "Boy a little too much chlorine in that gene pool",
  "Let's watch them slice this fat bastard up",
  "Do you have any idea how much time I waste in this apartment",
  "See this is what the holidays are all about Three buddies sitting around chewing gum",
  "The carpet sweeper is the biggest scam perpetrated on the American public since One Hour Martinizing",
  "You know it's so nice when it happens good",
  "He fires people like it's a bodily function",
  "Here's to feeling good all the time",
  "I'll be back We'll make out",
  "You very bad man Jerry Very bad man",
  "Ah look I I'm sorry to bother you but I'm a US postal worker and my mail truck was just ambushed by a band of backwoods mail-hating survivalists"
];
