const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const ingredientRouter = require('./items.js')


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/ingredients', ingredientRouter);
module.exports = router;