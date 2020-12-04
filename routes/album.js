const express = require('express');
const router = express.Router();
const Album = require('../models').Album;
const Band = require('../models').Band;

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

/* GET ALL */
router.get('/', asyncHandler(async (req, res) => {

    const albums = await Album.findAll();
    res.status(200).json(albums);
}));

/* POST  */
router.post('/:id', asyncHandler(async (req, res) => {

    const band = await Band.findByPk(req.params.id);
    if (band){
        req.body.BandId = band.id;
        const album = await Album.create(req.body);
        res.status(201).json(album);
    } else {
        const error = new Error('The Band could not be located and the album was not created');
        error.status = 404;
        throw error;
    }
    
}));

    /* DELETE  */
router.delete('/:id', asyncHandler(async (req, res) => {

    //Deletes a course and returns no content
    const album = await Album.findByPk(req.params.id);
    if(album) {
        await album.destroy();
        res.status(204).json({ msg : "Successfuly deleted Album" });
    } else {
        const error = new Error('The Album could not be located and was not deleted');
        error.status = 404;
        throw error;
    }
    }));


module.exports = router;