const express = require('express');
const router = express.Router();
const fileUploadController= require('../controllers/upload-controller');

router.get('/upload',fileUploadController.fileUploadForm);

router.post('/upload',fileUploadController.uploadFile);

module.exports = router;