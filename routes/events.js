const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const EventController = require('../controllers/events');
const { validateBody, schemas } = require('../helpres/routeHelpers');
const passportJWT = passport.authenticate('jwt', { session: false });

//add passportJWT to middelwares (.POST)
//almost done no bugs 
router.route('/post')
    .post(validateBody(schemas.postEventSchema),EventController.postEvent);


//Event.find() only returning _id not the whole document
router.route('/search/name')
    .post(EventController.searchTitle);

router.route('/search/tag')
    .post(EventController.searchTag);

router.route('/search/upcoming')
    .post(EventController.SearchDate);


module.exports = router;