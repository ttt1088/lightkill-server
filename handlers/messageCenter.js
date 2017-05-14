var app = require('../app');

var reghandler = require('./reg')
var loginhandler = require('./login');
var logouthandler = require('./logout');

var io = undefined;

module.exports = function() {
    this.initConnection = function(mio) {
        io = mio;

        io.on('connection', function (socket) {
            console.log('a client has connected.socket id :' + socket.id);
            socket.emit('welcome', 'welcome to lightkill -- connect to server success');
            
            socket.on('reg', function(data, fn){
                console.log({socketid: this.id, cmdid: 'reg', cmdbody: data});
                reghandler.reg(data, fn);
            });
            socket.on('login', function(data, fn){
                console.log({socketid: this.id, cmdid: 'login', cmdbody: data});
                loginhandler.login(data, fn);
            });
            socket.on('logout', function(data, fn){
                console.log({socketid: this.id, cmdid: 'logout', cmdbody: data});
                logouthandler.logout(data, fn);
            });
        });
    };
    this.getConnection = function() {
        return io;
    }
}