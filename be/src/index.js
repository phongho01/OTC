require('dotenv').config();

const connectDB = require('./config/db.conf');
const app = require('./app');

const port = process.env.PORT || 3001;
var os = require("os");

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log('App is listening on port ' + port);
    });
  })
  .catch((error) => {
    console.log('Starting', error);
  });