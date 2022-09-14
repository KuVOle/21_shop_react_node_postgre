const Router = require('express');
const deviceRouter = require('./device.router');
const typeRouter = require('./type.route');
const userRouter = require('./user.route');
const brandRouter = require('./brand.route');




const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);


module.exports = router;