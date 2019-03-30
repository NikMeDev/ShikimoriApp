const client = require('discord-rich-presence')('560519545517768724');

process.on('message', (message) => {
  console.log(message.episode);
  client.updatePresence({
    state: message.name + '/' + message.russian,
    details:'Серия: ' + message.episode + '/' + message.episodes,
    largeImageKey: 'favicon',
    instance: true,
  })
});