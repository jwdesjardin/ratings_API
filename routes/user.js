const express = require('express');
const router = express.Router();
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
    const users = await User.findAll();
    res.status(200).json(users);
}));

/* POST  */
router.post('/', asyncHandler(async (req, res) => {
//Returns the currently authenticated user
    const user = await User.create(req.body);
    res.status(201).json(user);
}));

    /* DELETE  */
router.delete('/:id', asyncHandler(async (req, res) => {

    //Deletes a course and returns no content
    const users = await User.findByPk(req.params.id);
    if(users) {
        await users.destroy();
        res.status(204).json({ msg : "Successfuly deleted User" });
    } else {
        const error = new Error('The User could not be located and was not deleted');
        error.status = 404;
        throw error;
    }
    }));


module.exports = router;