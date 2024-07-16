class Rover {
  constructor(position, mode = 'NORMAL', generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    let results = [];
    
    for(let i = 0; i < message.commands.length; i++){
      let command = message.commands[i];

      if (command.commandType === 'STATUS_CHECK') {
        results.push({
          completed: true,
          roverStatus: {
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts
          }
        });

      } else if (command.commandType === 'MODE_CHANGE') {
        this.mode = command.value;
        results.push({ completed: true });
        
      } else if (command.commandType === 'MOVE') {
        if (this.mode === 'LOW_POWER') {
          results.push({completed: false});
        } else {
          this.position = command.value;
          results.push({ completed: true });
        }
      }
    }

    return {
      message: message.name,
      results: results
    };
  }
}

module.exports = Rover;
