const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller.js')

router.get('/', homeController.home)

router.use('/users', require('./users.js'));

router.use('/posts', require('./posts.js'));
console.log('router loaded');
router.use('/comments', require('./comments'));
//for any further routes, access from home
///router.use('/routerName', require('./routerfile'))

module.exports = router;
