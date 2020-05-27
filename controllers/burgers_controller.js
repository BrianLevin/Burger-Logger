var burger = require('../models/burger.js');
var express = require('express');

var router = express.Router();


router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burger", function (req, res) {
    burger.insertOne([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.post("/api/burger/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: true,
    }, condition, function (result) {
        console.log(result);
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