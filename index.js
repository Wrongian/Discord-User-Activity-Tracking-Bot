const Discord = require('discord.js');
const bot = new Discord.Client();
require("dotenv").config()



const {TOKEN} = process.env
console.log(TOKEN)

var userProfiles = {};

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });
  
bot.on('message', msg => {
      if(Math.random()<=(5/100)&&!msg.author.bot){
        msg.reply('Use Ecosia!');
      }
  });

  setInterval(function(){
    Spy();
  }, 60*1000); // 60 * 1000 milsec

function Spy(){
  bot.users.forEach(user =>{ //iterate over each user
    if(user.presence.status == "online" && !user.bot){ //check if user is online and is not a bot
      if(!userProfiles[user.username]){ // if user hasn't  created a profile before
        var userProfile = {}; // create new profile
        userProfile["online"] = 0; //initialise online
        userProfiles[user.username] = userProfile; //set profile to object literal
      }
      if(user.presence.game){ //check if they are playing a game
        if(userProfiles[user.username][user.presence.game.name] === undefined){// check if game does not exists 
          userProfiles[user.username][user.presence.game.name] = 1; //if game does not exist then create one create one for it
        }
        else{//else add 1 to it
          userProfiles[user.username][user.presence.game.name] += 1; 
        }        
     }
     userProfiles[user.username]["online"] ++; // increment online counter
    }
  })
  console.log(userProfiles); //visually see it for debugging purposes
}

bot.login(TOKEN); //discord bot needs to login lol
