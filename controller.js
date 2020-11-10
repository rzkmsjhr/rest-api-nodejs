'use strict';

var response  = require('./res');
var connection = require('./connection');
const e = require('express');

exports.index = function(req, res){
    response.ok("App working", res)
};

//get all data mahasiswa
exports.mahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            console.log(error);
        }
        else {
            response.ok(rows, res);
        }
    });
};

//get data mahasiswa by ID
exports.IDmahasiswa = function(req, res){
    let id  = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mhs = ?', [id] , function(error, rows, fields){
        if(error){
            console.log(error);
        }
        else {
            response.ok(rows, res);
        }
    });
};

//insert data mahasiswa
exports.insertmahasiswa = function(req, res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?,?,?)', [nim, nama, jurusan], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }
        else {
            response.ok("Insert success.", res);
        }
    });
};

//update data by id mahasiswa
exports.updatemahasiswa = function(req, res){
    var id = req.body.id_mhs;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mhs=?', [nim, nama, jurusan, id], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }
        else {
            response.ok("Update success.", res);
        }
    });
}

//delete data by id mahasiswa
exports.deletemahasiswa = function(req, res){
    var id = req.body.id_mhs;

    connection.query('DELETE FROM mahasiswa WHERE id_mhs=?', [id], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }
        else {
            response.ok("Delete success.", res);
        }
    });
}

//show group matakuliah
exports.matkulgroup = function (req, res){
    connection.query('SELECT mahasiswa.id_mhs, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matkul = matakuliah.id_matkul and krs.id_mhs = mahasiswa.id_mhs ORDER BY mahasiswa.id_mhs',
    function(error, rows, fields){
        if(error){
            console.log(error);
        }
        else {
            response.nested(rows, res);
        }
    });

}
