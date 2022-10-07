const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

router.put('/', lessonController.getLessons);

router.post('/createLesson', lessonController.createLesson);

router.put('/updateLesson', lessonController.updateLesson);

router.delete('/delete', lessonController.deleteLesson);

module.exports = router;
