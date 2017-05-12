var mongoose = require('mongoose');
var user = require('../models/user');

exports.reg = function (data, result){
    if(typeof(data.name) !== "string" || typeof(data.password) !== "string"){
        result({errno: 3});
        return;
    }
    if(data.name.length < 2 || data.password.length < 6){
        result({errno: 3});
        return;
    }

    var newuser = new user({name: data.name, password: data.password});
    user.findOne({name: newuser.name}, function(err, _finduser){
        if(err){
            result({errno: 1});
            return console.error(err);
        }
        else{
            if(_finduser){
                result({errno: 2});
            }
            else{
                newuser.save(function (err, _newuser) {
                    if(err){
                        result({errno: 1});
                        return console.error(err);
                    }
                    result({errno: 0});
                });
            }
        }
    });
}