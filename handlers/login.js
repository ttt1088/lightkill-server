var mongoose = require('mongoose');
var user = require('../models/user');

exports.login = function (data){
    console.log('success');
    return data.hello;
}