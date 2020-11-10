'use strict';

var response  = require('./res');
var connection = require('./connection');
const e = require('express');

exports.index = function(req, res){
    response.ok("App working", res)
};

//get all data mahasiswa
exports.allmahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            connection.log(error);
        }
        else {
            response.ok(rows, res);
        }
    });
};