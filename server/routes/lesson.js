const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

router.put('/', lessonController.getLessons);

router.post('/createLesson', lessonController.createLesson);

router.put('/updateLesson', lessonController.updateLesson);

router.put('/updateAttendance', lessonController.updateAttendance);

router.put('/updatePayment', lessonController.updatePayment);

router.delete('/delete', lessonController.deleteLesson);

module.exports = router;
