const express = require('express');
const router = express.Router();
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

/* GET  */
router.get('/', asyncHandler(async (req, res) => {
    const bands = await Band.findAll();
    res.status(200).json(bands);
}));

/* POST  */
router.post('/', asyncHandler(async (req, res) => {
    const band = await Band.create(req.body);
    res.status(201).json(band);
}));

    /* DELETE  */
router.delete('/:name', asyncHandler(async (req, res) => {

    const band = await Band.findOne({where: { name: req.params.name }});
    if(band) {
        await band.destroy();
        res.status(204).json({ msg : "Successfuly deleted Band" });
    } else {
        const error = new Error('The Band could not be located and was not deleted');
        error.status = 404;
        throw error;
    }
    }));


module.exports = router;