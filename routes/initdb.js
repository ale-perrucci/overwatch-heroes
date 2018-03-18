const axios = require('axios');
const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get('/', async (req, res) => {
    try {
      const heroes = await axios.get('https://s3.eu-central-1.amazonaws.com/dojomadness.com/code-challenge/heros');
      heroes.data.data.forEach(h => {
        console.log(h.attributes.name);
      });
      await db.collection("heroes").remove({});
      const result = await db.collection("heroes").insertMany(heroes.data.data);
      res.send(result);
    } catch(error) {
      res.status(400).send(error);
    }
  });

  return router;
}