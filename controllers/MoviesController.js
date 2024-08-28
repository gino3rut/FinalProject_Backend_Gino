const { movies } = require('../models');

class MoviesController{
    static GetAllMovies(req,res){
        movies.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    static GetMoviesByID(req,res){
        let id = +req.params.id
        movies.findByPk(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    static createMovies(req,res){
        const { title, synopsis, trailerUrl, imgUrl, rating, status} = req.body;
        movies.create({
            title, synopsis, trailerUrl, imgUrl, rating, status
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    static updateMovies(req,res){
        let id = +req.params.id
        const { title, synopsis, trailerUrl, imgUrl, rating, status} = req.body;
        let data = { title, synopsis, trailerUrl, imgUrl, rating, status }
        movies.update(
            data,
            {
                where:{
                    id
                },
                returning: true
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    static deleteMovies(req,res){
        let id = +req.params.id
        movies.destroy({
            where:{
                id
            }
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
}

module.exports = MoviesController;