const router = require('express').Router();

const MoviesController = require('../controllers/MoviesController.js');

const UserController = require('..//controllers/UserController.js');

const authentication = require('../middlewares/authentication.js');

const authorization = require('../middlewares/authorization.js');

// route users start
router.post('/users/register', UserController.register);

router.post('/users/login', UserController.login);
// route users end

// route movies start
router.use(authentication);

router.get('/movies', MoviesController.GetAllMovies);

router.get('/movies/:id', MoviesController.GetMoviesByID);

router.get('/create_movies', MoviesController.createMovies);

router.get('/update_movies/:id', MoviesController.updateMovies);

router.get('/delete_movies/:id', MoviesController.deleteMovies);

router.use('/:id', authorization);
// route movies end

module.exports = router;