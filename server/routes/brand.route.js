const Router = require('express');
const router = new Router();
const brandRoute = require('../controllers/brand.controller');
const checkRole = require('../middleware/checkRolemiddleware');

router.post('/', checkRole('ADMIN'), brandRoute.create);
router.get('/', brandRoute.getAll);


module.exports = router;