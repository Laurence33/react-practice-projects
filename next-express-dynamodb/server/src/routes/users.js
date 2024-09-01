const { Router } = require('express');
const {
  scanUsers,
  addUser,
  getUserById,
  batchAddUser,
  updateUser,
  deleteUser,
  queryUsers,
} = require('../controllers/usersController');

const router = Router();

router.post('/scan', scanUsers);
router.post('/query', queryUsers);
router.post('/', addUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/batch-add', batchAddUser);
module.exports = router;
