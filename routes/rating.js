const express = require('express');
const router = express.Router();
const Rating = require('../models').Rating;
const Album = require('../models').Album;
const User = require('../models').User;

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
}

/* GET  */
router.get('/', asyncHandler(async (req, res) => {
//Returns the currently authenticated user
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
}));

/* POST  */
router.post('/:albumId/:userId', asyncHandler(async (req, res) => {
//Returns the currently authenticated user
    const album = await Album.findByPk(req.params.albumId)
    const user = await User.findByPk(req.params.userId);
    if ( album && user ){
        req.body.AlbumId = album.id;
        req.body.UserId = user.id;
        const rating = await Rating.create(req.body);
        res.status(201).json(rating);
    } else {
        const error = new Error('The Album or User could not be located and the rating was not created');
        error.status = 404;
        throw error;
    }
    
}));

    /* DELETE  */
router.delete('/:id', asyncHandler(async (req, res) => {

    //Deletes a course and returns no content
    const rating = await Rating.findByPk(req.params.id);
    if(rating) {
        await rating.destroy();
        res.status(204).json({ msg : "Successfuly deleted Rating" });
    } else {
        const error = new Error('The Rating could not be located and was not deleted');
        error.status = 404;
        throw error;
    }
    }));


module.exports = router;