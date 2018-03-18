const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res) => {
    try {
      const number = +req.query.number || 10;
      const filter = req.query.filter || '';
      const lastname = req.query.lastname || '';

      const regex = new RegExp(`^${filter}`, "i");
      const query = { $or: [{"attributes.name": regex}, {"attributes.slug": regex}], "attributes.name": {$gt: lastname}};

      const result = await db.collection("heroes").find(query).sort({ "attributes.name": 1 }).limit(number).toArray();
      res.send(result);
    } catch(error) {
      res.status(400).send(error);
    }
  });

  router.get('/:name', async (req, res) => {
    try {
      const name = req.params.name || '';
      const result = await db.collection("heroes").findOne({ "attributes.slug": name });
      res.send(result);
    } catch(error) {
      res.status(400).send(error);
    }
  });

  return router;
}