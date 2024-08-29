const router = require('express').Router();

const BookmarksController = require('../controllers/BookmarksController.js');

router.post('/bookmark/:id', BookmarksController.createBookmarks);

router.use('/users', require("./users"));
router.use(require('../middlewares/authentication.js'));
router.use('/movies', require("./movies"));
router.use('/bookmarks', require("./bookmarks"));
router.use('/:id', require('../middlewares/authorization.js'));

module.exports = router;