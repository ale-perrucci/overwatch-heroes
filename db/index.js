const MongoClient = require('mongodb');

const MONGODB_URI =
  process.env.MONGOLAB_URI ||
  "mongodb://username:password@ds115799.mlab.com:15799/overwatch-heroes";

function connect(url) {
  return MongoClient.connect(url).then(client => client.db());
}

module.exports = async () => {
  let database = await connect(MONGODB_URI);
  return database;
}