const {Router} = require('express');

const monsters = require('./monsters');
const habitats = require('./habitats');
const lives = require('./lives');

const router = Router();

router.use('/monsters', monsters); //this is the monsters routing middleware
router.use('/habitats', habitats); //this is the habitats routing middleware
router.use('/lives', lives); //this is the lives routing middleware

module.exports = router;