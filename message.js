class Message {
   constructor(name, commands){
      this.name = name;
      if(!name){
         throw Error('Command name is required.');
      }
      this.commands = commands;
   }
}

module.exports = Message;
