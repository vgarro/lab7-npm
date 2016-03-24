var express = require('express');
var storage = require('node-persist');
var router = express.Router();

storage.initSync();

/* GET students listing. */
router.get('/', function(req, res) {
    console.log(storage.getItem('students'));

    if (storage.getItem('students')) {
        return res.status('200').json(storage.getItem('students'));
    } else{
        return res.status('200').json({'error': 'No Students Found'});
    }
});

/* POST create a new student */
router.post('/', function(req, res) {
    if (req.body.student === undefined) {
        return res.status(400).json({"error": "Invalid Payload"});
    }

    var students = storage.getItem('students') || [];
    students.push(req.body.student);
    storage.setItem('students', students);
    res.status('201').json({ status: "Created" });
});


/* PUT updates a new student */
router.put('/:student', function(req, res) {
    if (req.body.student === undefined) {
        return res.status(400).json({"error": "Invalid Payload"});
    }

    var memberFound;
    var elements = storage.getItem('students');
    if (elements) {
        var elementId = req.params.student;
        memberFound = elements.find(function(element) {
            return element.id === elementId;
        });
    }

    if(elements && memberFound){
        var index = elements.indexOf(memberFound);
        elements.splice(index, 1);
        elements.push(req.body.student);

        storage.removeItemSync('students');
        storage.setItem('students', elements);
        res.status('200').json(memberFound);
    } else {
        res.status('404').json({ "error": "Student Not found" });
    }
});

/* PATCH updates a new student */
router.patch('/:student', function(req, res) {
    if (req.body.student === undefined) {
        return res.status(400).json({"error": "Invalid Payload"});
    }

    var memberFound;
    var elements = storage.getItem('students');
    if (elements) {
        var elementId = req.params.student;
        memberFound = elements.find(function(element) {
            return element.id === elementId;
        });
    }

    if(elements && memberFound){
        var index = elements.indexOf(memberFound);
        for (var attrname in req.body.student) {
            memberFound[attrname] = req.body.student[attrname];
        }
        elements.splice(index, 1);
        elements.push(memberFound);

        storage.removeItemSync('students');
        storage.setItem('students', elements);
        res.status('200').json(memberFound);
    } else {
        res.status('404').json({ "error": "Student Not found" });
    }
});

/* delete updates a new student */
router.delete('/:student', function(req, res) {
    var memberFound;
    var elements = storage.getItem('students');
    if (elements) {
        var elementId = req.params.student;
        memberFound = elements.find(function(element) {
            return element.id === elementId;
        });
    }

    if(elements && memberFound){
        var index = elements.indexOf(memberFound);
        elements.splice(index, 1);
        storage.removeItemSync('students');
        storage.setItem('students', elements);
        res.status('200').json(memberFound);
    } else {
        res.status('404').json({ "error": "Student Not found" });
    }
});
module.exports = router;
