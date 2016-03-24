var express = require('express');
var router = express.Router();

/* GETs THE API INFO */
router.get('/', function(req, res, next) {
  res.status('200').json(
    {
      'routes': [
        { 'protocol': 'GET', 'url': '/team', description: 'Return all team members' },
        { 'protocol': 'GET', 'url': '/team/:member', description: 'Return an specific team member info' },

        { 'protocol': 'GET', 'url': '/students', description: 'Return all students' },
        { 'protocol': 'POST', 'url': '/students/', description: 'Adds a new Student' },
        { 'protocol': 'PUT', 'url': '/students/:student', description: 'Updates A Student' },
        { 'protocol': 'PATCH', 'url': '/students/:student', description: 'Updates partial Student info' },
        { 'protocol': 'DELETE', 'url': '/students/:student', description: 'Deletes a Student by ID or Name' },

        { 'protocol': 'GET', 'url': '/notes', description: 'Return all notes from ALL student' },
        { 'protocol': 'GET', 'url': '/notes/:student', description: 'Return all notes from an specific student' },
        { 'protocol': 'POST', 'url': '/notes/:student', description: 'Adds a new note from a Student' },
        { 'protocol': 'PUT', 'url': '/notes/:student', description: 'Updates a note from a student' },
        { 'protocol': 'PATCH', 'url': '/notes/:student', description: 'Updates a note from a student' },
      ]
    });
});

module.exports = router;
