const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughsRoutes = require('./thoughts-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughsRoutes);

module.exports = router;