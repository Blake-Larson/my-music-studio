const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

router.get('/', lessonController.getLessons);

router.post('/createLesson', lessonController.createLesson);

module.exports = router;
