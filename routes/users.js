const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');


const UsersController = require('../controllers/users');
const { validateBody, schemas} = require('../helpres/routeHelpers');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });


router.route('/signup')
    .post(validateBody(schemas.authSchema),UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn,UsersController.signIn);

router.route('/secret')
    .get(passportJWT,UsersController.secret);

router.route('/update')
    .post(passportJWT,validateBody(schemas.updateSchema),UsersController.update);

router.route('/adds')
    .post(passportJWT, validateBody(schemas.adssSchema), UsersController.adds);

router.route('/oauth/facebook')
    .post(passportFacebook,UsersController.facebookOAuth);



module.exports = router;