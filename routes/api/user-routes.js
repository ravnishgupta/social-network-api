const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deFriend
} = require('../../controllers/user-controller')

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

// Set up GET one, PUT, and DELETE at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//add friend
router
.route('/:id/friends')
.post(addFriend)

//dis-associate friend from the user
router
.route('/:id/friends/:friendId')
.put(deFriend)

module.exports = router;