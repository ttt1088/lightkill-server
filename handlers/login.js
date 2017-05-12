var mongoose = require('mongoose');
var user = require('../models/user');

exports.login = function (data, result){
    if(typeof(data.name) !== "string" || typeof(data.password) !== "string"){
        result({errno: 3});
        return;
    }
    if(data.name.length < 2 || data.password.length < 6){
        result({errno: 3});
        return;
    }

    var loginuser = new user({name: data.name, password: data.password});
    user.findOne({name: loginuser.name}, function(err, _finduser){
        if(err){
            result({errno: 1});
            return console.error(err);
        }
        else{
            if(!_finduser){
                result({errno: 4});
            }
            else{
                if(loginuser.password === _finduser.password)
                {
                    result({errno: 0});
                }
                else
                {
                    result({errno: 5});
                }
            }
        }
    });
}