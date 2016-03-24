var express = require('express');
var storage = require('node-persist');
var router = express.Router();

storage.initSync();

/* GET team listing. */
router.get('/', function(req, res) {
    console.log(storage.getItem('team'));

    if (storage.getItem('team')) {
        return res.status('200').json(storage.getItem('team'));
    }else{
        res.status('404').json({ "error": "No Team members found" });
    }
});

/* GET team member. */
router.get('/:member', function(req, res) {
    var memberFound;

    if (storage.getItem('team')) {
        var members   = storage.getItem('team');
        var memberId = req.params.member;
        memberFound = members.find(function(element) {
            return element.id === memberId || element.username === memberId;
        });
    }

    if(memberFound){
        res.status('200').json(memberFound);
    } else {
        res.status('404').json({ "error": "Team member not found" });
    }
});

module.exports = router;
