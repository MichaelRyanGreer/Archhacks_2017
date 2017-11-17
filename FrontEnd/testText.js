var twilio = require('twilio');
 
// Find your account sid and auth token in your Twilio account Console.
var client2 = new twilio('AC359650eea11349a6aef51061848bd153','abe1bdd4966c1aff9fb4d0605f5dce27');
 
const client = require('twilio')('AC359650eea11349a6aef51061848bd153','abe1bdd4966c1aff9fb4d0605f5dce27');
// Send the text message.
client.messages.create({
  to: '+18454993436',
  from: '+18448315381',
  body: 'Test Jack Twilio!'
});
