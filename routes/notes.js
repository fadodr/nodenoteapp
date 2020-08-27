const express = require('express');
const router = express.Router();

const notecontroller = require('../controller/notecontroller');
const isauth = require('../auth/isauth');

router.get('/',isauth, notecontroller.get_note);
router.get('/:id',isauth, notecontroller.get_singlenote);
router.post('/',isauth, notecontroller.create_note);
router.put('/:id',isauth, notecontroller.update_note);
router.delete('/:id',isauth, notecontroller.delete_note);


module.exports = router;