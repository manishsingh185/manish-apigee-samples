var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
	var Usergrid = require('usergrid');
	Usergrid.init({orgId: '7f353860-e0ba-11e3-b427-61a5345290a0', appId: '7f70bac0-e0ba-11e3-8788-1bf7664d4717'});
	var entity = {
    			type: 'chatmessage',
    			message: msg,
				sender: 'user'};
	Usergrid.POST(entity, function(error, usergridResponse, entity) {
    // entity should now have a uuid property and be created
            console.log("Entity Created in Apigee BaaS");
	});
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});