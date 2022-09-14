const Router = require('express');
const router = new Router();
const typeController = require('../controllers/type.controller');
const checkRole = require('../middleware/checkRolemiddleware');

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);


module.exports = router;