"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var politician_1 = require("../models/politician");
var category_1 = require("../models/category");
var router = express.Router();
router.post('/', function (req, res) {
    if (req.body._id) {
        politician_1.default.findByIdAndUpdate(req.body._id, { "$set": { "name": req.body.name, "title": req.body.title, "state": req.body.state, "spendMssg": req.body.spendMssg, "militMssg": req.body.militMssg, "immigMssg": req.body.immigMssg, "scitechMssg": req.body.scitechMssg, "eduMssg": req.body.eduMssg,
                "socialMssg": req.body.socialMssg, "envirMssg": req.body.envirMssg, "classMssg": req.body.classMssg, "xFactorMssg": req.body.xFactorMssg, "hcMssg": req.body.hcMssg } }, { "new": true, "upsert": false }, function (err, updatedCategory) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(updatedCategory);
            }
        });
    }
    else {
        var politician = new politician_1.default();
        politician.name = req.body.name;
        politician.title = req.body.title;
        politician.state = req.body.state;
        politician.militMssg = req.body.militMssg;
        politician.scitechMssg = req.body.scitechMssg;
        politician.eduMssg = req.body.eduMssg;
        politician.socialMssg = req.body.socialMssg;
        politician.envirMssg = req.body.envirMssg;
        politician.classMssg = req.body.classMssg;
        politician.xFactorMssg = req.body.xFactorMssg;
        politician.hcMssg = req.body.hcMssg;
        politician.save(function (err, newPolitician) {
            category_1.default.findOne({ name: req.body.category }).exec(function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    category_1.default.findByIdAndUpdate(result._id, { "$push": { "politicians": newPolitician._id } }, { "new": true, "upsert": true }, function (err, updatedCategory) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(updatedCategory);
                        }
                    });
                }
            });
        });
    }
});
router.post('/details', function (req, res) {
    politician_1.default.findByIdAndUpdate(req.body._id, { "$set": { "spendMssg": req.body.spendMssg, "militMssg": req.body.militMssg, "immigMssg": req.body.immigMssg, "scitechMssg": req.body.scitechMssg, "eduMssg": req.body.eduMssg,
            "socialMssg": req.body.socialMssg, "envirMssg": req.body.envirMssg, "classMssg": req.body.classMssg, "xFactorMssg": req.body.xFactorMssg, "hcMssg": req.body.hcMssg } }, { "new": true, "upsert": false }, function (err, updatedCategory) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(updatedCategory);
        }
    });
});
router.get('/:tag', function (req, res) {
    console.log('hello');
    category_1.default.findOne({ name: req.params['tag'] }).populate('politicians').exec(function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(results.politicians);
        }
    });
});
router.get('/details/:id', function (req, res) {
    politician_1.default.find({ _id: req.params['id'] }, (function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result[0]);
        }
    }));
});
router.delete('/:tag', function (req, res) {
    politician_1.default.remove({ _id: req.params['tag'] }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send('success');
        }
    });
});
exports.default = router;
