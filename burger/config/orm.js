const connection = require('./connection.js');

var orm = {
    selectAll: function (tableName, cb) {
        connection.query('SELECT * FROM ' + tableName, function (err, res) {
            if (err) {
                throw err;
            } else {
                cb(res)
            }
        });
    },