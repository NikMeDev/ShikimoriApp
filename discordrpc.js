const client = require('discord-rich-presence')('560519545517768724');

process.on('message', (m) => {
  console.log('CHILD got message:', m);
  client.updatePresence({
    state: m.name,
    details: m.russian,
    largeImageKey: 'favicon',
    instance: true,
  })
});