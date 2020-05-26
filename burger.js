const orm = require('../config/orm.js');

var burger = {
    selectAll(cb) {
        orm.selectAll('burger', function (res) {
            cb(res);
        })
    },

    insertOne(cols, vals, cb) {
        orm.insertOne('burger', cols, vals, function (res) {
            cb(res);
        });
    },