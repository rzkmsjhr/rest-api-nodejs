'use strict';

module.exports = function(app) {
    var myjson = require('./controller');

    app.route('/').get(myjson.index);
    app.route('/mahasiswa').get(myjson.mahasiswa);
    app.route('/mahasiswa/:id').get(myjson.IDmahasiswa);
    app.route('/insert/').post(myjson.insertmahasiswa);
    app.route('/update/').put(myjson.updatemahasiswa);
    app.route('/delete/').delete(myjson.deletemahasiswa);
    app.route('/groupmatkul/').get(myjson.matkulgroup);
}