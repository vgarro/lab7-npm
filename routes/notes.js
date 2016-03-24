var express = require('express');
var storage = require('node-persist');
var router = express.Router();

storage.initSync();

/* GET notes listing. */
router.get('/', function(req, res) {
    if (storage.getItem('notes')) {
        return res.status('200').json(storage.getItem('notes'));
    } else{
        return res.status('200').json({'error': 'No notes Found'});
    }
});

/* GET notes from an specific student. */
router.get('/:student', function(req, res) {
    var notesFound = [];
    var elements = storage.getItem('notes');
    if (elements) {
        var elementId = req.params.student;
        elements.find(function(element) {
            if (element.studentId === elementId) {
                notesFound.push(element);
            }
        });
    }

    if (notesFound) {
        res.status('200').json(notesFound);
    } else {
        res.status('404').json({ "error": "Student not found" });
    }
});

/* POST create a new note */
router.post('/:student', function(req, res) {
    if (req.body.note === undefined) {
        return res.status(400).json({"error": "Invalid Payload"});
    }

    var memberFound;
    var elements = storage.getItem('notes');
    if (elements) {
        var elementId = req.params.student;
        memberFound = elements.find(function(element) {
            return element.studentId === elementId;
        });
    }

    if(memberFound){
        var notes = storage.getItem('notes');
        notes.push(req.body.note);
        storage.setItem('notes', notes);
        res.status('201').json({ status: "Created" });
    } else {
        res.status('404').json({ "error": "Student Not found" });
    }
});


/* PUT updates a new note */
router.put('/:student', function(req, res) {
    if (req.body.note === undefined) {
        return res.status(400).json({"error": "Invalid Payload"});
    }

    var memberFound;
    var elements = storage.getItem('notes');
    if (elements) {
        var elementId = req.params.student;
        memberFound = elements.find(function(element) {
            return element.studentId === elementId;
        });
    }

    if(memberFound){
        var notes = storage.getItem('notes') || [];
        notes.push(req.body.note);

        storage.removeItemSync('notes');
        storage.setItem('notes', notes);
        res.status('200').json(notes);
    } else {
        res.status('404').json({ "error": "Student Not found" });
    }
});

/* PATCH updates a new note */
router.patch('/:student', function(req, res) {
    if (req.body.note === undefined) {
        return res.status(400).json({"error": "Invalid Payload"});
    }

    var memberFound;
    var elements = storage.getItem('notes');
    if (elements) {
        var elementId = req.params.student;
        memberFound = elements.find(function(element) {
            return element.studentId === elementId;
        });
    }

    if(memberFound){
        var notes = storage.getItem('notes') || [];
        notes.push(req.body.note);

        storage.removeItemSync('notes');
        storage.setItem('notes', notes);
        res.status('200').json(notes);
    } else {
        res.status('404').json({ "error": "Student Not found" });
    }
});

module.exports = router;
