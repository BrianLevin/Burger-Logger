const orm = require('../config/orm.js');

var burger = {
    selectAll(cb) {
        orm.selectAll('burger', function (res) {
            cb(res);
        })
    },