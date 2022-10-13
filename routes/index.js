const express = require('express')

const MovieCtrl = require('../controllers/')

const router = express.Router()

router.post('/create-movie', MovieCtrl.createMovie)
router.put('/update-movie', MovieCtrl.updateMovie)
router.delete('/delete-movie/:id', MovieCtrl.deleteMovie)
router.get('/get-movie/:id', MovieCtrl.getMovieById)
router.get('/get-movies', MovieCtrl.getMovies)

module.exports = router