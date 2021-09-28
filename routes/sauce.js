require('dotenv').config();
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');
const formGuard = require('../middleware/formGuard.js')



router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, formGuard, sauceCtrl.modifySauce);
router.delete('/:id', auth, formGuard, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likesDislikes);


module.exports = router;