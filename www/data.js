// Connecting to ROS
  // -----------------

  var ros = new ROSLIB.Ros({
    url : 'ws://192.168.1.13:9090'
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });


var buttonElt = document.getElementById("clearListButton");

buttonElt.addEventListener("click", function () 
    {
        var command = new ROSLIB.Message({
    x: 1,
    y: 0,
    theta: 1
  });
  cmdVel.publish(command);
    });

var buttonElt2 = document.getElementById("clearListButton2");

buttonElt2.addEventListener("click", function () 
    {
        var command = new ROSLIB.Message({
    x: -1,
    y: 0,
    theta: -1
  });
  cmdVel.publish(command);
    });

  // Publishing a Topic
  // ------------------

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmdMotor',
    messageType : 'geometry_msgs/Pose2D'
  });

  var command = new ROSLIB.Message({
    x: 0,
    y: 0,
    theta: 0
  });
  cmdVel.publish(command);