var mongoose = require('mongoose');
var user = require('../models/user');

exports.reg = function (data){
    var newuser = new user({name: data.name, password: data.password});
    newuser.save(function (err, newuser) {
        if(err) return console.error(err);
    });
}