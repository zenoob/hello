// Connecting to ROS
  // -----------------

    var ros = new ROSLIB.Ros({ url : 'ws://192.168.1.200:9090' });

    ros.on('connection', function() {
        console.log('Connected to websocket server.');
    });

     ros.on('error', function(error) {
        console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', function() {
        console.log('Connection to websocket server closed.');
    });

    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Pose2D'
    });

    var command = new ROSLIB.Message({
        x: 0,
        y: 0,
        theta: 0
    });
    cmdVel.publish(command);
    var prevCommand = command;

    var options = {
        zone: document.getElementById('zone_joystick'),
        mode: 'static',
        position: {left: '50%', top: '50%'},
        color: 'red',
        size: 100
      };
    
    //var i=0;
    var manager = nipplejs.create(options);
    manager.on('move', function (evt, data) {
        var maxSpeed = data.instance.options.size/2;
        var speed = data.distance/maxSpeed*100;
        var direction = data.angle.degree;

        speed = Math.abs(speed) > 30 ? 100 : 0;
        speed = direction < 180 ? speed : -speed;

        direction = direction > 180 ? 360-direction : direction;

        direction = direction <= 65 ? 0 : direction;
        direction = direction > 65 && direction < 115 ? 90: direction;
        direction = direction >= 115 ? 180 : direction;

        direction = direction - 90;

        var command = new ROSLIB.Message({
            x: speed,
            y: 0,
            theta: direction
        });

        if (command.x == prevCommand.x && command.theta == prevCommand.theta) {}
        else
        {
            cmdVel.publish(command);
            prevCommand = command;
            //i=i+1;
        }
    });

manager.on('end', function (evt, data) {
    command = new ROSLIB.Message({
        x: 0,
        y: 0,
        theta: 0
        });
    cmdVel.publish(command);
});

