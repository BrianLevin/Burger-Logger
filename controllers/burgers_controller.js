
var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
    res.redirect("/burgers");
  });
  router.get("/burgers", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    burger.all(function(burgerData) {
      // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
      res.render("index", { burger_data: burgerData });
    });
  });
  // post route -> back to index
router.post("/burgers/create", function(req, res) {
    // takes the request object using it as input for burger.addBurger
    burger.create(req.body.burger_name, function(result) {
      // wrapper for orm.js that using MySQL insert callback will return a log to console,
      // render back to index with handle
      console.log(result);
      res.redirect("/");
    });
  });
  // put route -> back to index
router.put("/burgers/:id", function(req, res) {
    burger.update(req.params.id, function(result) {
      // wrapper for orm.js that using MySQL update callback will return a log to console,
      // render back to index with handle
      console.log(result);
      // Send back response and let page reload from .then in Ajax
      res.sendStatus(200);
    });
  });
  
  module.exports = router;

/*

var burger = require('../models/burger.js'); //variables which wil hold the libraries
var express = require('express');

var router = express.Router(); // the router used


router.get("/", function (req, res) { //  bind the property to the function
    burger.selectAll(function (data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burger", function (req, res) { //
    burger.insertOne([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.post("/api/burger/:id", function (req, res) { //load the data from the server
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({ // data will be updated
        devoured: true,
    }, condition, function (result) {
        console.log(result.updateOne);
        if (result.changedRows == 0) {
            
            return res.json({id: result.updateOne})
            // If no rows were changed, then the ID must not exist, so 404
            //return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
*/