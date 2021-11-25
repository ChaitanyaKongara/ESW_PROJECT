const express = require('express');
const axios = require('axios');
const router = express.Router();

var config = require('config');

const oneM2MCtrl = require('../controllers/oneM2M');

router.get('/all', oneM2MCtrl.getAllAEs);
router.get('/:ae', oneM2MCtrl.getAE); // team6
router.get('/:ae/:cnt', oneM2MCtrl.getCnt);  // /team6/node1
router.get('/:ae/:cnt/:cnt2', oneM2MCtrl.getAllCin); // /team6/node1/data
router.get('/:ae/:cnt/:cnt2/la', oneM2MCtrl.getCin);

module.exports = router;
