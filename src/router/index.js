const express = require('express')
const path = require('path')
const ReportController = require('../controllers/ReportController')

const router = express.Router()

router.get('/report', new ReportController().getAll)
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});
module.exports = router