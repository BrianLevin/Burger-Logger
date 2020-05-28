var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'edo4plet5mhv93s3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: "b458jsrw5vr5rgc1",
    password: "mn9xha40spqo2knf",
    database: "ka32lhu615jloj5g"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;