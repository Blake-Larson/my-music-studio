const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');

router.get('/', studentController.getStudents);

router.post('/createStudent', studentController.createStudent);

router.put('/updateStudent', studentController.updateStudent);

router.delete('/delete', studentController.deleteStudent);

module.exports = router;
