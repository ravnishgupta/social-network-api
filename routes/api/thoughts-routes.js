const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller')

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

  // Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
  .route('/:id/reactions')
  .post(createReaction)

  router
  .route('/:id/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;