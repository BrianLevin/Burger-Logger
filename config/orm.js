const connection= require('./connection');


function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {

    var arr = [];

    for (var key in ob) {
arr.push(key + "=" + ob[key]);

    }
    return arr.toString();
}

var orm = {
all: function(tableInput, cb) {
    var queryString= "Select * From " + tableInput + ";"
    connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
        }
        cb(result);
    });
},
 // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into

  create: function(table, cols, vals, cb) {
var queryString =" INSERT INTO " + table;

queryString += "("

queryString += cols.toString();
queryString += " )";
queryString += "VALUES (";
queryString += printQuestionMarks(vals.length);
queryString += ") ";

console.log(queryString);

connection.query(queryString, vals, function(err, result) {
  if (err) {
    throw err;
  }
  cb(result);
});

  },

 // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;




/*
const connection = require('./connection.js'); // connect to the connection folder

var orm = { //data which will be accessed using relationap databses
    selectAll: function (tableName, cb) {
        connection.query('SELECT * FROM ' + tableName, function (err, res) {
            if (err) {
                throw err;
            } else {
                cb(res)
            }
        });
    },

    insertOne: function (table, cols, vals, cb) { //function forinserting the data
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });

    },

    updateOne: function (table, objColVals, condition, cb) { // function to updaye the data
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
}
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

module.exports = orm;

*/