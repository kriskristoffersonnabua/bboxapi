var router = require('express').Router();
var controller = require('./userController');
var auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.param);
router.route('/me').get(checkUser, controller.me);
router.route('/search').get(controller.search);

router.route('/tutors').get(checkUser, controller.getTutors);

router
  .route('/')
  .get(controller.get)
  .post(controller.post);

router
  .route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

module.exports = router;
