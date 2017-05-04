var app = require('../app');

var reghandler = require('./reg')
var loginhandler = require('./login');

var io = undefined;

module.exports = function() {
    this.initConnection = function(mio) {
        io = mio;

        io.on('connection', function (socket) {
            socket.emit('welcome', 'welcome to lightkill -- connect to server success');
            socket.on('my other event', function (data, fn) {
                //fn('callback');
                console.log(data);
            });
            socket.on('reg', function(data, fn){
                console.log({cmdid: 'reg', cmdbody: data});
                reghandler.reg(data);
            });
        });
    };
    this.getConnection = function() {
        return io;
    }
}