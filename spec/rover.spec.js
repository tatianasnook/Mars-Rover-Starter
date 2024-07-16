const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
// However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {
  test('constructor sets position and default values for mode and generatorWatts', function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  test('response returned by receiveMessage contains the name of the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message with two commands');
  });

  test('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });

  test('responds correctly to the status check command', function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message with one command');
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[0].roverStatus).toEqual({
      position: 98382,
      mode: 'NORMAL',
      generatorWatts: 110
    })
  });

  test('responds correctly to the mode change command', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
  });

  test('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 11112333)];
    let message = new Message('Test move in low power mode', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
    expect(rover.position).toEqual(98382);
  });

  test('responds with the position for the move command', function() {
    let commands = [new Command('MOVE', 112233448)];
    let message = new Message('Test move command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(rover.position).toEqual(112233448);
  });
  
});
