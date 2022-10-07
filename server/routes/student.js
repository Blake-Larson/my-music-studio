const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');

router.put('/', studentController.getStudents);

router.post('/createStudent', studentController.createStudent);

router.put('/updateStudent', studentController.updateStudent);

router.put('/updateListItem', studentController.updateListItem);

router.delete('/delete', studentController.deleteStudent);

module.exports = router;
