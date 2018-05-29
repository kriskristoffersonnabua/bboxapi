var router = require('express').Router();
var controller = require('./lprController');
var auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(),auth.getFreshUser()];

router.param('id', controller.param);

router
  .route('/')
  .get(controller.get)
  .post(checkUser, controller.post);

router
  .route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

module.exports = router;
