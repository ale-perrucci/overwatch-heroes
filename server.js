const express = require('express');
const initializeDB = require('./db');
const routes = require('./routes');

const app = express();

app.use(express.static(__dirname + '/client/build'));

const PORT = process.env.PORT || 5000;

initializeDB().then(db => {
  routes(app, db).listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);     
  })
})
.catch(err => {
  console.error("Failed to connect to MongoDB!");
  console.error(err);
  process.exit(1);
});

module.exports.app = app;