var mongoose = require('mongoose');
var user = require('../models/user');

exports.logout = function (data, result){
    result({errno: 0});
}