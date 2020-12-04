const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());


(async () => {
    const db = require('./models/index');
  
    try {
      const response = await db.sequelize.authenticate();
      console.log('connection successfully established');
    } catch(err){
      console.log('ERROR in establishing connection');
    } 
    
    await db.sequelize.sync({force: true});
  
})();


const userRoutes = require('./routes/user.js');
const ratingRoutes = require('./routes/rating.js');
const albumRoutes = require('./routes/album.js');
const bandRoutes = require('./routes/band.js');
app.use('/user', userRoutes);
app.use('/rating', ratingRoutes);
app.use('/album', albumRoutes);
app.use('/band', bandRoutes);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
    res.json({
    message: 'Welcome to the REST API project!',
    });
});


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({ error: {
    message: 'Route Not Found',
  }});
});

// setup a global error handler
app.use((err, req, res, next) => {

  res.status(err.status || 500).json({ error : {
    message: [err.message],
    stack: err.stack
  }});
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});