var five = require("johnny-five");
var keypress = require('keypress');

var board = new five.Board();

board.on("ready", function() {
  var servo = new five.Servo(4);
  var motors = new five.Motors([
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
  ]);
  var turnLeft = function() {
    motors[0].fwd();
    motors[1].rev();
  }
  var turnRight = function() {
    motors[0].rev();
    motors[1].fwd();
  }
  var forward = function() {
    motors.fwd();
  }
  var reverse = function() {
    motors.rev();
  }
  var stop = function() {
    motors.stop();
  }
  var setMaxSpeed = function() {
    motors.speed(255);
  }
  var setTurnSpeed = function() {
    motors.speed(150);
  }
  var servoUp = function () {
    servo.to(45);
  }
  var servoDown = function () {
    servo.to(120);
  }

  keypress(process.stdin);
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
    }
    if (key && key.name == 'up') {
      setMaxSpeed();
      forward();
    }
    if (key && key.name == 'down') {
      setMaxSpeed()
      reverse();
    }
    if (key && key.name == 'left') {
      setTurnSpeed();
      turnLeft();
    }
    if (key && key.name == 'right') {
      setTurnSpeed();
      turnRight();
    }
    if (key && key.name == 'space') {
      stop();
    }
    if (key && key.name == 'z') {
      servoUp();
    }
    if (key && key.name == 'x') {
      servoDown();
    }
  });
});
